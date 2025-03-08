import { getUserTransactions } from '@/services/transactions/transactions-service'
import { useQuery } from '@tanstack/react-query'

export function useUserTransactions() {
	return useQuery({
		queryKey: ['user-transactions'],
		queryFn: getUserTransactions,
	})
}
