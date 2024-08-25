export const errorMessage = function errorMessage(error: Error | any): string {
        let message: string
        if (error instanceof Error) {
            message = "An Error ocurred. " + error.stack?.toString()
            console.log(message)
            console.log(error.stack?.split("\n").join("\n"))
        }
        else message = String(error)
        return message;
};

