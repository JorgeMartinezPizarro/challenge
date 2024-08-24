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
    const articlesFolder = projectFolder + '/data/articles.csv';
    let values
    
    
    const csv = fs.readFileSync(articlesFolder, 'utf8');

    const array = csv.split("\n").map(line => line.split(";"))

    const articles: any[] = []

    array[0].forEach((title) => {
        array.slice(1).forEach((element, j) => {
            let el: any = {}
            element.forEach(x => {
                el[title] = x
            })
            articles.push({
                el                
            })
        })
    });

    console.log(array[1])

    return new Response(JSON.stringify(articles), {
        headers: { 
            'Content-Type': 'application/json; chatset=utf-8',
        }
    });

  } catch (error) {
    return new Response("Error reading files. " + errorMessage(error), { status: 500 });
  }
}
