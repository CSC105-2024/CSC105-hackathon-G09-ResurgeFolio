import { db } from '../index.js'; 

const tagModel = async()=> {
        return db.tag.findMany({
            orderBy: { name: 'asc' } 
        });
   };
export default tagModel;