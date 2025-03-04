import { useAuth } from '@/hooks/useAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Outlet } from 'react-router'
import Footer from '../footer'
import Header from '../header'

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
			<div className="flex h-full w-full flex-col bg-neutral-950 p-4">
				<Header />
				<main className="container mx-auto grow">
					<Outlet />
				</main>
				<Footer />
			</div>
		</QueryClientProvider>
	)
}

export default PrivatePagesLayout
