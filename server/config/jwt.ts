import "dotenv/config";

export const JWT_SECRET = process.env.JWT_SECRET;

export function requireJwtSecret(): string {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET must be provided");
    }

    return JWT_SECRET;
}
