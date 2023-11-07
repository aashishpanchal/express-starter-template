import logger from "@/utils/logger";
import httpError from "http-errors";
import { ErrorRequestHandler } from "express";

export const logError: ErrorRequestHandler = (error, req, res, next) => {
  if (!httpError.isHttpError(error)) logger.error(error);
  next(error);
};
