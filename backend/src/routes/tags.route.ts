import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/auth.js';
import {handleGetAllTags} from "../controllers/tags.controller.js";

const tagsRoute = new Hono();

tagsRoute.get('/',authMiddleware,handleGetAllTags)
export default tagsRoute;