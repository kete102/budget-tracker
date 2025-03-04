import axios, { AxiosError } from 'axios'
import apiClient from '../api/api-client'
import { LoginUser, RegisterResult, RegisterUser } from './types'

export async function registerUser(
	userData: RegisterUser
): Promise<RegisterResult> {
	try {
		const response = await apiClient.post('/user/register', userData)

		const accessToken = response.data.accessToken
		return {
			success: true,
			data: accessToken,
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
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

export async function loginUser(userData: LoginUser): Promise<RegisterResult> {
	try {
		const response = await apiClient.post('/user/login', userData)

		const accessToken = response.data.accessToken

		return {
			success: true,
			data: accessToken,
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			return {
				success: false,
				error: 'Login failed',
			}
		}
		return {
			success: false,
			error: 'Unexpected error occurred',
		}
	}
}

export async function logoutUser() {
	try {
		await apiClient.post('/user/logout')
		return {
			success: true,
			message: 'Logged out',
		}
	} catch (error) {
		console.error('Logout failed', error)
		return {
			success: false,
			message: 'Error loggin out',
		}
	}
}
