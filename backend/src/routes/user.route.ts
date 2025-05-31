import { Hono } from "hono";
import { createHRUser, createUser, decodeCookie, deleteUser, 
    loginUser, logoutUser, updateEmail, updateName, updatePassword } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
const userRoute = new Hono();


userRoute.post('/register',createUser)
userRoute.post('/registerHr',createHRUser);
userRoute.post('/login',loginUser);
userRoute.delete('/logout',logoutUser);
userRoute.get('/decodeCookie',decodeCookie)

userRoute.patch('/updateEmail',authMiddleware,updateEmail);
userRoute.patch('/updateName',authMiddleware,updateName);
userRoute.patch('/updatePassword',authMiddleware,updatePassword);
userRoute.delete('/deleteAccount',authMiddleware,deleteUser);
export default userRoute