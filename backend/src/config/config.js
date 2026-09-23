import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

if (!process.env.PORT) {
    throw new Error("PORT is not defined in environment variables");
}

if (!process.env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD is not defined in environment variables");
}

if (!process.env.ORIGIN) {
    throw new Error("ORIGIN is not defined in environment variables");
}

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not defined in environment variables");
}

if (!process.env.OWNER_EMAIL) {
    throw new Error("OWNER_EMAIL is not defined in environment variables");
}

const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ORIGIN: process.env.ORIGIN,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    OWNER_EMAIL: process.env.OWNER_EMAIL,
}

export default config;