import {Hono} from 'hono';
import {handleCreatePortfolio} from '../controllers/portfolio.controller.js';
const postfolioRoute = new Hono();

postfolioRoute.post('/CreatePost',handleCreatePortfolio);
postfolioRoute.get()
export default postfolioRoute;