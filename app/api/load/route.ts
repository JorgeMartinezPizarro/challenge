import fs from 'fs';

import {errorMessage} from "../../helpers"
import {parseCSV} from '../../parser'

const PAGE_SIZE = 25

// USE PAGINATION FOR FASTER EXPERIENCE
export async function GET(request: Request): Promise<Response> {  
  try {
    const { searchParams } = new URL(request.url);
    
    const page: number = parseInt(searchParams.get('page')||"0")
    const refresh: boolean = searchParams.get('refresh') ? true : false
    
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
