
// app/api/save-event/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export const dynamic = "force-dynamic";


const uri = process.env.MONGODB_URI || "";

if (uri == "") {
  throw new Error('Please define the MONGODB_URI environment variable');
}



const setHeaders = (response: Response) => {
  response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allow specific methods
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
  return response;
};

export async function POST(req: NextRequest) {
  try {

      // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return setHeaders(NextResponse.json({}));
    }
    const data = await req.json();
    console.log(data);
    const { img } = data;

    // Decode the base64 image
    const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const database = client.db('poop_patrol');

    
    const submissions = database.collection("images");

    //const result = 
    await submissions.insertOne({
      buffer,
      submittedAt: new Date(),
      weight: 'baton weight hardcoded',
      face: 0,
    });


    // Define the path to save the image
    // const imagePath = path.join('/tmp', `image-${Date.now()}.png`);

    // Save the image to the filesystem
    // await fs.writeFile(imagePath, buffer);

    // Construct the image URL
    // const imageUrl = `/uploads/image-${Date.now()}.png`;

    return NextResponse.json({ message: 'Image received successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error processing the request:', error); // Log the error
    return NextResponse.json({ error: 'Failed to process the request' }, { status: 400 });
  }
}