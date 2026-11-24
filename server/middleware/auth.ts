import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { requireJwtSecret } from "../config/jwt.ts";

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export default function auth(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): void {
    const authorization = req.header("Authorization");
    if (!authorization?.startsWith("Bearer ")) {
        res.status(401).send("Not authorized, no token");
        return;
    }

    const token = authorization.slice("Bearer ".length).trim();
    if (!token) {
        res.status(401).send("Not authorized, no token");
        return;
    }

    try {
        req.user = jwt.verify(token, requireJwtSecret());
        next();
    } catch (error: unknown) {
        console.log(error);
        res.status(401).send("Not authorized");
    }
}
