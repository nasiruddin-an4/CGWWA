import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET all leadership data
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('cgfwa_db');
    
    const president = await db.collection('leadership').findOne({ _id: 'president' });
    const centralCommittee = await db.collection('central_committee').find({}).toArray();
    const zoneChairmen = await db.collection('zone_chairmen').find({}).toArray();
    const dhakaCommittee = await db.collection('dhaka_committee').find({}).toArray();
    const lcDhakaCommittee = await db.collection('lc_dhaka_committee').find({}).toArray();

    return NextResponse.json({ 
      success: true, 
      data: { president, centralCommittee, zoneChairmen, dhakaCommittee, lcDhakaCommittee } 
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
