import { AxiosError } from 'axios'
import apiClient from '../api/api-client'

export async function getUserData() {
	try {
		const response = await apiClient.get('/user/overview')

		return {
			success: true,
			data: response.data,
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
