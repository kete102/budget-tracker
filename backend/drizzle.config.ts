import { defineConfig } from "drizzle-kit";

if (!process.env.POSTGRES_URL) {
	throw new Error("POSTGRES_URL is not defined in the environment variables")
}

export default defineConfig({
	schema: "./src/db/schemas/*",
	out: "drizzle",
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.POSTGRES_URL,
	}
});


