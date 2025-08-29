import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{
    //Get User details from the frontend
    //validation-not empty
    //check if user already exists :username and email
    //check for Images,check for avatar
    //upload them to cloudinary,avatar
    //create user object-create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response

    const {fullName,email,username,password}=req.body
    console.log("email ",email);


    //Validation 


    //Ye tarika good for beginnneer hai bahut sara if else block banana padega ekse liye 

    // //fullName is empty
    // if(fullName===""){
    //     throw new ApiError(400,"Full Name is required")
    // }

    //Lekin this approach is best
    if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All Fields are required")
    }

    //Check if User already exists or not

    const existedUser=User.findOne({
        //naya tarika to check for 2 filed at once with OR operator
        $or:[{ username },{ email }]
    })
    if(existedUser){
        throw new ApiError(409,"User with Email or Username already Existed")
    }

    //Now we will check for Images,Avatar
    //Ye multer humlogo ko files ka acccess de deta hai express nhi deta hai

    //Conslole.log karke dekdho kya kya hai
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar File is required")
    }

    //Now Upload to cloudinary
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)
    //Ek baaar aur check kar lo ki upload hua ki nhi
    if(!avatar){
        throw new ApiError(400,"Avatar File is required")
    }

    //Ab database me entry mar do 
    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",//Check karna jaruri hai ki coveriMage diya bhi ki nhi kyuki mandatory nhi hai agar ye nhi karege to code phat jayega
        email,
        password,
        username: username.toLowerCase()
    })

    //Chcekc for user created

    //To check wheter it is created or not bhale jayda db call ho raha hai optimiaze ho sakta hia lein janan bbhi jaruri hai ki user bana hai ki ye fullproof tarika to check
    const createdUser=await User.findById(user._id).select(
        //Yaha par hum en cheezo ko mana kr rahe hai ki inko sleect mat karna by default ye sare to slect kar leta hai
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while creating User ")
    }

    //Return the Response

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered  Successfully")
    )

})

export {registerUser}