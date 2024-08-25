import path from 'path';
import fs, { read } from 'fs';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

// Helper function to convert ReadStream to ReadableStream
const streamToReadableStream = (readStream: Readable): ReadableStream => {
  return new ReadableStream({
    start(controller) {
      readStream.on('data', (chunk) => controller.enqueue(chunk));
      readStream.on('end', () => controller.close());
      readStream.on('error', (err) => controller.error(err));
    },
  });
};


export async function GET(req: Request) {

  const filepath = path.join(process.cwd(), "data", "stored.csv");
  
  const readStream = fs.createReadStream(filepath);

  const readableStream = streamToReadableStream(readStream);

  if (readStream === null || readStream === undefined)
    return NextResponse.json({ error: 'File not found ' + filepath } , { status: 404 });
  else
    return new NextResponse(readableStream);
}