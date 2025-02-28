import { z } from "zod";
import bcrypt from 'bcryptjs'
import { userTable, PublicUser } from "../db/schemas/user.schema";
import { db } from "../drizzle";
import { PostgresError } from "postgres";

export const loginSchema = z.object({
	email: z.string().email(),
	username: z.string().min(3),
	password: z.string().min(6),
});

export class UserModel {
	static async create({ email, username, password }: { email: string, username: string, password: string }) {
		try {
			//NOTE: Validate the body
			const validation = loginSchema.safeParse({ email, username, password })

			if (!validation.success) {
				console.log(validation.error.message.toString())
				throw new Error("Fields validation error")
			}

			//NOTE: Hash the password
			const hash_password = await bcrypt.hash(validation.data.password, 10)

			//NOTE: Save the user in the db
			const [savedUser] = await db.insert(userTable).values({
				email: validation.data.email,
				username: validation.data.username,
				password_hash: hash_password
			}).returning()

			if (!savedUser) {
				throw new Error('Failed to create user')
			}

			//NOTE: Crear jwt acccesToken

			//NOTE: Destructure the public user data to return it
			const publicUser: PublicUser = {
				id: savedUser.id,
				email: savedUser.email,
				username: savedUser.username
			}

			return publicUser
		} catch (error) {
			if (error instanceof PostgresError && error.code === '23505') {
				throw new Error('User already exists')
			}

			if (error instanceof PostgresError) {
				throw new Error(`Postgres error ${error.message}`)
			}

			throw new Error('Unexpected error')
		}
	}

}

