import { useAuth } from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router'
import Footer from '../footer'
import HeaderTitle from '../header-title'

const PublicPagesLayout = () => {
	const { token } = useAuth()

	if (token)
		return (
			<Navigate
				to="/dashboard"
				replace
			/>
		)

	return (
		<div className="flex h-full w-full flex-col items-center bg-neutral-950 p-4">
			<HeaderTitle styles="mt-10" />
			<main className="mx-auto my-2 h-full w-full grow">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default PublicPagesLayout
