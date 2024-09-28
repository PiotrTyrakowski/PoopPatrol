// app/api/get-images/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('poop_patrol');
    const submissions = database.collection('images');

    // Fetch all documents from the "images" collection
    const images = await submissions.find({}).toArray();

    await client.close();

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
