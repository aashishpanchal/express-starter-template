import ansis from 'ansis';
import morgan from 'morgan';
import logger from '@/logger';

// status code with colors
morgan.token('status', (_, res) => {
  const status = res.statusCode;
  const isBetween = (min: number, max: number) => status >= min && status < max;

  let colorFn;
  if (isBetween(100, 200))
    colorFn = ansis.blue; // Blue for informational responses
  else if (isBetween(200, 300))
    colorFn = ansis.green; // Green for success responses
  else if (isBetween(300, 400))
    colorFn = ansis.yellow; // yellow for redirection responses
  else colorFn = ansis.red; // Red for server error responses
  return colorFn(status);
});

const FORMAT = `:remote-addr - "${ansis.bold(':method :url HTTP/:http-version')}" :status - :response-time ms`;

export const terminalLog = () =>
  morgan(FORMAT, {stream: {write: message => logger.info(message.trim())}});
