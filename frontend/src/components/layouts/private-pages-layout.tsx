import { useAuth } from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router'
import Footer from '../footer'
import Header from '../header'

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
		<div className="flex h-full w-full flex-col bg-neutral-950 p-4">
			<Header />
			<main className="container mx-auto grow">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default PrivatePagesLayout
