import * as z from 'zod';

export const LoginDto = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginDto = z.infer<typeof LoginDto>;
