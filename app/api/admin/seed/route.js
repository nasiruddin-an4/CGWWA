import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';



export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');

    // Seed News
    const newsCollection = db.collection('news');
    await newsCollection.deleteMany({}); // Clear existing
    
    // Add createdAt and _id
    const newsToInsert = newsArticles.map(({ id, ...rest }) => ({
      _id: id,
      ...rest,
      createdAt: new Date(),
    }));
    
    if (newsToInsert.length > 0) {
      await newsCollection.insertMany(newsToInsert);
    }

    // Seed Events
    const eventsCollection = db.collection('events');
    await eventsCollection.deleteMany({});
    
    // Assuming events is imported successfully. We will just check if it exists.
    if (typeof upcomingEvents !== 'undefined' && upcomingEvents.length > 0) {
      const eventsToInsert = upcomingEvents.map(({ id, ...rest }) => ({
        _id: id,
        ...rest,
        createdAt: new Date(),
      }));
      await eventsCollection.insertMany(eventsToInsert);
    }

    return NextResponse.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, message: 'Failed to seed database', error: error.message }, { status: 500 });
  }
}
