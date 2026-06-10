import morgan from "morgan";
import { logger } from "../utils/logger.js";

export const morganMiddleware = morgan("combined", {
  stream: {
    write: (message: string) => logger.http(message.trim()),
  },
});
