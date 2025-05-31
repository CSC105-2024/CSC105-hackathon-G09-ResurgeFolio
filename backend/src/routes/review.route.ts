import { Hono } from 'hono';
import { handleCreateReview } from '../controllers/review.controller.js'
import { authMiddleware } from '../middlewares/auth.js';

const reviewsApp = new Hono();
//good
reviewsApp.post('/',authMiddleware,handleCreateReview);
export default reviewsApp;