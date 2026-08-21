import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const data = await db.collection('activities').find({}).toArray();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const dataString = formData.get('data');
    if (!dataString) {
      return NextResponse.json({ success: false, message: 'Missing data payload' }, { status: 400 });
    }
    
    const data = JSON.parse(dataString);
    const imageFile = formData.get('image');

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/activities');
      data.image = secureUrl;
    }

    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    
    // Process new event photos
    if (data.events && Array.isArray(data.events)) {
      for (let i = 0; i < data.events.length; i++) {
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
    }
    
    const _id = data.id || `act-${Date.now()}`;
    const newActivity = { ...data, _id, id: _id, createdAt: new Date() };
    
    await db.collection('activities').insertOne(newActivity);
    
    return NextResponse.json({ success: true, data: newActivity });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
