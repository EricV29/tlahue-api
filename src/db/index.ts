import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { env } from "../config/env.js";

dotenv.config();

const connectionString = env.DATABASE_URL!;

const client = postgres(connectionString);
export const db = drizzle(client);
