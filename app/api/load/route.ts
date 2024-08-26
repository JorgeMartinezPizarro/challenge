import fs from 'fs';

import {parseCSV, errorMessage} from '../../helpers'
import { ArticlesResponse } from '@/app/types';

export async function POST(request: Request): Promise<Response> {  
  try {
    const start = Date.now()
    const body = await request.json()
    
    const page: number = parseInt(body.page || 0)
    const pageSize: number = parseInt(body.pageSize || 0)
    const refresh: boolean = body.refresh
    
    const projectFolder = process.cwd(); 
    
    let results: string[][] = []
    try {
      if (refresh)
        throw new Error("Removing stored values, reset to defaults.")
      results = JSON.parse(fs.readFileSync(projectFolder + '/data/stored.json', 'utf8'))
    } catch(e) {
      fs.existsSync(projectFolder + '/data/stored.json') && fs.unlinkSync(projectFolder + '/data/stored.json')
      results = await parseCSV(fs.readFileSync(projectFolder + '/data/original.csv', 'utf8'))    
    }
    
    const response: ArticlesResponse = {
      message: `Successfully ${refresh ? " freshly load from challenge csv " : " load "} page ${page} with ${pageSize} articles in ${Date.now() - start} ms`,
      articles: {
        data: results.slice(1).slice(page * pageSize, pageSize + page * pageSize),
        header: results[0],
        length: results.length - 1
      }
    }


    return new Response(JSON.stringify(response), {
      headers: { 
          'Content-Type': 'application/json; chatset=utf-8',
      }
    });
  } catch (error) {
    return new Response("Error loading content, the application could not start. " +  errorMessage(error), { status: 500 });
  }
}
