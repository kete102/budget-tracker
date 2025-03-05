import { motion } from 'motion/react'
import SidebarContent from './sidebar-content'
import SidebarTitle from './sidebar-title'

interface Props {
	isOpen: boolean
	toggleSidebar: () => void
}

function Sidebar({ isOpen, toggleSidebar }: Props) {
	if (!isOpen) return null
	return (
		<motion.nav
			layout
			className={`absolute top-0 z-100 h-screen shrink-0 overflow-hidden border-r border-neutral-400 bg-neutral-300 p-2 dark:border-neutral-800 dark:bg-neutral-900 ${isOpen ? 'w-full' : ''}`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<SidebarTitle
				isOpen={isOpen}
				toggleSidebar={toggleSidebar}
			/>
			<SidebarContent toggleSidebar={toggleSidebar} />
		</motion.nav>
	)
}

export default Sidebar
