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
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/programs');
      data.image = secureUrl;
      
      const existingDoc = await db.collection('programs').findOne({ _id: id });
      if (existingDoc && existingDoc.image) {
        await deleteFromCloudinary(existingDoc.image);
      }
    }
    
    const { _id, ...updateData } = data;
    await db.collection('programs').updateOne({ _id: id }, { $set: updateData });
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

    const existingDoc = await db.collection('programs').findOne({ _id: id });
    if (existingDoc && existingDoc.image) {
      await deleteFromCloudinary(existingDoc.image);
    }

    await db.collection('programs').deleteOne({ _id: id });
    return NextResponse.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
