import { wrapper } from '../wrapper';
import { NotFoundError } from '../errors';

export const notFound = wrapper((req) => {
  throw new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`);
});
