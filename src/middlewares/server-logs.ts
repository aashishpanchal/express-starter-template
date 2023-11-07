import chalk from "chalk";
import morgan from "morgan";
import logger from "@logger";

const empty = (text: string): string => text;

const getColor = (status: number) => {
  const color =
    status >= 400 || status >= 500
      ? chalk.red
      : status >= 300
      ? chalk.cyan
      : status >= 200
      ? chalk.green
      : empty;
  return color;
};

export function serverLogs(): ReturnType<typeof morgan> {
  return morgan((tokens: any, req, res) => {
    const status = Number(tokens.status(req, res));

    const color = getColor(status);

    const msg = [
      color(`${tokens["remote-addr"](req, res)} -`),
      color(`"${tokens.method(req, res)}`),
      color(tokens.url(req, res)),
      color(`HTTP/${tokens["http-version"](req, res)}"`),
      color(status.toString()),
      color(` ${tokens["response-time"](req, res)} ms`),
    ].join(" ");

    logger.log(msg);

    return null;
  });
}
