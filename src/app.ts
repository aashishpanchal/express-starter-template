import cors from 'cors';
import conf from './conf';
import express from 'express';
import apiRoutes from './apis/routes';
import cookieParser from 'cookie-parser';
import {handler, ApiRes} from 'exutile';
import {terminalLog} from './middleware/terminal-log';
import {errorHandler, notFoundError} from './middleware/errors-handler';

export const createApp = async () => {
  const app = express();

  // middleware config
  app.use(terminalLog());
  app.use(cookieParser());
  app.use(cors({origin: conf.CLIENT_URL, credentials: true})); // Cross Origin Resource Sharing (CORS)
  app.use(express.json({limit: '30mb'})); // Parse JSON requests
  app.use(express.urlencoded({extended: true, limit: '30mb'}));

  // routes
  app.all(
    '/ping',
    handler(() => ApiRes.ok('Pong')),
  );
  app.use('/api/v1', apiRoutes());

  // error handler
  app.use(notFoundError);
  app.use(errorHandler);

  return app;
};
