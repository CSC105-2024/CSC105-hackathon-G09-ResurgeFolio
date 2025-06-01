
import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import  reviewModel from '../models/review.model.js';
import {type CreateReviewModelInput} from "../models/review.model.js";
import { getReviewByPortfolioIdModel } from '../models/review.model.js';
export const handleCreateReview= async (c: Context)=> {
        try {
            const authenticatedUser = c.get('user');
            if (!authenticatedUser || !authenticatedUser.id) {
                throw new HTTPException(401, { message: 'Unauthorized. Reviewer must be logged in.' });
            }
            const reviewerId = authenticatedUser.id as number;

            const body = await c.req.json();

            if (!body.portfolioId || typeof body.portfolioId !== 'number') {
                throw new HTTPException(400, { message: 'portfolioId is required and must be a number.' });
            }
            if (!body.status || typeof body.status !== 'string') {
                throw new HTTPException(400, { message: 'status is required and must be a string.' });
            }

            const createInput: CreateReviewModelInput = {
                portfolioId: body.portfolioId,
                reviewerId: reviewerId,
                status: body.status,
                failureDesc: body.failureDesc,
            };

            const result = await reviewModel.createReviewModel(createInput);
            return c.json({
                message: 'Review submitted and portfolio status updated successfully.',
                review: result.newReview,
                portfolioStatus: result.updatedPortfolioStatus,
            }, 201);

        } catch (error: any) {
            if (error instanceof HTTPException) {
                 return c.json({ error: error.message, cause: error.cause instanceof Error ? error.cause.message : String(error.cause || '') }, error.status);
            }
            if (error instanceof SyntaxError && error.message.includes("JSON")) {
                return c.json({ error: "Invalid JSON in request body." }, 400);
            }
            console.error("Error in handleCreateReview (controller):", error);
            return c.json({ error: 'An unexpected server error occurred while processing the review.' }, 500);
        }

};

export const handleGetReviewByPortfolioId = async (c: Context) => {
  try {
    const body = await c.req.json();
    const portfolioId = Number(body.portfolioId);

    if (!portfolioId || isNaN(portfolioId)) {
      return c.json({ error: "portfolioId is required and must be a valid number" }, 400);
    }

    const reviews = await getReviewByPortfolioIdModel(portfolioId);
    return c.json(reviews, 200);
  } catch (error: any) {
    console.error("Error in handleGetReviewByPortfolioId:", error);
    return c.json({ error: error.message }, error.status || 500);
  }
};
