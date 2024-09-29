import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
let client: MongoClient | null = null;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
  }
  return client;
}

export async function GET() {
  try {
    const mongoClient = await connectToMongo();
    const database = mongoClient.db('poop_patrol');
    const submissions = database.collection('images');

    const images = await submissions.find({}).toArray();
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
