import type {ZodType} from 'zod';
import {handler, BadRequestError} from 'exutile';

/**
 * Middleware to validate request data against a Zod schema.
 */
export const validate = <T extends ZodType>(
  obj: T,
  type: 'body' | 'query' | 'params',
) =>
  handler((req, res, next) => {
    const {success, data, error} = obj.readonly().safeParse(req[type]);
    if (success) {
      req[type] = data;
      next();
    } else
      throw new BadRequestError(
        `Received data is not valid from req.${type}`,
        error.errors,
      );
  });

/** Validate request body according to zod-schema */
validate.body = <T extends ZodType>(obj: T) => validate(obj, 'body');
/** Validate request params according to zod-schema */
validate.params = <T extends ZodType>(obj: T) => validate(obj, 'params');
/** Validate request query according to zod-schema */
validate.query = <T extends ZodType>(obj: T) => validate(obj, 'query');
