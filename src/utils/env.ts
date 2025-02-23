import fs from 'fs';
import * as z from 'zod';
import dotenv from 'dotenv';

type ReturnObject<T extends z.ZodRawShape> = z.infer<z.ZodObject<T>> & {
  isDev: boolean;
};

export const configEnv = <T extends z.ZodRawShape>(
  obj: T,
  path: string | string[] = '.env',
): ReturnObject<T> => {
  const pathArray = Array.isArray(path) ? path : [path];
  // Load env files
  const configs = pathArray
    .filter(fs.existsSync)
    .map(envFilePath => dotenv.parse(fs.readFileSync(envFilePath)));
  // Merge all configs
  const env = configs.reduce((acc, curr) => ({...acc, ...curr}), {});
  // Validate environment variables using Zod
  const result = z.object(obj).safeParse(env);
  if (!result.success) {
    console.error(
      'Environment variable validation failed:',
      result.error.errors,
    );
    process.exit(1);
  }
  // Node Dev
  const isDev = env.NODE_ENV?.startsWith('dev') || false;
  // set is-dev inside data object
  return Object.freeze({...result.data, isDev}) as any;
};
