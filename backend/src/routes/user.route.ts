import { Hono } from "hono";
import { createUser, loginUser, logoutUser, updateName, updatePassword } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
const userRoute = new Hono();

userRoute.post('/register',createUser)
userRoute.post('/login',loginUser)
userRoute.delete('/logout',logoutUser)
userRoute.patch('/updateName',authMiddleware,updateName);
userRoute.patch('/updatePassword',authMiddleware,updatePassword);
export default userRoute