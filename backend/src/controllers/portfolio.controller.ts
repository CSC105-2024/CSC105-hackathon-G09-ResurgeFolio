import portfolioModel from "../models/portfolio.model.js";
import type {Context} from "hono";
import { HTTPException } from 'hono/http-exception';
import {type CreatePortfolio} from "../models/portfolio.model.js";


export const handleCreatePortfolio = async (c: Context) => {
    try {
        const body = await c.req.json() as CreatePortfolio;
        if (!body || typeof body !== 'object') {
            return c.json({ error: "Invalid request body." }, 400);
        }

        const newPortfolio = await portfolioModel.CreatePortfolioModel(body);

        return c.json({
            message: "Portfolio created successfully.",
            data: newPortfolio
        }, 201);

    } catch (error) {
        if (error instanceof HTTPException) {
            // @ts-ignore
            return c.json({ error: error.message, cause: error.cause?.message }, error.status);
        }
        console.error("Unexpected error in handleCreatePortfolio:", error);
        return c.json({ error: "An unexpected server error occurred." }, 500);
    }
};
export const handleGetMyPortfolios = async (c: Context) => {
    try {
        const user = c.get("user");
        const authenticatedUserId = user.id;

        if (!user || authenticatedUserId === undefined) {
            throw new HTTPException(401, { message: "Authentication required." });
        }
        const portfolios = await portfolioModel.GetPortfoliosByUserId(authenticatedUserId); // Call without skip/take

        return c.json({
            message: portfolios.length > 0 ? "Your portfolios retrieved successfully." : "No portfolios found for your account.",
            data: portfolios,
            totalCount: portfolios.length
        });

    } catch (error) {
        if (error instanceof HTTPException) {
            const causeMessage = error.cause ? String(error.cause) : undefined;
            return c.json({ error: error.message, cause: causeMessage }, error.status);
        }
        console.error("Error in handleGetMyPortfolios:", error);
        return c.json({ error: "An unexpected server error occurred while retrieving portfolios." }, 500);
    }
};
export const handleGetPortfoliosByStatus = async (c: Context) => {
    try {
        const body = await c.req.json();
        const status = body.status;

        const user = c.get("user");
        const authenticatedUserId = user?.id;
        if (!user || authenticatedUserId === undefined) {
            console.log("Accessing portfolios by status (user not necessarily required for filter logic, but context available if logged in).");
        }
        if (status === undefined || status === null) {
            return c.json({ error: "Request body must include a 'status' field." }, 400);
        }
        if (typeof status !== 'string' || status.trim() === "") {
            return c.json({ error: "'status' must be a non-empty string." }, 400);
        }

        const allowedStatuses = ["PENDING", "APPROVED", "REJECTED"];
        if (!allowedStatuses.includes(status.toUpperCase())) { // Consider case-insensitivity
            return c.json({ error: `Invalid status value. Allowed statuses are: ${allowedStatuses.join(', ')}.` }, 400);
        }

        const portfolios = await portfolioModel.GetPortfoliosByStatus(status.toUpperCase());

        return c.json({
            message: portfolios.length > 0 ? `Portfolios with status '${status}' retrieved successfully.` : `No portfolios found with status '${status}'.`,
            data: portfolios,
            totalCount: portfolios.length
        });
    } catch (error) {
        if (error instanceof SyntaxError && error.message.includes("JSON")) { // Handle invalid JSON body
            return c.json({ error: "Invalid JSON in request body." }, 400);
        }
        if (error instanceof HTTPException) { // Make sure HTTPException is defined/imported
            const causeMessage = error.cause ? String(error.cause) : undefined;
            return c.json({ error: error.message, cause: causeMessage }, error.status);
        }
        console.error("Error in handleGetPortfoliosByStatus:", error);
        return c.json({ error: "An unexpected server error occurred while retrieving portfolios by status." }, 500);
    }
};