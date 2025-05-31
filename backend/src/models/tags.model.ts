// Example: tag.model.ts
import { db } from '../index.js'; // Your Prisma client

const tagModel = async()=> {
        return db.tag.findMany({
            orderBy: { name: 'asc' } // Optional: order them
        });
   };
export default tagModel;