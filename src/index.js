import connectDb from "./db/index.js";
// require('dotenv').config({path:'./env'})
//Second Method to do this
import {} from 'dotenv/config' 
import dotenv from "dotenv"
dotenv.config({
    path:'./env'
})

connectDb();



/*

This is the First approachj to connect to database which is done in Index file only but pollute the index file and make look big and it not modular also and in indsutry it is not written like it 
They use second method.

import express from "express"
const app=express()
(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRR: ",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }catch(error){
        console.error("ERROR",error)
        throw err
    }
})()
    */