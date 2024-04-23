import { SignJWT, jwtVerify } from "jose";
import { getEnvVariable } from "./utils";

export const signJWT = async (payload, options) => {
    try {
        const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET"));
        const alg = "HS256";
        const jwt = new SignJWT(payload)
            .setProtectedHeader({ alg })
            .setIssuedAt();

        if (options?.exp) {
            jwt.setExpirationTime(options.exp);
        }

        return jwt.sign(secret);
    } catch (error) {
        throw error;
    }
};

export const verifyJWT = async (token) => {
    try {
        return (
            await jwtVerify(
                token,
                new TextEncoder().encode(getEnvVariable("JWT_SECRET"))
            )
        ).payload;
    } catch (error) {
        throw new Error("Your token has expired.");
    }
};
