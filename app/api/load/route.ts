import fs from 'fs';

import {errorMessage} from "../../helpers"
import {parseCSV} from '../../parser'

const PAGE_SIZE = 25

// USE PAGINATION FOR FASTER EXPERIENCE
export async function POST(request: Request): Promise<Response> {  
  try {
    const start = Date.now()
    const body = await request.json()
    //throw new Error("WTF")
    const page: number = parseInt(body.page || 0)
    const refresh: boolean = body.refresh
    
    const projectFolder = process.cwd();
    
    if (refresh) 
      fs.copyFileSync(projectFolder + '/data/original.csv', projectFolder + '/data/stored.csv')

    
    const articlesFolder: string = projectFolder + '/data/stored.json'

    let results: string[][] = []
    if (!refresh && fs.existsSync(articlesFolder)) {
      results = JSON.parse(fs.readFileSync(articlesFolder, 'utf8'))
    } else {
      const originalFolder = projectFolder + '/data/original.csv'
      results = await parseCSV(originalFolder)  
    }
    console.log((Date.now() - start) + " ms")
    return new Response(JSON.stringify({
      data: results.slice(1).slice(page * PAGE_SIZE, PAGE_SIZE + page * PAGE_SIZE),
      header: results[0],
      length: results.length - 1
    }, null, 2), {
      headers: { 
          'Content-Type': 'application/json; chatset=utf-8',
      }
    });
  } catch (error) {
    return new Response("Error loading content, the application could not start. " +  errorMessage(error), { status: 500 });
  }
}
