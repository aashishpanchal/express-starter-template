import * as winston from "winston";
import * as formats from "./formats";
import * as constants from "./constants";

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: constants.LEVEL_LABEL,
      levels: constants.LEVELS,
      format: formats.prettyPrint(),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          level: "error",
          filename: "server-error.log",
          format: formats.excludeColors,
        }),
      ],
    });
  }

  get winston() {
    return this.logger;
  }

  log(message: any, ...meta: any[]) {
    if (!!message && "object" === typeof message) {
      const { message: msg, level = "info", ...meta } = message;

      return this.logger.log(level, msg as string, { ...meta });
    }

    return this.logger.info(message, meta);
  }

  warn(msg: any, ...meta: any[]) {
    this.logger.warn(msg, meta);
  }

  error(msg: any, ...meta: any[]) {
    this.logger.error(msg, meta);
  }

  debug(msg: any, ...meta: any[]) {
    this.logger.debug(msg, meta);
  }
}

export default new Logger();
