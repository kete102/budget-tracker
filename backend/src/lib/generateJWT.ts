import jwt from 'jsonwebtoken'
import { processEnv } from '../config'

const JWT_ACCESS = processEnv.JWT_SECRET_ACCESS
const JWT_REFRESH = processEnv.JWT_SECRET_REFRESH

export const generateAccessToken = ({
	id,
	email,
	username,
}: {
	id: string
	email: string
	username: string
}) => {
	return jwt.sign({ id, email, username }, JWT_ACCESS, { expiresIn: '15m' })
}
export const generateRefreshToken = (
	{
		id,
		email,
		username,
	}: {
		id: string
		email: string
		username: string
	}) => {
	return jwt.sign({ id, email, username }, JWT_REFRESH, { expiresIn: '7d' })
}
