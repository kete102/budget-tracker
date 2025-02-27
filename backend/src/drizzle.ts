import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { z } from 'zod'
dotenv.config()

const EnvSchema = z.object({
	POSTGRES_URL: z.string().url(),
})

const processEnv = EnvSchema.parse(process.env)

export const db = drizzle(processEnv.POSTGRES_URL)
