import {Hono} from 'hono';
import {handleCreatePortfolio,handleGetMyPortfolios,handleGetPortfoliosByStatus,handleGetPortfolioByTag, handleDeletePortfolio} from '../controllers/portfolio.controller.js';
import { authMiddleware } from "../middlewares/auth.js";
const portfolioRoute = new Hono();
//all good :D
portfolioRoute.post('/CreatePost',authMiddleware,handleCreatePortfolio);
//get your submitted portfolio 
portfolioRoute.get('/get',authMiddleware,handleGetMyPortfolios);
portfolioRoute.post('/getStatus',authMiddleware,handleGetPortfoliosByStatus);
portfolioRoute.delete(':id',authMiddleware,handleDeletePortfolio);
portfolioRoute.get('/:tags/getTag',authMiddleware,handleGetPortfolioByTag);
export default portfolioRoute;