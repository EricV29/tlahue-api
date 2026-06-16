import { type Request, type Response, type NextFunction } from "express";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

export const requireApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== env.API_KEY) {
    logger.warn(`Unauthorized request from ${req.ip}`);
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
