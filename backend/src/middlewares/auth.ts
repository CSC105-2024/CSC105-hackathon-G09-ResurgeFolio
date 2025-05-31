import type { Context } from "hono";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = async (c: Context, next: () => Promise<void>) => {
    let token: string | undefined;
    // Try Authorization header first
    const authHeader = c.req.header('authorization');
    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    // Fallback: Try cookie
    if (!token) {
        const cookie = c.req.header("cookie");
        const match = cookie?.match(/userToken=([^;]+)/);
        if (match) {
            token = match[1];
        }
    }
    if (!token) {
        return c.text("Unauthorized", 401);
    }
    // check for secret
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return c.text("Invalid token", 401);
        }
        c.set("user", { id: decoded.id });
        await next();
    } catch (error) {
        return c.text("Invalid token", 401);
    }
};