import * as z from 'zod';
import {configEnv} from '@/utils/env';

// Validation schema of env
const schema = {
  PORT: z.coerce.number().default(3000),
  NAME: z.string(),
  HOST: z.string(),
  SECRET: z.string(),
  NODE_ENV: z.enum(['dev', 'prod']).default('prod'),
  CLIENT_URL: z.string().url(),
  // databases
  REDIS_URL: z.string().url().optional(), // remove optional on prod
  DATABASE_URL: z.string().url().optional(), // remove optional on prod
};

export default configEnv(schema);
