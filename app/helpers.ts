export const errorMessage = function errorMessage(error: Error | any): string {
        let message: string
        if (error instanceof Error) {
            message = "An Error ocurred. " + error.message + " - " + error.stack
            console.log(message)
            console.log(error.stack?.split("\n").slice(0, 5).join("\n"))
        }
        else message = String(error)
        return message;
};