import { z } from 'zod'

const EnvSchema = z.object({
	MODE: z.string(),
})

export const processEnv = EnvSchema.parse(import.meta.env)
