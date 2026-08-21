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
    const coverImageFile = formData.get('coverImage');
    const pdfFile = formData.get('pdfFile');
    
    const client = await clientPromise;
    const db = client.db('cgfwa_db');

    const existingDoc = await db.collection('ebooks').findOne({ _id: id });

    if (coverImageFile && coverImageFile.size > 0) {
      const buffer = Buffer.from(await coverImageFile.arrayBuffer());
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/ebooks/covers');
      data.coverImage = secureUrl;
      
      if (existingDoc && existingDoc.coverImage) {
        await deleteFromCloudinary(existingDoc.coverImage);
      }
    }

    if (pdfFile && pdfFile.size > 0) {
      const buffer = Buffer.from(await pdfFile.arrayBuffer());
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/ebooks/pdfs');
      data.pdfUrl = secureUrl;
      
      if (existingDoc && existingDoc.pdfUrl) {
        await deleteFromCloudinary(existingDoc.pdfUrl);
      }
    }
    
    const { _id, ...updateData } = data;
    
    await db.collection('ebooks').updateOne(
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
    
    const existingDoc = await db.collection('ebooks').findOne({ _id: id });
    if (existingDoc) {
      if (existingDoc.coverImage) await deleteFromCloudinary(existingDoc.coverImage);
      if (existingDoc.pdfUrl) await deleteFromCloudinary(existingDoc.pdfUrl);
    }

    await db.collection('ebooks').deleteOne({ _id: id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
