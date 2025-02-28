import { AuthContext } from '@/contexts/auth'
import { ReactNode, useState } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null)

	const login = (newToken: string) => {
		setToken(newToken)
	}

	const logout = () => {
		setToken(null)
	}

	return (
		<AuthContext.Provider value={{ token, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
