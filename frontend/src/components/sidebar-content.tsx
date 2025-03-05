import { routes } from '@/consts/routes'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import SidevarLink from './sidebar-link'

interface Props {
	toggleSidebar: () => void
}

function SidebarContent({ toggleSidebar }: Props) {
	return (
		<motion.div
			layout
			className="flex h-full w-full flex-col items-center justify-around select-none"
		>
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
			<div className="mt-4">
				<button className="inline-flex cursor-pointer items-center gap-x-2 rounded-lg bg-neutral-900 px-4 py-2 text-lg font-semibold text-neutral-100 transition-all hover:scale-105 dark:bg-neutral-100 dark:text-neutral-900">
					Log out <ArrowRight />
				</button>
			</div>
		</motion.div>
	)
}

export default SidebarContent
