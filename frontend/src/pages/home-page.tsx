import HeaderTitle from '@/components/header-title'
import { MoveRight } from 'lucide-react'
import { Link } from 'react-router'

function HomePage() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-950 to-neutral-900 p-4">
			<HeaderTitle styles="text-3xl md:text-5xl lg:text-8xl" />
			<section className="mt-4 w-full max-w-3xl space-y-6 text-center">
				<h2 className="text-md text-neutral-100 md:text-lg lg:text-xl">
					Track your finances effortlessly. Gain control over your spending.
				</h2>
				<div className="flex w-full items-center justify-center gap-x-6">
					<Link
						to="/dashboard"
						viewTransition
					>
						<button className="text-md inline-flex cursor-pointer items-center gap-x-2 rounded-lg bg-neutral-100 px-4 py-2 font-semibold text-neutral-900 transition-transform hover:scale-105 active:scale-95 md:text-lg lg:text-xl">
							Get started <MoveRight />
						</button>
					</Link>
				</div>
			</section>
		</div>
	)
}

export default HomePage
