import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import tagModel from '../models/tags.model.js'; 

export const handleGetAllTags =async(c: Context)=> {
        try {
            const tags = await tagModel();
            return c.json({ data: tags });
        } catch (error) {
            console.error("Error fetching tags:", error);
            throw new HTTPException(500, { message: 'Could not fetch tags.' });
        }
};