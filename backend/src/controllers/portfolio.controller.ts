import portfolioModel from "../models/postfolio.model.js";
import type {Context} from "hono";
import { HTTPException } from 'hono/http-exception';
import {type CreatePortfolio} from "../models/postfolio.model.js";

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