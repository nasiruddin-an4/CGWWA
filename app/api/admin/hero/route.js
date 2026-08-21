import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const banners = await db.collection('hero_banners').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, data: banners });
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
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/hero');
      data.image = secureUrl;
    }

    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    
    // Generate an ID if not provided
    const _id = data.id || `hero-${Date.now()}`;
    const newBanner = { ...data, _id, id: _id, createdAt: new Date() };
    
    await db.collection('hero_banners').insertOne(newBanner);
    
    return NextResponse.json({ success: true, data: newBanner });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
