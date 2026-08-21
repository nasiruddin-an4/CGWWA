import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Public API endpoint to serve data for client-side pages
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');

    if (!collection) {
      return NextResponse.json({ success: false, message: 'Missing collection parameter' }, { status: 400 });
    }

    const allowedCollections = [
      'news', 'events', 'gallery_photos', 'gallery_videos',
      'activities', 'leadership', 'central_committee', 'zone_chairmen',
      'dhaka_committee', 'lc_dhaka_committee', 'organization',
      'core_values', 'history_milestones', 'programs', 'downloads',
      'ebooks', 'hero'
    ];

    if (!allowedCollections.includes(collection)) {
      return NextResponse.json({ success: false, message: 'Invalid collection' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const data = await db.collection(collection).find({}).toArray();
    const mappedData = data.map(item => ({ ...item, id: item._id.toString() }));
    
    return NextResponse.json({ success: true, data: mappedData });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
