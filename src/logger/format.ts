import chalk from 'chalk';
import {format, Logform} from 'winston';

// Colors Text
const Color: Record<string, (text: string) => string> = {
  info: chalk.green,
  error: chalk.red,
  warn: chalk.yellow,
  debug: chalk.magentaBright,
  verbose: chalk.cyanBright,
};

/** Error Logs */
const errorLog: Logform.FormatWrap = format(info => {
  if (info?.level === 'error' && info instanceof Error)
    return {...info, message: info?.stack};
  return info;
});

/** Pretty Print */
function print(appName: string) {
  const handlers: Logform.Format[] = [];

  // Add log-error
  handlers.push(errorLog());

  // Add timestamp
  handlers.push(format.timestamp({format: 'DD/MM/YYYY hh:mm:ss A'}));

  // Add printf with timestamp
  handlers.push(
    format.printf(({level, message, timestamp}) => {
      const color = Color[level] || ((text: string): string => text);

      return `[${timestamp}] ${color(
        `${level.toUpperCase()}`,
      )} (${appName}): ${message}`;
    }),
  );

  return format.combine(...handlers);
}

export default print;
