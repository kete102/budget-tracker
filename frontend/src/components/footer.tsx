import Github from '@/components/icons/github-icon'
import { Link } from 'react-router'

function Footer() {
	return (
		<footer className="sticky mx-auto flex w-full items-center justify-between rounded-md bg-neutral-100/5 p-4 text-center">
			<p className="text-lg font-medium text-neutral-200">
				Budget Tracker &copy;
			</p>
			<h3 className="text-md font-medium text-neutral-200">
				Made by {''}
				<Link
					viewTransition
					to="https://github.com/kete102"
					className="inline-flex items-center gap-x-2 underline underline-offset-2"
				>
					Flavius Catalin <Github className="size-5" />
				</Link>
			</h3>
		</footer>
	)
}

export default Footer
