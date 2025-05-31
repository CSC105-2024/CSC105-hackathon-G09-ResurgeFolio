
import { db } from "../index.js"; // Adjust path to your Prisma client instance
import { HTTPException } from 'hono/http-exception';
import { Prisma } from "@prisma/client";

export interface CreateReviewModelInput {
    portfolioId: number;
    reviewerId: number;
    status: string;
    failureDesc?: string;
}

const allowedReviewStatuses = ["ACCEPTED", "REJECTED"]; // Centralize allowed statuses

const createReviewModel = async (input: CreateReviewModelInput) => {
    const { portfolioId, reviewerId, status, failureDesc } = input;
    const normalizedStatus = status.toUpperCase();

    // --- Basic Validation ---
    if (portfolioId === undefined || portfolioId === null) {
        throw new HTTPException(400, { message: "Portfolio ID is required." });
    }
    if (reviewerId === undefined || reviewerId === null) {
        throw new HTTPException(400, { message: "Reviewer ID is required." });
    }
    if (!normalizedStatus || !allowedReviewStatuses.includes(normalizedStatus)) {
        throw new HTTPException(400, { message: `Invalid review status. Allowed values are: ${allowedReviewStatuses.join(', ')}.` });
    }

    let finalFailureDesc = failureDesc; // Prepare failureDesc for database insertion
    if (normalizedStatus === "REJECTED") {
        if (!failureDesc || failureDesc.trim() === "") {
            throw new HTTPException(400, { message: "failureDesc is required when status is REJECTED." });
        }
        // Ensure failureDesc is a trimmed string if provided
        finalFailureDesc = failureDesc.trim();
    } else { // For "ACCEPTED" or any other non-rejected status
        if (failureDesc && failureDesc.trim() !== "") { // Log if failureDesc provided unnecessarily
            console.warn(`failureDesc was provided for a review with status '${normalizedStatus}'. It will be ignored and set to null.`);
        }
        finalFailureDesc = undefined; // Explicitly set to null for non-REJECTED statuses
    }

    try {
        // --- Database Operations within a Transaction ---
        const result = await db.$transaction(async (prisma) => {
            // 1. Verify Portfolio exists
            const portfolio = await prisma.portfolio.findUnique({
                where: { id: portfolioId },
            });
            if (!portfolio) {
                throw new HTTPException(404, { message: `Portfolio with ID ${portfolioId} not found.` });
            }

            // 2. Verify Reviewer (User) exists
            const reviewer = await prisma.user.findUnique({ // Assuming 'User' is your model for reviewers
                where: { id: reviewerId },
            });
            if (!reviewer) {
                throw new HTTPException(404, { message: `Reviewer with User ID ${reviewerId} not found.` });
            }

            // 3. Create the Review record
            const newReview = await prisma.review.create({
                data: {
                    portfolioId: portfolioId,
                    reviewerId: reviewerId,
                    status: normalizedStatus,
                    failureDesc: finalFailureDesc,
                },
                include: {
                    reviewer: { select: { id: true, name: true } }, 
                    portfolio: { select: { id: true, title: true } }
                }
            });

            const updatedPortfolio = await prisma.portfolio.update({
                where: { id: portfolioId },
                data: {
                    status: normalizedStatus, // Mirror the review's status
                },
                select: { status: true } // Only select the updated status for the return
            });

            return { newReview, updatedPortfolioStatus: updatedPortfolio.status };
        });

        return result;

    } catch (e:any) {
        if (e instanceof HTTPException) {
            throw e;
        }
        console.error("Unexpected error in createReviewModel:", e);
        throw new HTTPException(500, { message: "An unexpected server error occurred while creating the review." });
    }
};
export default {createReviewModel}