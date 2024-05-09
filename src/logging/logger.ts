import winston from 'winston';
import { config } from '@/conf/config';
import { prettyPrint } from './formate';

const logger = winston.createLogger({
  level: config.LOGGER.LABEL,
  levels: config.LOGGER.LEVELS,
  format: prettyPrint(config.LOGGER.NAME),
  transports: [
    new winston.transports.File({
      level: 'info',
      dirname: 'logs',
      filename: 'combined.log',
      format: winston.format.uncolorize(),
    }),
    new winston.transports.File({
      level: 'error',
      dirname: 'logs',
      filename: 'errors.log',
      format: winston.format.uncolorize(),
    }),
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});

export default logger;
