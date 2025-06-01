import { Hono } from 'hono';
import { handleCreateReview, handleGetReviewByPortfolioId } from '../controllers/review.controller.js'
import { authMiddleware } from '../middlewares/auth.js';

const reviewsApp = new Hono();
//good
reviewsApp.post('/',authMiddleware,handleCreateReview);
reviewsApp.post('/getReviewByPortId',authMiddleware,handleGetReviewByPortfolioId)

export default reviewsApp;