import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const events = await db.collection('events').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, data: events });
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
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/events');
      data.image = secureUrl;
    }

    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    
    // Generate an ID if not provided
    const _id = data.id || `event-${Date.now()}`;
    const newEvent = { ...data, _id, id: _id, createdAt: new Date() };
    
    await db.collection('events').insertOne(newEvent);
    
    return NextResponse.json({ success: true, data: newEvent });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
