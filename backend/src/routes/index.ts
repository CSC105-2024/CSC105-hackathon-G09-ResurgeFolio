import { Hono } from "hono";
import postfolioRoute from "./portfolio.route.js";
import userRoute from "./user.route.js";
import reviewRoute from "./review.route.js";
const mainRouter = new Hono()

mainRouter.route('/post',postfolioRoute)
mainRouter.route('/user',userRoute)
mainRouter.route('/review', reviewRoute)
export default mainRouter