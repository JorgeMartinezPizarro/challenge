import path from 'path';
import fs, { read } from 'fs';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { convertToCSV, errorMessage, parseCSV } from '@/app/helpers';

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

  try {
    
    const projectFolder = process.cwd(); 

    const filepath = projectFolder + "/data/stored.json";

    const originalPath = projectFolder + "/data/original.csv";
    
    const downloadPath = path.join(process.cwd(), "data", "stored.csv");
    
    if (!fs.existsSync(filepath)) {
      fs.copyFileSync(originalPath, downloadPath)
    } else {
      fs.writeFileSync(downloadPath, convertToCSV(JSON.parse(fs.readFileSync(filepath, "utf8"))))
    }
    
    const readStream = fs.createReadStream(downloadPath);

    const readableStream = streamToReadableStream(readStream);

    if (readStream === null || readStream === undefined)
      return NextResponse.json({ error: 'File not found ' + filepath} , {status: 404});
    else
      return new NextResponse(readableStream);
  }
  catch(e) {


    return NextResponse.json({ error: errorMessage(e) }, {status: 404});
  }
}