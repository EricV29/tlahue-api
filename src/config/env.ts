const REQUIRED_VARS = ["DATABASE_URL", "API_KEY", "PORT"] as const;

type EnvVars = (typeof REQUIRED_VARS)[number];

function validateEnv(): Record<EnvVars, string> {
  const missing: string[] = [];

  for (const key of REQUIRED_VARS) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  return process.env as Record<EnvVars, string>;
}

export const env = validateEnv();
