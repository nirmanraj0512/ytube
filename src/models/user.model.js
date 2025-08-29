import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true///Make Searching faster  used in most  commomly searched field,isse thoda slow hotahai isliye har jagah nhi karna hai 
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,//Cloudnaery ka url
            required:true,
        },
        coverImage:{
            type:String,
        },
        watchHistory:[
            //Ye har user ka hoga jaise hi wo koi video dekhega us  video  ko bas array me add kar lenege to aone aap ek list ban jayegwa for fututre taki wo apna watch histroy dekh sake
            {
                type: Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"Password  is Required"]///Ye wala comment har required fieldsaath likh skate hai 
        },
        refreshToken:{
            type:String,
        }
    },
    {
        timestamps:true
    }
)

//pre Take the fuction befor which you want to do thing and callBack yaha par arrow fucntion no iuse because it don't know context this use nhi kar payegae if arrow fuction 

//middleware to next(flag hai)bhi hona chiaye isa kaam hota hai jab sab kaam ho jaye to end me call karna padeta hai ki aage pass kardo

//Yaha par humlog password filed ko encrypt kar rhae hai
userSchema.pre("save",async function(next){
    //Yaha parcheckakrn jaroori hai ki password modify ho tabhi ye ho nhi to kuch bhi change hoga to ye run karega 
    if(!this.isModified("password"))return next();
    //bcrypt.hash two cheesz leta hia ek kisko bcrypt karna hai aur ek kitna no of round lagna hai hashing ka
    this.password=await bcrypt.hash(this.password,10)
    next()
})
//Check password sahi hai ki nhi
userSchema.methods.isPasswordCorrect=async function (password) {
    //bcrypt password check bhi kar diti hai
    return await bcrypt.compare(password,this.password)
}
//To generate Access Token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this.id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        },
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User=mongoose.model("User",userSchema)