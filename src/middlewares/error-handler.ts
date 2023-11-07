import config from "@config";
import httpError from "http-errors";
import httpStatus from "http-status";
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const isDev = config.getOrThrow<boolean>("app.is_dev");
  // http-errors-apis recognize errors
  if (httpError.isHttpError(error))
    return res.status(error.statusCode).json({
      message: error.message,
      error: error.name,
      statusCode: error.statusCode,
    });
  // internal server errors
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: isDev ? error.message : `Something went wrong!`,
    error: isDev ? error.name : "Internal server error",
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
  });
};
