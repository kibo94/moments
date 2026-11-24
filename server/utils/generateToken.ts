
import jwt from "jsonwebtoken"
import { requireJwtSecret } from "../config/jwt.ts";

export const generateToken = (id: string) => {
    return jwt.sign({ id }, requireJwtSecret(), {
        expiresIn: '30d',
    })
}
