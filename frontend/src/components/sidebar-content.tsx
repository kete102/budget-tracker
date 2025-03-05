import { routes } from '@/consts/routes'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import SidevarLink from './sidebar-link'

function SidebarContent({ toggleSidebar }: { toggleSidebar: () => void }) {
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
				<button className="inline-flex items-center gap-x-2 rounded-lg bg-neutral-100 px-4 py-2 text-lg font-semibold text-neutral-900">
					Log out <ArrowRight />
				</button>
			</div>
		</motion.div>
	)
}

export default SidebarContent
