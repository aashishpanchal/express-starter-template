import chalk from "chalk";
import config from "@config";
import logger from "@logger";
import { App } from "./app";

async function main() {
  const app = await App();
  // get port and host from config
  const port = config.getOrThrow<number>("app.port");
  const host = config.getOrThrow<string>("app.host");
  // server start
  app.listen(port, host, () =>
    logger.log(`Server Listening on: ${chalk.cyan(`http://${host}:${port}`)}`)
  );
}

main();
