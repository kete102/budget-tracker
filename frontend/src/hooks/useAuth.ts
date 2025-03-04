import { AuthContext } from '@/contexts/auth'
import { useContext } from 'react'

export class AuthContextError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'AuthContextError'
	}
}

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (!context) {
		throw new AuthContextError(
			'useAuth must used within a AuthContext Provider'
		)
	}

	return context
}
