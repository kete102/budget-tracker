import { LoginUser, RegisterUser } from '@/services/auth/types'
import { useNavigate } from 'react-router'
import { useAuth } from './useAuth'
import { registerUser, loginUser } from '@/services/auth/auth-service'
import toast from 'react-hot-toast'

export function useAuthService() {
	const navigate = useNavigate()
	const { login } = useAuth()

	const signUpUser = async (userData: RegisterUser) => {
		try {
			const result = await registerUser(userData)

			if (!result.success) {
				toast.error(result.error)
			} else {
				login(result.data)
				navigate({ pathname: '/dashboard' })
			}
		} catch (error) {
			console.error(error)
		}
	}

	const signInUser = async (userData: LoginUser) => {
		try {
			const result = await loginUser(userData)

			if (!result.success) {
				toast.error(result.error)
			} else {
				login(result.data)
				navigate({ pathname: '/dashboard' })
			}
		} catch (error) {
			console.error(error)
		}
	}
	return {
		signUpUser,
		signInUser
	}
}
