import conf from '@/conf';
import format from './format';
import winston from 'winston';

const LEVEL = 'silly';
const LEVELS = winston.config.npm.levels;

/**
 * @singleton
 * Logger class that wraps Winston logging functionalities.
 * Supports multiple log levels and formats.
 */
export class Logger {
  readonly #log = winston.createLogger({
    level: LEVEL,
    levels: LEVELS,
    format: format(conf.NAME),
    defaultMeta: {serviceName: 'auth-service'},
    transports: [
      new winston.transports.File({
        level: 'info',
        dirname: 'logs',
        filename: 'combined.log',
        silent: conf.isDev,
        format: winston.format.uncolorize(),
      }),
      new winston.transports.File({
        level: 'error',
        dirname: 'logs',
        filename: 'errors.log',
        silent: conf.isDev,
        format: winston.format.uncolorize(),
      }),
      new winston.transports.Console({
        level: 'info',
      }),
    ],
  });

  public info(message: unknown, ...args: any[]): void {
    this.log('info', message, args);
  }

  public warn(message: unknown, ...args: any[]): void {
    this.log('warn', message, args);
  }

  public error(message: unknown, ...args: any[]): void {
    this.log('error', message, args);
  }

  public debug(message: unknown, ...args: any[]): void {
    this.log('debug', message, args);
  }

  private log(
    level: 'info' | 'debug' | 'warn' | 'error',
    message: any,
    args: any[],
  ): void {
    this.#log.log(level, message, ...args);
  }
}

// We can use directly
export default new Logger();
