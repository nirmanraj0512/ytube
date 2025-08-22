import multer from "multer";

///Neeche walacode pura multer ka github par hai 

//We  are using disk stroage their many place we can store like mmeory but can get  full so we use disk storage many more can see on github>multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  //yaha par humlofg file ka name dalsakte hai file. dekhna bahut kuch hai options 
  //Abhi humlog orignialname use kar rahe jo bhi user rak rah ahi wahi use karege lekin ye acha nhi hia kyuki user multileefilesame name ka ho sakte hai lekin ye bahut  kaam time ke liye yaha par hota tozayda fark nhi padega 
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage: storage })