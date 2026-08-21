import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const dataString = formData.get('data');
    if (!dataString) {
      return NextResponse.json({ success: false, message: 'Missing data payload' }, { status: 400 });
    }
    
    const data = JSON.parse(dataString);
    const imageFile = formData.get('image');
    
    const client = await clientPromise;
    const db = client.db('cgfwa_db');

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/activities');
      data.image = secureUrl;
      
      const existingDoc = await db.collection('activities').findOne({ _id: id });
      if (existingDoc && existingDoc.image) {
        await deleteFromCloudinary(existingDoc.image);
      }
    }
    
    // Process new event photos
    const existingDoc = await db.collection('activities').findOne({ _id: id });
    if (data.events && Array.isArray(data.events)) {
      for (let i = 0; i < data.events.length; i++) {
        // Find existing photos for this event
        const oldEvent = existingDoc?.events?.[i];
        
        // Check if any old photos were removed (present in DB but not in data.events[i].photos)
        if (oldEvent && Array.isArray(oldEvent.photos)) {
          const currentPhotos = data.events[i].photos || [];
          const deletedPhotos = oldEvent.photos.filter(p => !currentPhotos.includes(p));
          for (const p of deletedPhotos) {
            await deleteFromCloudinary(p);
          }
        }
      
        const photoFiles = formData.getAll(`event_${i}_photos`);
        if (photoFiles && photoFiles.length > 0) {
          const newPhotoUrls = [];
          for (const file of photoFiles) {
            if (file.size > 0) {
              const buffer = Buffer.from(await file.arrayBuffer());
              const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/activities');
              newPhotoUrls.push(secureUrl);
            }
          }
          data.events[i].photos = [...(data.events[i].photos || []), ...newPhotoUrls];
        }
      }
      
      // Check for removed events and delete all their photos
      if (existingDoc && existingDoc.events && data.events.length < existingDoc.events.length) {
        for (let i = data.events.length; i < existingDoc.events.length; i++) {
           const removedEvent = existingDoc.events[i];
           if (removedEvent && Array.isArray(removedEvent.photos)) {
             for (const p of removedEvent.photos) {
               await deleteFromCloudinary(p);
             }
           }
        }
      }
    }
    
    const { _id, ...updateData } = data;
    await db.collection('activities').updateOne({ _id: id }, { $set: updateData });
    return NextResponse.json({ success: true, message: 'Updated' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('cgfwa_db');

    const existingDoc = await db.collection('activities').findOne({ _id: id });
    if (existingDoc && existingDoc.image) {
      await deleteFromCloudinary(existingDoc.image);
    }
    
    // Also delete any event photos
    if (existingDoc && existingDoc.events && Array.isArray(existingDoc.events)) {
      for (const ev of existingDoc.events) {
        if (ev.photos && Array.isArray(ev.photos)) {
          for (const photoUrl of ev.photos) {
            await deleteFromCloudinary(photoUrl);
          }
        }
      }
    }

    await db.collection('activities').deleteOne({ _id: id });
    return NextResponse.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
