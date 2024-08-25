import fs from 'fs'
import Papa from "papaparse";

export function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            
            Papa.parse(data, {
                delimiter: ';',
                header: false,
                skipEmptyLines: true,
                complete: (results) => resolve(results.data),
                error: (error) => reject(error)
            });
        });
    });
  }

// Function to convert data to CSV format
export function convertToCSV(data) {
    let csv = ""

    data.forEach(line => {
      // TODO: ADD "" if required!
      if (line.length > 0 && line[0].trim() !== "") {
        csv += line.map(f => '"' + f + '"' ).join(";") + "\n"
      }
    })    

    return csv
  }