import winston from 'winston';
import { EnvSchema, envSchema } from './schema';
import { validateEnv } from '@/utils/env-validate';

// validate env
const env = validateEnv<EnvSchema>(envSchema);

// config data
export const config = Object.freeze({
  NAME: env.NAME,
  PORT: env.PORT,
  HOST: env.HOST,
  VERSION: '1.0.0',
  IS_DEV: env.NODE_ENV === 'development',

  // jwt
  JWT: {
    ISSUER: env.NAME,
    SECRET: env.SECRET,
    ACCESS_EXP: env.JWT_ACCESS_EXP,
    REFRESH_EXP: env.JWT_REFRESH_EXP,
  },

  // logger
  LOGGER: {
    LABEL: 'info',
    NAME: env.NAME,
    LEVELS: winston.config.npm.levels,
  },

  // smtp
  SMTP: {
    HOST: env.SMTP_HOST,
    PASS: env.SMTP_PASS,
    PORT: env.SMTP_PORT,
    USER: env.SMTP_USER,
    FROM: env.SMTP_FROM,
  },
});
