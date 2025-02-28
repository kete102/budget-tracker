import { createContext } from 'react'

interface AuthContextProps {
	token: string | null
	login: (newToken: string) => void
	logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined
)
