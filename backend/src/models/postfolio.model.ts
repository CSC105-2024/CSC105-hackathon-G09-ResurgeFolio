import {db} from "../index.js";
import { HTTPException } from 'hono/http-exception';


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
        if(!input.shortDesc || input.shortDesc.trim() === ""){
            throw new Error("ShortDesc is required");
        }
            const existingUser = await db.user.findUnique({
                where: { id: input.userId },
            });

            if (!existingUser) {
                throw new Error("User does not exist!");
            }
    try {
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
const GetPortfolioById = async(userId:number)=>{
    
}
export default {CreatePortfolioModel};
