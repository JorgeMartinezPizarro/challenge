import fs from 'fs';

import {errorMessage} from "../../helpers"
import {convertToCSV, parseCSV} from '../../parser'
import {SaveArticle} from '../../types'

const PAGE_SIZE = 25

export async function POST(request: Request): Promise<Response> {  

  try {
    
    const body = await request.json() as SaveArticle    
    const {pos, data, page} = body
    
    const projectFolder = process.cwd();
    
    const articlesFolder: string = fs.existsSync(projectFolder + '/data/stored.csv')
      ? projectFolder + '/data/stored.csv'
      : projectFolder + '/data/original.csv'
    
    const saveFolder = projectFolder + '/data/stored.csv';
    
    const storedArticles: any = await parseCSV(articlesFolder);
    
    let newArticles = [...storedArticles]
    let message = ""
    if (pos === -1 && data !== undefined) {
      message = "Added new element on first position with data " + "[" + data.join(", ") + "]"
      newArticles = [...newArticles.slice(0, page * PAGE_SIZE + 1), data, ...newArticles.slice(page * PAGE_SIZE + 1)]
    } else if (pos >= 0 && data !== undefined) {
      message = "Edited element with pos " + pos + " and data " + "[" + data.join(", ") + "]"
      newArticles[pos + 1 + page * PAGE_SIZE] = data
    } else if (pos >= 0) {
      newArticles = [...newArticles.slice(0, pos + 1 + page * PAGE_SIZE), ...newArticles.slice(2 + pos + page * PAGE_SIZE)]
      message = "Deleted element with pos " + pos 
    }

    fs.writeFileSync(saveFolder, convertToCSV(newArticles));
    
    return new Response(JSON.stringify({
      message,
      data: {
        header: newArticles[0],
        data: newArticles.slice(1).slice(page * PAGE_SIZE, PAGE_SIZE + page * PAGE_SIZE),
        length: newArticles.length - 1
      }}), {
        headers: { 
            'Content-Type': 'application/json; chatset=utf-8',
        }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: "Error reading files. " + errorMessage(error)
    }), { status: 500 })
  }
}
