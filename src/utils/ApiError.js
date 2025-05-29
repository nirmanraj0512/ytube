class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went Wrong",
        errors=[],
        statck=""
    ){
        ///Here we are overwriting the previous code accordig to our need
        super(message)
        this.statusCode=statusCode
        //learn more about this.data what it contains
        this.data=null
        this.message=message
        this.success-false;
        this.error=errors


        ///Ye kyu likhe hai isme bare me aur research karo 

        if(statck){
            this.stack=statck
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}