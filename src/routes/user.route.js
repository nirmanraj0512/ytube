import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
const router=Router()

//debugger
// router.use((req, res, next) => {
//   console.log("Hitting users route:", req.method, req.originalUrl);
//   next();
// });

//http:7000/api/v1/users/register 
// router.route("/register").post(registerUser)
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

export default router