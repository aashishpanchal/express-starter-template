import 'dotenv/config';
import 'reflect-metadata';
import chalk from 'chalk';
import { createApp } from './app';
import { config } from './conf/config';

const main = async () => {
  // Create the Express application
  const server = await createApp()

  const port = config.PORT;
  const host = config.HOST;

  // Start the server
  server.listen(port, host, () => {
    const url = `http://${host}:${port}`;
    const urlWithColor = chalk.cyanBright(url);
    console.log(`Server listen on ${urlWithColor}\n`);
  });
};

void main();
