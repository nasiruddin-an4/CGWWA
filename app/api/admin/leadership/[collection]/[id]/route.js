import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

const ALLOWED_COLLECTIONS = ['leadership', 'central_committee', 'zone_chairmen', 'dhaka_committee', 'lc_dhaka_committee'];

export async function PUT(request, { params }) {
  const { collection, id } = await params;
  
  if (!ALLOWED_COLLECTIONS.includes(collection)) {
    return NextResponse.json({ success: false, message: 'Invalid collection' }, { status: 400 });
  }

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
      const secureUrl = await uploadToCloudinary(buffer, `cgfwa/${collection}`);
      data.photo = secureUrl;
      
      const existingDoc = await db.collection(collection).findOne({ _id: id });
      if (existingDoc && existingDoc.photo) {
        await deleteFromCloudinary(existingDoc.photo);
      }
    }
    
    const { _id, ...updateData } = data;
    
    await db.collection(collection).updateOne(
      { _id: id },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { collection, id } = await params;
  
  if (!ALLOWED_COLLECTIONS.includes(collection)) {
    return NextResponse.json({ success: false, message: 'Invalid collection' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    
    const existingDoc = await db.collection(collection).findOne({ _id: id });
    if (existingDoc && existingDoc.photo) {
      await deleteFromCloudinary(existingDoc.photo);
    }

    await db.collection(collection).deleteOne({ _id: id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
