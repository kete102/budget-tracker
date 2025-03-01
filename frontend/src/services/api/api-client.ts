import { processEnv } from '@/config'
import axios from 'axios'

const BASE_URL =
	processEnv.MODE === 'development'
		? 'http://localhost:4000/api'
		: 'https://your-production-api.com/api'

const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

export default apiClient
