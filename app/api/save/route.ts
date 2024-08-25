import fs from 'fs';

import {convertToCSV, parseCSV, errorMessage} from '../../helpers'
import {SaveArticle} from '../../types'

const PAGE_SIZE = 25

export async function POST(request: Request): Promise<Response> {  

  try {
    const start = Date.now()
    const body = await request.json() as SaveArticle    
    const {pos, data, page} = body
    
    const projectFolder = process.cwd();
    
    const storedArticles: string[][] = fs.existsSync(projectFolder + '/data/stored.json')
      ? JSON.parse(fs.readFileSync(projectFolder + '/data/stored.json', 'utf8')) as string[][]
      : await parseCSV(fs.readFileSync(projectFolder + '/data/original.csv', 'utf8')) as string[][]
    
    let newArticles = [...storedArticles]
    let message = ""

    if (pos === -1 && data !== undefined) {
      message = "Added new element on first position with data " + "[" + data.join(", ") + "] in " + (Date.now() - start) + " ms"
      newArticles = [...newArticles.slice(0, page * PAGE_SIZE + 1), data, ...newArticles.slice(page * PAGE_SIZE + 1)]
    } else if (pos >= 0 && data !== undefined) {
      message = "Edited element with pos " + pos + " and data " + "[" + data.join(", ") + "] in " + (Date.now() - start) + " ms"
      newArticles[pos + 1 + page * PAGE_SIZE] = data
    } else if (pos >= 0) {
      newArticles = [...newArticles.slice(0, pos + 1 + page * PAGE_SIZE), ...newArticles.slice(2 + pos + page * PAGE_SIZE)]
      message = "Deleted element with pos " + pos + " in " + (Date.now() - start) + " ms"
    }

    fs.writeFileSync(projectFolder + '/data/stored.json', JSON.stringify(newArticles));
    
    return new Response(JSON.stringify({
      message, 
      articles: {
        header: newArticles[0],
        data: newArticles.slice(1).slice(page * PAGE_SIZE, PAGE_SIZE + page * PAGE_SIZE),
        length: newArticles.length - 1,
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
