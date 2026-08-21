'use server';

import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

export async function createEbookAction(payload) {
  try {
    const { data, coverImageBase64, pdfBase64 } = payload;
    
    if (coverImageBase64) {
      // Extract base64 data
      const base64Data = coverImageBase64.split(';base64,').pop();
      const buffer = Buffer.from(base64Data, 'base64');
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/ebooks/covers');
      data.coverImage = secureUrl;
    }

    if (pdfBase64) {
      const base64Data = pdfBase64.split(';base64,').pop();
      const buffer = Buffer.from(base64Data, 'base64');
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/ebooks/pdfs');
      data.pdfUrl = secureUrl;
    }

    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    
    const _id = data.id || `ebook-${Date.now()}`;
    const newEbook = { ...data, _id, id: _id, createdAt: new Date() };
    
    await db.collection('ebooks').insertOne(newEbook);
    
    return { success: true, data: newEbook };
  } catch (error) {
    console.error('Server Action Error:', error);
    return { success: false, message: error.message };
  }
}

export async function updateEbookAction(id, payload) {
  try {
    const { data, coverImageBase64, pdfBase64 } = payload;
    
    const client = await clientPromise;
    const db = client.db('cgfwa_db');

    const existingDoc = await db.collection('ebooks').findOne({ _id: id });

    if (coverImageBase64) {
      const base64Data = coverImageBase64.split(';base64,').pop();
      const buffer = Buffer.from(base64Data, 'base64');
      const secureUrl = await uploadToCloudinary(buffer, 'cgfwa/ebooks/covers');
      data.coverImage = secureUrl;
      
      if (existingDoc && existingDoc.coverImage) {
        await deleteFromCloudinary(existingDoc.coverImage);
      }
    }

    if (pdfBase64) {
      const base64Data = pdfBase64.split(';base64,').pop();
      const buffer = Buffer.from(base64Data, 'base64');
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
    
    return { success: true };
  } catch (error) {
    console.error('Server Action Error:', error);
    return { success: false, message: error.message };
  }
}
