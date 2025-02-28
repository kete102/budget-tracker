import Header from '../header'
import Footer from '../footer'
import { Outlet, useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

const PrivatePagesLayout = () => {
	const { token } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!token) {
			navigate('/sign-in', { replace: true })
		}
	}, [navigate, token])

	return (
		<div className='h-full flex flex-col w-full p-4'>
			<Header />
			<main className='container mx-auto grow'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default PrivatePagesLayout
