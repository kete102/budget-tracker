import toast from 'react-hot-toast'
import apiClient from '../api/api-client'

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getUserTransactions() {
	try {
		const response = await apiClient.get('/transactions')

		// Si el servidor responde con un error (404 o 500), se lanza una excepción
		if (response.status === 400 || response.status === 500) {
			toast.error(response.statusText)
		}

		return response.data
	} catch (error: any) {
		// Captura el error y maneja diferentes tipos
		if (error.message.includes('404')) {
			// Manejo de error 404: No hay transacciones
			console.log('No transactions found')
			// Puedes mostrar un mensaje en la UI, como:
			// alert("No transactions available.");
		} else {
			// Manejo de otros errores (conexión fallida, error del servidor, etc.)
			console.error('Error fetching transactions:', error)
			// Mostrar mensaje genérico de error en UI
			// alert("Something went wrong. Please try again later.");
		}
	}
}
