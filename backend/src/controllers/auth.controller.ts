import { Request, Response } from 'express'
import { generateAccessToken, generateRefreshToken } from '../lib/generateJWT'
import { loginSchema, registerSchema, UserModel } from '../models/user.model'
import { processEnv } from '../config'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { User } from '../db/schemas/user.schema'

export async function registerUser(req: Request, res: Response) {
	const { email, username, password } = req.body
	//NOTE: Validate the body
	const validation = registerSchema.safeParse({
		email,
		username,
		password,
	})

	if (!validation.success) {
		console.log(validation.error.message.toString())
		return res.status(400).json({ message: 'Fields validation error' })
	}

	console.log('Create user')
	const user = await UserModel.create({ email, username, password })
	console.log('User created: ', user)

	//NOTE: Crear jwt acccesToken
	const accessToken = generateAccessToken({
		id: user.id,
		email: user.email,
		username: user.username,
	})

	const refreshToken = generateRefreshToken({ id: user.id })

	res.cookie('refresh_token', refreshToken, {
		httpOnly: true,
		secure: processEnv.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	})

	return res.status(200).json({ accessToken })
}
export async function refreshToken(req: Request, res: Response) {
	const refreshToken = req.cookies.refresh_token
	if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' })

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err: VerifyErrors, user: User) => {
			if (err) return res.status(403).json({ message: 'Invalid token' })

			const newAccessToken = generateAccessToken({
				id: user.id,
				email: user.email,
				username: user.username,
			})

			const newRefreshToken = generateRefreshToken({ id: user.id })

			res.cookie('refresh_token', newRefreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 7 * 24 * 60 * 60 * 1000,
			})

			return res.status(200).json({ newAccessToken })
		}
	)
}
export async function loginUser(req: Request, res: Response) {
	const { email, password } = req.body
	//NOTE: Validate the body
	const validation = loginSchema.safeParse({
		email,
		password,
	})

	if (!validation.success) {
		console.log(validation.error.message.toString())
		return res.status(400).json({ message: 'Fields validation error' })
	}

	const user = await UserModel.login({ email, password })

	//NOTE: Crear jwt acccesToken
	const accessToken = generateAccessToken({
		id: user.id,
		email: user.email,
		username: user.username,
	})

	const refreshToken = generateRefreshToken({ id: user.id })

	res.cookie('refresh_token', refreshToken, {
		httpOnly: true,
		secure: processEnv.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	})

	return res.status(200).json({ accessToken })
}
