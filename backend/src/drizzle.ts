import { drizzle } from 'drizzle-orm/postgres-js'
import { processEnv } from './config'

export const db = drizzle(processEnv.POSTGRES_URL)

