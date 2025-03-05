import { useAuth } from '@/hooks/useAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Outlet } from 'react-router'

const queryClient = new QueryClient()

const PrivatePagesLayout = () => {
	const { token } = useAuth()
	if (!token)
		return (
			<Navigate
				to="/sign-in"
				replace
			/>
		)

	return (
		<QueryClientProvider client={queryClient}>
			<div className="flex h-full w-full flex-col p-2">
				<main className="container mx-auto h-full grow">
					<Outlet />
				</main>
			</div>
		</QueryClientProvider>
	)
}

export default PrivatePagesLayout
