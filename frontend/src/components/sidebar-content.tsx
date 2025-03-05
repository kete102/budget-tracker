import { routes } from '@/consts/routes'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import Github from './icons/github-icon'
import SidevarLink from './sidebar-link'
import SidebarHeader from './sidebar-title'
import { Button } from './ui/button'

interface Props {
	isOpen: boolean
	toggleSidebar: () => void
}

function SidebarContent({ toggleSidebar, isOpen }: Props) {
	return (
		<motion.div
			layout
			className="flex h-full w-full flex-col justify-between select-none"
		>
			<SidebarHeader
				isOpen={isOpen}
				toggleSidebar={toggleSidebar}
			/>
			<section className="flex flex-col items-center gap-y-8">
				<div className="flex flex-col items-center space-y-5">
					{routes.map((route) => (
						<SidevarLink
							key={route.path}
							path={route.path}
							name={route.name}
							toggleSidebar={toggleSidebar}
						/>
					))}
				</div>
				<div>
					<Button
						variant="secondary"
						size="lg"
					>
						Log out <ArrowRight />
					</Button>
				</div>
			</section>
			<section className="flex w-full items-center justify-between p-2">
				<p className="text-muted-foreground text-center font-semibold">
					&copy;Budget Tracker
				</p>
				<h3 className="text-muted-foreground text-sm font-medium">
					Made by {''}
					<Link
						viewTransition
						to="https://github.com/kete102"
						className="inline-flex items-center gap-x-2 underline underline-offset-2"
					>
						Flavius Catalin <Github className="size-5" />
					</Link>
				</h3>
			</section>
		</motion.div>
	)
}

export default SidebarContent
