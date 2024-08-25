import fs from 'fs';

import {errorMessage} from "../../helpers"
import {parseCSV} from '../../parser'

const PAGE_SIZE = 25

// USE PAGINATION FOR FASTER EXPERIENCE
export async function POST(request: Request): Promise<Response> {  
  try {
    const body = await request.json()
    
    const page: number = parseInt(body.page || 0)
    const refresh: boolean = body.refresh
    
    const projectFolder = process.cwd();
    
    if (refresh) 
      fs.copyFileSync(projectFolder + '/data/original.csv', projectFolder + '/data/stored.csv')

    const articlesFolder: string = fs.existsSync(projectFolder + '/data/stored.csv')
      ? projectFolder + '/data/stored.csv'
      : projectFolder + '/data/original.csv'
      
    const results: any = await parseCSV(articlesFolder)
      
    return new Response(JSON.stringify({
      data: results.slice(1).slice(page * PAGE_SIZE, PAGE_SIZE + page * PAGE_SIZE),
      header: results[0],
      length: results.length - 1
    }), {
      headers: { 
          'Content-Type': 'application/json; chatset=utf-8',
      }
    });

    

  } catch (error) {
    return new Response("Error reading files. " + errorMessage(error), { status: 500 });
  }
}
