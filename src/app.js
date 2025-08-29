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


//routes import 

import  userRouter from "./routes/user.route.js"

//routes declaration
//Ye api/v1 ek standard practise hai
app.use("/api/v1/users",userRouter)
//ye hogya as a pprefix means aab jab bhi user  se related hoga tab phele jab bhi users  hoga rto sara control userRoute [par aa jayega ]\
//Link aisa banega http:7000/users/register  yaha par user just as a middleware kaam kar rha hai jo user ka sara methid ko citnain karega like logi n also 
export {app};