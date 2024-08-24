import fs from 'fs';

function errorMessage(error: Error | any): string {
    let message: string
    if (error instanceof Error) {
        message = error.message
        console.log("An Error ocurred.")
        console.log(message)
        console.log(error.stack?.split("\n").slice(0, 5).join("\n"))
    }
    else message = String(error)
    return message;
}

export async function GET(request: Request): Promise<Response> {  
  try {
    
    const projectFolder = process.cwd();
    
    const articlesCSV: string = fs.existsSync(projectFolder + '/data/articles.csv') 
        ? fs.readFileSync(projectFolder + '/data/articles.csv', 'utf8')
        : fs.readFileSync(projectFolder + '/data/original.csv', "utf-8")
    
    const headerString = "Hauptartikelnr;Artikelname;Hersteller;Beschreibung;Materialangaben;Geschlecht;Produktart;Ärmel;Bein;Kragen;Herstellung;Taschenart;Grammatur;Material;Ursprungsland;Bildname"

    const header = headerString
        .split(";")
    
    const results: string[][] = [header]

    articlesCSV.replace(headerString, "").split(/\.jpg\s*(?:\r?\n)/).forEach(line => {
        const result = line.split(";")
        result[result.length - 1] += ".jpg"
        results.push(result)
    })
    
    return new Response(JSON.stringify(results), {
        headers: { 
            'Content-Type': 'application/json; chatset=utf-8',
        }
    });

  } catch (error) {
    return new Response("Error reading files. " + errorMessage(error), { status: 500 });
  }
}
