import { Navigate, Outlet } from 'react-router'
import Header from '../header'
import Footer from '../footer'
import { useAuth } from '@/hooks/useAuth'

const PublicPagesLayout = () => {
	const { token } = useAuth()

	if (token) return <Navigate to='/dashboard' replace />

	return (
		<div className='h-full flex flex-col w-full p-4'>
			<Header />
			<main className='h-full w-full my-2 mx-auto grow'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default PublicPagesLayout
