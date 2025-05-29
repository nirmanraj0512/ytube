import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors({
    //Here we can give our webite link in env 
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//here we are defining the size of data coming from the website and how much we should allow from diffrent paths

///JSON SE aane par
app.use(express.json({limit:"16kb"}))
//Conver charcter into format that can be transmitted on internet
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//Use to serve static files these file do not change when app is runnning 
//We provide directory ehre files are served.
app.use(express.static("public"))

//Cookie parser
app.use(cookieParser())
export {app}