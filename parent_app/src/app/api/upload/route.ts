
// app/api/save-event/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

    // Define the path to save the image
    const imagePath = path.join('tmp', 'public', 'uploads', `image-${Date.now()}.png`);

    // Save the image to the filesystem
    await fs.writeFile(imagePath, buffer);

    // Construct the image URL
    const imageUrl = `/uploads/image-${Date.now()}.png`;

    return NextResponse.json({ message: 'Image received successfully', img: imageUrl }, { status: 200 });
  } catch (error) {
    console.error('Error processing the request:', error); // Log the error
    return NextResponse.json({ error: 'Failed to process the request' }, { status: 400 });
  }
}