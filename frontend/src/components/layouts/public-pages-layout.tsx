import { Navigate, Outlet } from 'react-router'
import Footer from '../footer'
import { useAuth } from '@/hooks/useAuth'
import HeaderTitle from '../header-title'

const PublicPagesLayout = () => {
	const { token } = useAuth()

	if (token) return <Navigate to='/dashboard' replace />

	return (
		<div className='h-full bg-neutral-950 flex flex-col items-center w-full p-4'>
			<HeaderTitle styles='mt-10' />
			<main className='h-full w-full my-2 mx-auto grow'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default PublicPagesLayout
