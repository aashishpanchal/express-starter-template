import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import { apiRouter } from './apis/api.router';
import { errorhandler, logHandler, notFound } from './shared/middlewares';

export const createApp = async (): Promise<Express> => {
  const app = express();

  // setup middlewares
  app.use(logHandler()); // Log requests
  app.use(cookieParser()); // cookies parsers
  app.use(cors({ origin: '*', credentials: true })); // Cross Origin Resource Sharing (CORS)
  app.use(express.json({ limit: '30mb' })); // Parse JSON requests
  app.use(express.urlencoded({ extended: true, limit: '30mb' }));

  // initialize Routers
  app.use('/api/v1', apiRouter());
  app.all('*', notFound);

  // initialize handling middleware
  app.use(errorhandler);

  return app;
};
