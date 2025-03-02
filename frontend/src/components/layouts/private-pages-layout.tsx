import Header from '../header'
import Footer from '../footer'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

const PrivatePagesLayout = () => {
	const { token } = useAuth()
	if (!token) return <Navigate to='/sign-in' replace />

	return (
		<div className='h-full bg-neutral-950 flex flex-col w-full p-4'>
			<Header />
			<main className='container mx-auto grow'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default PrivatePagesLayout
