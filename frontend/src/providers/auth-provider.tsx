import { AuthContext } from '@/contexts/auth'
import apiClient from '@/services/api/api-client'
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null)

	const login = (newToken: string) => {
		setToken(newToken)
	}

	const logout = () => {
		setToken(null)
	}

	useEffect(() => {
		const fetchMe = async () => {
			try {
				const response = await apiClient.get('/auth/check-auth')
				setToken(response.data.accessToken)
			} catch {
				setToken(null)
			}
		}

		fetchMe()
	}, [])

	useLayoutEffect(() => {
		const authInterceptor = apiClient.interceptors.request.use((config) => {
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		})

		return () => {
			apiClient.interceptors.request.eject(authInterceptor)
		}
	}, [token])

	useLayoutEffect(() => {
		const refreshInterceptor = apiClient.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config

				if (
					error.response.status === 403 &&
					error.response.data.message === 'Unauthorized'
				) {
					if (originalRequest._retry) return Promise.reject(error)
					originalRequest._retry = true

					try {
						const response = await apiClient.get("/auth/refresh")

						setToken(response.data.accessToken)

						originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`

						return apiClient(originalRequest)
					} catch (refreshError) {
						setToken(null)
						return Promise.reject(refreshError)
					}
				}
				return Promise.reject(error)
			}
		)
		return () => {
			apiClient.interceptors.response.eject(refreshInterceptor)
		}
	},)

	return (
		<AuthContext.Provider value={{ token, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
