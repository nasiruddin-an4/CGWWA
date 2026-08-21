import clientPromise from '@/lib/mongodb';

// Server-side data fetcher - use this in Server Components
// Falls back to static data if MongoDB is unavailable
export async function getCollectionData(collectionName, fallbackData = []) {
  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const data = await db.collection(collectionName).find({}).toArray();
    const mappedData = data.map(item => ({ ...item, id: item._id.toString() }));
    if (mappedData && mappedData.length > 0) return mappedData;
    return fallbackData;
  } catch (error) {
    console.error(`Failed to fetch ${collectionName} from DB:`, error.message);
    return fallbackData;
  }
}

export async function getSingleDocument(collectionName, docId, fallbackData = null) {
  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    const doc = await db.collection(collectionName).findOne({ _id: docId });
    if (doc) return { ...doc, id: doc._id.toString() };
    return fallbackData;
  } catch (error) {
    console.error(`Failed to fetch ${collectionName}/${docId} from DB:`, error.message);
    return fallbackData;
  }
}
