import { RegisterUser } from '@/services/auth/types'
import { useNavigate } from 'react-router'
import { useAuth } from './useAuth'
import { register } from '@/services/auth/auth-service'
import toast from 'react-hot-toast'

export function useAuthService() {
	const navigate = useNavigate()
	const { login } = useAuth()

	const registerUser = async (userData: RegisterUser) => {
		try {
			const result = await register(userData)

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
		registerUser,
	}
}
