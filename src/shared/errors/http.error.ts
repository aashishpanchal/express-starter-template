import { isString, isObject } from 'lodash';
import { BodyMessage, HttpErrorBody } from '../interfaces/error.interface';

/**
 * HTTP errors handler class
 */
export class HttpError extends Error {
  constructor(
    readonly res: string | Record<string, any> | BodyMessage,
    readonly status: number,
    readonly error?: string,
  ) {
    super();
    // Initialize error message and name
    if (typeof this.res === 'string') {
      // If response is a string, use it as the message
      this.message = this.res;
    } else if (
      isObject(this.res) &&
      !Array.isArray(this.res) &&
      isString(this.res.message)
    ) {
      // If response is an object with a message property, use it as the message
      this.message = this.res.message;
    } else {
      // If no message provided, set a default error message based on the class name
      this.message =
        this.constructor.name.replace(/[A-Z][a-z]+|[0-9]+/g, ' ') || 'Error';
    }
    // Capture stack trace for better debugging
    Error.captureStackTrace(this, this.constructor);
  }

  // Get the error body
  public get body(): HttpErrorBody | Record<string, any> {
    if (!this.res)
      return {
        message: this.error,
        statusCode: this.status,
      };

    if (isString(this.res) || Array.isArray(this.res)) {
      // If response is a string or an array, construct the error body
      return {
        message: this.res,
        error: this.error,
        statusCode: this.status,
      };
    }
    // If response is an object, return it as the error body
    return this.res;
  }

  // Check if an error is an instance of HttpError
  static isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError;
  }
}
