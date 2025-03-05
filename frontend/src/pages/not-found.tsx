import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

function NotFound() {
	return (
		<div className="flex h-full w-full flex-col p-2 text-center">
			<section className="flex grow flex-col items-center justify-center text-center">
				<h1 className="mt-4 text-2xl font-medium text-neutral-900">
					Oops, something wrong ocurred
				</h1>
				<p className="mb-4 text-2xl font-bold text-neutral-500">
					404 - Not found
				</p>
				<Link
					to="/"
					className="dark:ext-neutral-900 inline-flex items-center gap-x-2 rounded-md bg-neutral-900 px-4 py-2 text-center text-lg font-semibold text-neutral-100 dark:bg-neutral-100"
				>
					Return to homepage
					<ArrowRight />
				</Link>
			</section>
		</div>
	)
}

export default NotFound
