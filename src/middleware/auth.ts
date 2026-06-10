import { type Request, type Response, type NextFunction } from "express";
import { env } from "../config/env.js";

export const requireApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
