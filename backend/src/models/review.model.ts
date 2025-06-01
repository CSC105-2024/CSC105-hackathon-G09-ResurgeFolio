import { db } from "../index.js";
import { HTTPException } from 'hono/http-exception';

export interface CreateReviewModelInput {
    portfolioId: number;
    reviewerId: number;
    status: string;
    failureDesc?: string;
}

const allowedReviewStatuses = ["APPROVED", "REJECTED"]; // define allowed statuses

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

    // --- Validate failureDesc based on status ---
    if (normalizedStatus === "REJECTED") {
        if (!failureDesc || failureDesc.trim() === "") {
            throw new HTTPException(400, { message: "failureDesc is required when status is REJECTED." });
        }
    } else if (normalizedStatus === "APPROVED") {
        if (failureDesc && failureDesc.trim() !== "") {
            throw new HTTPException(400, { message: "failureDesc must not be provided when status is APPROVED." });
        }
    }

    try {
        // --- Database Operations within a Transaction ---
        const result = await db.$transaction(async (prisma) => {
            const portfolio = await prisma.portfolio.findUnique({ where: { id: portfolioId } });
            if (!portfolio) {
                throw new HTTPException(404, { message: `Portfolio with ID ${portfolioId} not found.` });
            }

            const reviewer = await prisma.user.findUnique({ where: { id: reviewerId } });
            if (!reviewer) {
                throw new HTTPException(404, { message: `Reviewer with User ID ${reviewerId} not found.` });
            }

            const newReview = await prisma.review.create({
                data: {
                    portfolioId,
                    reviewerId,
                    status: normalizedStatus,
                    failureDesc: normalizedStatus === "REJECTED" ? failureDesc : undefined,
                },
                include: {
                    reviewer: { select: { id: true, name: true } },
                    portfolio: { select: { id: true, title: true } }
                }
            });

            const updatedPortfolio = await prisma.portfolio.update({
                where: { id: portfolioId },
                data: { status: normalizedStatus },
                select: { status: true }
            });

            return { newReview, updatedPortfolioStatus: updatedPortfolio.status };
        });

        return result;

    } catch (e: any) {
        if (e instanceof HTTPException) {
            throw e;
        }
        console.error("Unexpected error in createReviewModel:", e);
        throw new HTTPException(500, { message: "An unexpected server error occurred while creating the review." });
    }
};


export const getReviewByPortfolioIdModel = async (portfolioId: number) => {
  if (!portfolioId) {
    throw new HTTPException(400, { message: "portfolioId is required" });
  }

  try {
    const reviews = await db.review.findMany({
      where: { portfolioId },
      include: {
        reviewer: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return reviews;
  } catch (err) {
    console.error("Error in getReviewByPortfolioIdModel:", err);
    throw new HTTPException(500, { message: "Failed to fetch reviews" });
  }
};
export default { createReviewModel };
