import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const { _id, ...updateData } = data;
    await db.collection('downloads').updateOne({ _id: id }, { $set: updateData });
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
    await db.collection('downloads').deleteOne({ _id: id });
    return NextResponse.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
