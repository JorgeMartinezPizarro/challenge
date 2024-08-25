// This file is plain javascript because I found no @types for papaparse.

import Papa from "papaparse";

export function parseCSV(fileString) {
    return new Promise((resolve, reject) => {
        Papa.parse(fileString, {
            delimiter: ';',
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
            error: (error) => reject(error)
        });
    });
}

// Function to convert data to CSV format
export function convertToCSV(data) {
    let csv = ""

    data.forEach(line => {
      if (line.length > 0 && line[0].trim() !== "") {
        csv += line.map(f => '"' + f + '"' ).join(";") + "\n"
      }
    })    

    return csv
  }

export const errorMessage = function errorMessage(error) {
    let message
    if (error instanceof Error) {
        message = "An Error ocurred. " + error.stack?.toString()
        console.log(message)
        console.log(error.stack?.split("\n").join("\n"))
    }
    else message = String(error)
    return message;
};