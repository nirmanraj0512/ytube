import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary=async (localFilePath)=>{
    try{
        if(!localFilePath)  return "Cannot finf the Path"
        //upload file in coludinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //File has uploaded successfully
        console.log("File is uploaded on Cloudinary",response.url);
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath)//Remove the locally saved temp file as the  upload operation got failed
    }
}

export {uploadOnCloudinary}

