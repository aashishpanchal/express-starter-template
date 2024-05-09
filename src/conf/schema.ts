import * as z from 'zod';

// env validation schema
export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NAME: z.string(),
  HOST: z.string(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  SECRET: z.string(),

  // database
  DATABASE_URL: z.string(),

  // jwt
  JWT_ACCESS_EXP: z.string().default('30m'),
  JWT_REFRESH_EXP: z.string().default('30d'),

  // smtp
  SMTP_PORT: z.coerce.number(),
  SMTP_HOST: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
});

export type EnvSchema = z.TypeOf<typeof envSchema>;
