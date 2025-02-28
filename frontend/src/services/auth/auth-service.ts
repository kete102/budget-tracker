import axios from 'axios'
import { RegisterUser } from './types'
import apiClient from '../api/api-client'

interface SuccessResult {
	success: true
	data: string
}

interface ErrorResult {
	success: false
	error: string
}

type RegisterResult = SuccessResult | ErrorResult

export async function register(
	userData: RegisterUser
): Promise<RegisterResult> {
	try {
		console.log('register user')
		const response = await apiClient.post('/auth/register', userData)
		console.log({ response })

		const accessToken = response.data.accessToken
		return {
			success: true,
			data: accessToken,
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Manejo específico de errores de Axios
			return {
				success: false,
				error: 'Registration failed',
			}
		}
		return {
			success: false,
			error: 'Unexpected error occurred',
		}
	}
}
