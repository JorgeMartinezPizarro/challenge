import fs from 'fs';
import {errorMessage} from "../../helpers"

export async function POST(request: Request): Promise<Response> {  

  try {
    const data: string[][] = await request.json();    
    let csv = ""

    data.forEach(line => {
      // TODO: ADD "" if required!
      if (line.length > 0) {
        const l = line.join().trim()
        if (l !== "") {
          csv += line.join(";") + "\n"
        }
      }
    })

    const projectFolder = process.cwd();
    const articlesFolder = projectFolder + '/data/stored.csv';
    fs.writeFileSync(articlesFolder, csv);
    return new Response(JSON.stringify(data), {
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
