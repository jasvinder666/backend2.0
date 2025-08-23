// A helper class to standardize API responses
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        // HTTP status code (200, 201, etc.)
        this.statusCode = statusCode
        // The actual response data (could be user info, list of items, etc.)
        this.data = data
        // Message to describe the response (default = "Success")
        this.message = message
        // Success flag: true if status code < 400 (2xx and 3xx are successes)
        this.success = statusCode < 400
    }
}
// Export the class so it can be used in other files
export { ApiResponse }
