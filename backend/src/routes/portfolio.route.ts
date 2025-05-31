import {Hono} from 'hono';
import {handleCreatePortfolio,handleGetMyPortfolios,handleGetPortfoliosByStatus} from '../controllers/portfolio.controller.js';
import { authMiddleware } from "../middlewares/auth.js";
const portfolioRoute = new Hono();

portfolioRoute.post('/CreatePost',authMiddleware,handleCreatePortfolio);
portfolioRoute.get('/get',authMiddleware,handleGetMyPortfolios);
portfolioRoute.post('/getStatus',authMiddleware,handleGetPortfoliosByStatus);
export default portfolioRoute;