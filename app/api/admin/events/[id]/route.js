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
    
    // If a new image is uploaded, we upload it and optionally delete the old one
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/events');
      data.image = secureUrl;
      
      // Delete old image if exists
      const existingDoc = await db.collection('events').findOne({ _id: id });
      if (existingDoc && existingDoc.image) {
        await deleteFromCloudinary(existingDoc.image);
      }
    }
    
    const { _id, ...updateData } = data;
    
    await db.collection('events').updateOne({ _id: id }, { $set: updateData });
    return NextResponse.json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    
    // Delete image from Cloudinary before deleting doc
    const existingDoc = await db.collection('events').findOne({ _id: id });
    if (existingDoc && existingDoc.image) {
      await deleteFromCloudinary(existingDoc.image);
    }
    
    await db.collection('events').deleteOne({ _id: id });
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
