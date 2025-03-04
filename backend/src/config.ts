import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const EnvSchema = z.object({
  POSTGRES_URL: z.string().url(),
  JWT_SECRET_ACCESS: z.string(),
  JWT_SECRET_REFRESH: z.string(),
  NODE_ENV: z.string(),
});

export const processEnv = EnvSchema.parse(process.env);

export const allowedOrigins =
  processEnv.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://tu-dominio-en-produccion.com";
