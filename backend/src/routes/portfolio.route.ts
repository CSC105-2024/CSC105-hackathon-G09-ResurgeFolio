import {Hono} from 'hono';
import {handleCreatePortfolio,handleGetMyPortfolios,handleGetPortfoliosByStatus} from '../controllers/portfolio.controller.js';
import { authMiddleware } from "../middlewares/auth.js";
const postfolioRoute = new Hono();

postfolioRoute.post('/CreatePost',authMiddleware,handleCreatePortfolio);
postfolioRoute.get('/get',authMiddleware,handleGetMyPortfolios);
postfolioRoute.post('/getStatus',authMiddleware,handleGetPortfoliosByStatus);
export default postfolioRoute;