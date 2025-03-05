import HeaderTitle from '@/components/header-title'
import { Link } from 'react-router'

function NotFound() {
	return (
		<div className="flex h-full w-full flex-col p-2 text-center">
			<section className="flex grow flex-col items-center justify-center text-center">
				<HeaderTitle />
				<h1 className="mt-4 text-xl text-neutral-400">
					Oops, something wrong ocurred
				</h1>
				<p className="mb-4 text-2xl font-bold text-neutral-400">
					404 - Not found
				</p>
				<Link
					to="/"
					className="rounded-md bg-neutral-100 px-4 py-2 text-center text-lg font-semibold text-neutral-900"
				>
					Return to homepage
				</Link>
			</section>
		</div>
	)
}

export default NotFound
