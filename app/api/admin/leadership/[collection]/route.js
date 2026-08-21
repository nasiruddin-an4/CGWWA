import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

const ALLOWED_COLLECTIONS = ['leadership', 'central_committee', 'zone_chairmen', 'dhaka_committee', 'lc_dhaka_committee'];

export async function POST(request, { params }) {
  const { collection } = await params;
  
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

      // Special case: if leadership, delete old president photo before upserting
      if (collection === 'leadership') {
        const existingDoc = await db.collection(collection).findOne({ _id: 'president' });
        if (existingDoc && existingDoc.photo) {
          await deleteFromCloudinary(existingDoc.photo);
        }
      }
    }
    
    const _id = data.id || `member-${Date.now()}`;
    const newItem = { ...data, _id, id: _id, createdAt: new Date() };
    
    if (collection === 'leadership') {
      await db.collection(collection).updateOne({ _id: 'president' }, { $set: data }, { upsert: true });
    } else {
      await db.collection(collection).insertOne(newItem);
    }
    
    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
