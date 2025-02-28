import { processEnv } from '@/config'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import { useNavigate } from 'react-router'

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

//NOTE: Add accesToken to every request
apiClient.interceptors.request.use(
	(config) => {
		const accessToken = useAuth()
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`
		}
		return config
	},
	(error) => {
		toast.error('An error ocurred. Please try again later')
		return Promise.reject(error)
	}
)

//NOTE: Refresh accesToken
apiClient.interceptors.response.use(
	(response) => {
		return response
	},
	async (error) => {
		//NOTE: is the error === 401 means the accessToken is expired
		if (error.reponse && error.response.status === 401) {
			try {
				//NOTE: refres accesToken try
				const response = await apiClient.post('/auth/refresh')

				if (response.status === 200) {
					const newAccessToken = response.data.accessToken

					const { login } = useAuth()
					login(newAccessToken)

					//NOTE: Retry the original request with the newAccessToken
					error.config.headers['Authorization'] =
						`Bearer ${newAccessToken}`

					//NOTE: Retry the original request
					return axios(error.config)
				}
			} catch (refreshError) {
				//NOTE: If can't refresh accessToken, redirecto no /sign-in
				if (refreshError) {
					toast.error('Error refresing token. Please try again later')
				}

				toast.error('An error ocurred. Please try again later')

				const navigate = useNavigate()
				navigate('/sign-in', { replace: true })
			}
		} else {
			toast.error('An error ocurred. Please try again later')
		}

		return Promise.reject(error)
	}
)

export default apiClient
