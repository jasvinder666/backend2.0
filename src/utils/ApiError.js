class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)  // call parent (Error) constructor
        this.statusCode = statusCode       // HTTP status code (404, 500, etc.)
        this.data = null                   // placeholder for extra data
        this.message = message             // error message
        this.success = false               // always false for errors
        this.errors = errors               // extra error details (array)

        // Stack trace handling (for debugging)
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export { ApiError }
