import Header from '../header'
import Footer from '../footer'
import { Outlet } from 'react-router'

const PrivatePagesLayout = () => {

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
