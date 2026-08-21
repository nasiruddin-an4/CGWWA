import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const ebooks = await db.collection('ebooks').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, data: ebooks });
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
    const coverImageFile = formData.get('coverImage');
    const pdfFile = formData.get('pdfFile');

    if (coverImageFile && coverImageFile.size > 0) {
      const buffer = Buffer.from(await coverImageFile.arrayBuffer());
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/ebooks/covers');
      data.coverImage = secureUrl;
    }

    if (pdfFile && pdfFile.size > 0) {
      const buffer = Buffer.from(await pdfFile.arrayBuffer());
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/ebooks/pdfs');
      data.pdfUrl = secureUrl;
    }

    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    
    const _id = data.id || `ebook-${Date.now()}`;
    const newEbook = { ...data, _id, id: _id, createdAt: new Date() };
    
    await db.collection('ebooks').insertOne(newEbook);
    
    return NextResponse.json({ success: true, data: newEbook });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
