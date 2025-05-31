import {db} from "../index.js";
import { HTTPException } from 'hono/http-exception';
import {Prisma} from "@prisma/client"

export interface CreatePortfolio {
    userId: number;
    title: string;
    url: string;
    jobPosition: string;
    company: string;
    shortDesc: string;
    learning?: string;
    tags: number[];
}
const CreatePortfolioModel = async(input:CreatePortfolio)=>{
        if(input.userId === undefined || input.userId === null){
            throw new Error("User id is required");
        }
        if(!input.title || input.title.trim() === ""){
            throw new Error("Title is required");
        }
        if(!input.url || input.url.trim() === ""){
            throw new Error("URL is required");
        }
        if(!input.jobPosition || input.jobPosition.trim() === ""){
            throw new Error("Job position is required");
        }
        if(!input.company || input.company.trim() === ""){
            throw new Error("Company is required");
        }
        if(!input.shortDesc || input.shortDesc.trim() === "" || input.shortDesc === null){
            throw new Error("ShortDesc is required");
        }
        if (!input.tags || !Array.isArray(input.tags) || input.tags.length === 0) {
            throw new HTTPException(400, { message: "Tags can't be empty. At least one tag ID is required." });
        }
            const existingUser = await db.user.findUnique({
                where: { id: input.userId },
            });

            if (!existingUser) {
                throw new Error("User does not exist!");
            }

    try {
        const existingTagsCount = await db.tag.count({
            where: { id: { in: input.tags } }
        });
        if (existingTagsCount !== input.tags.length) {
            throw new HTTPException(400, { message: "One or more provided tag IDs are invalid." });
        }

        const newPortfolio = await db.portfolio.create({
            data: {
                userId: input.userId,
                title: input.title.trim(),
                url: input.url.trim(),
                jobPosition: input.jobPosition.trim(),
                company: input.company.trim(),
                shortDesc: input.shortDesc.trim(),
                learning: input.learning ? input.learning.trim() : undefined,
                tags: {
                    connect: input.tags.map(tagId => ({ id: tagId }))
                }
            },
            include: {
                tags: true

            }
        });
        return newPortfolio; // Return the created portfolio
    } catch (e) {
        console.error("Error creating portfolio:", e);
        throw new HTTPException(500, { message: "Could not create portfolio." });
    }
}
const GetPortfoliosByUserId = async (userId: number) => { // Removed skip and take parameters
    if (userId === undefined || userId === null) {
        throw new HTTPException(400, { message: "User ID is required to fetch portfolios." });
    }
    try {
        const userExists = await db.user.findUnique({
            where: { id: userId }
        });
        if (!userExists) {
            throw new HTTPException(404, { message: `User with ID ${userId} not found.` });
        }
        const portfolios = await db.portfolio.findMany({
            where: { userId: userId },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return portfolios;
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        console.error(`Error fetching portfolios for user ${userId}:`, error);
        throw new HTTPException(500, { message: "Could not fetch portfolios." });
    }
};
const GetPortfoliosByStatus = async (status: string) => {
        const portfoliosByStatus = await db.portfolio.findMany({
            where: { status: status },
            include: {
                tags: true,
                user: {
                    select: { id: true, name: true, email: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return portfoliosByStatus;
};

const GetPortfolioDetail = async()=>{

}
export default { CreatePortfolioModel, GetPortfoliosByUserId,GetPortfoliosByStatus };