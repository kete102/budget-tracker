import { AxiosError } from 'axios'
import { type GetUserOverview } from '../../../../shared/user/types.ts'
import apiClient from '../api/api-client'

export async function getUserData(): Promise<GetUserOverview> {
	try {
		const response = await apiClient.get('/user/overview')

		if (!response.data) {
			throw new Error('Error fetching user data')
		}

		return response.data
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error('Login failed')
		}
		throw new Error('Unexpected error occurred')
	}
}

export async function updateUserCurrency(currency: string) {
	try {
		await apiClient.put('/user/update', { currency })
		return {
			success: true,
			message: 'Currency updated',
		}
	} catch (error) {
		console.error('Curreny update failed', error)
		return {
			success: false,
			message: 'Error updating user currency',
		}
	}
}
