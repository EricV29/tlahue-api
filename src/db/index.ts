import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

dotenv.config();

const connectionString = env.DATABASE_URL!;
logger.info("✅ Database connected");
const client = postgres(connectionString);
export const db = drizzle(client);
