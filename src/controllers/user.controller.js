import { asyncHandler } from "../utils/asyncHandler.js";

// Controller function to handle user registration
// Wrapped in asyncHandler to catch errors in async code
const registerUser = asyncHandler(async (req, res) => {
    // Send back a response with status 200 (OK)
    // and a JSON message
    res.status(200).json({
        message: "ok"
    })
})

export{
    registerUser
}