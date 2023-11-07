import { Router } from "express";
import httpError from "http-errors";

export const notFound: Router = Router();

notFound.all("*", (req) => {
  throw httpError.NotFound(`Cannot ${req.method} ${req.originalUrl}`);
});
