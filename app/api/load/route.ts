import fs from 'fs';

import {errorMessage} from "../../helpers"

let count = 0

// USE PAGINATION FOR FASTER EXPERIENCE
export async function GET(request: Request): Promise<Response> {  
  try {
    count = 0;
    
    const projectFolder = process.cwd();
    
    const articlesCSV: string = fs.existsSync(projectFolder + '/data/stored.csv') 
        ? fs.readFileSync(projectFolder + '/data/stored.csv', 'utf8')
        : fs.readFileSync(projectFolder + '/data/original.csv', "utf8")
    
    const firstLine = articlesCSV.match(/^[^\n]*/)

    const headerLine = firstLine ? firstLine[0] : ""
    
    const results: string[][] = [headerLine.split(";")]

    // TODO DONT LOAD THE "" IN CASE OF RESERVER CHARS
    articlesCSV.replace(headerLine + "\n", "").split(/\.jpg\s*(?:\r?\n)/).forEach(line => {
        const result = line.split(/;(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)
        if (result.length !== 16) {
            throw new Error("INVALID FORMAT READ, EXPECTE 16 COLUMNS")
        }
        result[15] += ".jpg"
        results.push(result)
    })

    if (count !== 0) {
        throw new Error("Error parsing the line CSV")
    }

    return new Response(JSON.stringify(results), {
        headers: { 
            'Content-Type': 'application/json; chatset=utf-8',
        }
    });

  } catch (error) {
    return new Response("Error reading files. " + errorMessage(error), { status: 500 });
  }
}
