import { getUserData } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'

export function useUserResume() {
	return useQuery({
		queryKey: ['user-resume'],
		queryFn: getUserData,
	})
}
