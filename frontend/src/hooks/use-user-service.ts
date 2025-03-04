import { getUserData } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'

export const useUserResume = () =>
	useQuery({
		queryKey: ['user-resume'],
		queryFn: getUserData,
	})
