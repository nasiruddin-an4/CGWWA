import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const photos = await db.collection('gallery_photos').find({}).toArray();
    return NextResponse.json({ success: true, data: photos });
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
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/gallery');
      data.url = secureUrl;
    }

    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const _id = data.id || `gal-${Date.now()}`;
    const newPhoto = { ...data, _id, id: _id, createdAt: new Date() };
    await db.collection('gallery_photos').insertOne(newPhoto);
    return NextResponse.json({ success: true, data: newPhoto });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
