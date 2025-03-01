import { z } from "zod";

export const signUpSchema = z.object({
	email: z.string().email({ message: 'Please, enter a valid email address' }),
	username: z.string().min(3, 'Username must be at least 3 characters long'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type RegisterUser = z.infer<typeof signUpSchema>
export type LoginUser = Omit<z.infer<typeof signUpSchema>, 'username'>;

export type APIUser = {
	id: string;
	email: string;
	username: string
}
export type User = Omit<APIUser, 'id'>
