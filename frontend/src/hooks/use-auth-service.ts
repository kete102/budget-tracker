import {
	loginUser,
	logoutUser,
	registerUser,
} from '@/services/auth/auth-service'
import { LoginUser, RegisterUser } from '@/services/auth/types'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useAuth } from './useAuth'

export function useAuthService() {
	const navigate = useNavigate()
	const { login, logout } = useAuth()

	const signUpUser = async (userData: RegisterUser) => {
		try {
			const result = await registerUser(userData)

			if (!result.success) {
				toast.error(result.error)
			} else {
				login(result.data)
				navigate('/dashboard', { replace: true })
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

	const signOutUser = async () => {
		try {
			const result = await logoutUser()
			if (!result.success) {
				toast.error(result.message)
			} else {
				logout()
				navigate('/', { replace: true })
			}
		} catch (error) {
			console.error(error)
		}
	}
	return {
		signUpUser,
		signInUser,
		signOutUser,
	}
}
