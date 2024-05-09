import { HttpRes } from './response';
import {
  Context,
  ReqHandler,
  Constructor,
  ReqCtxHandler,
} from './interfaces/utils.interface';
import { container } from 'tsyringe';

/**
 * Wraps a request handler function.
 * @param func - The request handler function to be wrapped.
 * @returns A wrapped request handler function.
 */
export function wrapper(func: ReqHandler): ReqHandler;

/**
 * Wraps a request handler function with additional services.
 * @param func - The request handler function to be wrapped.
 * @param services - Additional services to be injected.
 * @returns A wrapped request handler function.
 */
export function wrapper<T extends Constructor<any>[]>(
  func: ReqCtxHandler<Context<T>>,
  ...services: T
): ReqHandler;

/**
 * Implementation of wrapper function.
 * @param func - The request handler function or constructor function.
 * @param services - Additional services to be injected.
 * @returns A wrapped request handler function.
 */
export function wrapper<T extends Constructor<any>[]>(
  func: any,
  ...services: T
): ReqHandler {
  // Resolve all services from the container.
  const context: InstanceType<any>[] = services.map(container.resolve);

  return (req, res, next) => {
    try {
      const result = context.length
        ? func(context, req, res, next)
        : func(req, res, next);

      if (result instanceof Promise) {
        result.then((value: any) => handleResult(value, res)).catch(next);
      } else {
        handleResult(result, res);
      }
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Handles the result returned by the wrapped function.
 * @param result - The result returned by the wrapped function.
 * @param res - The response object.
 */
function handleResult(result: any, res: any): void {
  if (HttpRes.isHttpRes(result)) res.status(result.statusCode).json(result);
  else if (result && result !== res) res.send(result);
}
