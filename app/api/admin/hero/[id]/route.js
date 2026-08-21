import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

export async function PUT(request, { params }) {
  const { id } = await params;
  
  try {
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
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/hero');
      data.image = secureUrl;
      
      const existingDoc = await db.collection('hero_banners').findOne({ _id: id });
      if (existingDoc && existingDoc.image) {
        await deleteFromCloudinary(existingDoc.image);
      }
    }
    
    const { _id, ...updateData } = data;
    
    await db.collection('hero_banners').updateOne(
      { _id: id },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  
  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    
    const existingDoc = await db.collection('hero_banners').findOne({ _id: id });
    if (existingDoc && existingDoc.image) {
      await deleteFromCloudinary(existingDoc.image);
    }

    await db.collection('hero_banners').deleteOne({ _id: id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
