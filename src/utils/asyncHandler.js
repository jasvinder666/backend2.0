//asyncHandler is Higher Order Function
// Higher Order Functions: Takes another function as input (argument)
//Returns another function as output
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
        //.catch(next) passes the error to Express’s error handling middleware
    }
// In Express, if you use async/await inside route handlers, errors can happen (like DB errors, API errors).
// Normally, you would need to write try...catch in every route.
// This asyncHandler removes that repetition.
}
export {asyncHandler}
// const asyncHandler = () => {}
// const asyncHandler = (func) => {() => {}}, we can remove curly brackets
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }