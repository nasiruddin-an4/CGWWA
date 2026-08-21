import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const data = await db.collection('downloads').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const _id = data.id || `dl-${Date.now()}`;
    const newItem = { ...data, _id, createdAt: new Date() };
    await db.collection('downloads').insertOne(newItem);
    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
