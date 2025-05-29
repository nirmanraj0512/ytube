////Ye wala promise wala hai  
const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise
        //Agar promise fulfil hogya to ye hoga
        .resolve(requestHandler(req,res,next))
        //Nhi to ye hoga err catch karke next kar denge
        .catch((err)=>next(err))
    }
}

export {asyncHandler}

// const asyncHandler=()=>{}
// const asyncHandler=(func)=>{async()=>{}}
// const asyncHandler=(func)=>async()=>{}
    //Yeniche wala kaha se aya ye bataya hai upar 


///Ye try caych wala wraper function hai     
// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try{
//         await fn(req,res,next)
//     }catch(error){
//         res.status(error.code || 500).json({
//             sucess:false,
//             message:error.message
//         })
//     }
// }





