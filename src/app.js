import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
// Allow requests from the given frontend (CORS_ORIGIN)
// Also allow cookies and login info to be shared
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
// data will  come in form of json, url and we have config for these,
//Express automatically read and convert JSON/url data from requests into req.body
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))// for assets like imgs
app.use(cookieParser())
//This lets Express read cookies
//  that come from the browser.
//After this, you can use req.cookies to see the cookies.

//routes import
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/users",userRouter)
// This tells Express: whenever a request starts with /users, use the routes defined in userRouter.
// Example:
// If userRouter has a route router.get("/profile"),
// then you can access it at http://localhost:5000/users/profile.

export {app}
