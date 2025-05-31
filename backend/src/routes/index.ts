import { Hono } from "hono";
import portfolioRoute from "./portfolio.route.js";
import userRoute from "./user.route.js";
import reviewRoute from "./review.route.js";
import tagsRoute from "./tags.route.js";
const mainRouter = new Hono()

mainRouter.route('/post',portfolioRoute)
mainRouter.route('/user',userRoute)
mainRouter.route('/review', reviewRoute)
mainRouter.route('/tags', tagsRoute)
export default mainRouter