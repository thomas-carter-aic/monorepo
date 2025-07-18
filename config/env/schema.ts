import { z } from 'zod';

/**
 * Shared environment variable schema.
 * Extend or override this per app if needed.
 */
export const envSchema = z.object({
  // General
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(3000),

  // Database
  DATABASE_URL: z.string().url(),

  // Auth (optional)
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),

  // Redis (optional)
  REDIS_URL: z.string().url().optional(),

  // API
  API_BASE_URL: z.string().url().optional(),

  // Feature flags or custom toggles
  FEATURE_X_ENABLED: z
    .string()
    .transform((val) => val === 'true')
    .default('false')
    .pipe(z.boolean())
});

export type EnvVars = z.infer<typeof envSchema>;
