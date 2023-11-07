import chalk from "chalk";
import { logError } from "./log-error";
import { format, Logform } from "winston";

const Color: Record<string, (text: string) => string> = {
  info: chalk.green,
  error: chalk.bgRed,
  warn: chalk.yellow,
  debug: chalk.magentaBright,
  verbose: chalk.cyanBright,
};

const defaultTimestampFormat = "DD/MM/YYYY hh:mm:ss A";

export interface PrettyPrintOptions {
  timestamps?: Logform.TimestampOptions["format"] | boolean;
}

/**
 * Create a pretty print formatter for a winston logger
 * @param options
 */
export function prettyPrint(options: PrettyPrintOptions = {}) {
  const { timestamps = true } = options;

  const handlers: Logform.Format[] = [];

  if (timestamps) {
    handlers.push(
      format.timestamp({
        format: timestamps === true ? defaultTimestampFormat : timestamps,
      })
    );
  }

  handlers.push(logError());

  handlers.push(
    format.printf(({ level, message, timestamp }) => {
      const color = Color[level] || ((text: string): string => text);

      return `${color(`${level.toUpperCase()}`)}: ${
        timestamps ? `[${timestamp}] ` : ""
      } ${message as string}`;
    })
  );

  return format.combine(...handlers);
}
