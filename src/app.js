import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
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
export {app}
