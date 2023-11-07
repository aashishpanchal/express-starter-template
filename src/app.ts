import helmet from "helmet";
import express from "express";
import passport from "passport";
import connectDB from "@/config/db";
import apiRouter from "@/apis/api.router";
import authRouter from "@/auth/auth.router";
import { notFound, errorHandler, logError, serverLogs } from "@/middlewares";

export async function App() {
  // connect database
  await connectDB();
  // create express application
  const app: express.Application = express();
  // middlewares
  app.use(helmet());
  app.use(serverLogs());
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));
  // passport js initialize
  app.use(passport.initialize());
  // default router
  app.get("/", async (_, res) => res.send({ message: "Hello World!" }));
  // auth router
  app.use("/auth", authRouter);
  // api router
  app.use("/api", apiRouter);
  // not found
  app.use(notFound);
  // error handler
  app.use(logError);
  app.use(errorHandler);
  // return app
  return app;
}
