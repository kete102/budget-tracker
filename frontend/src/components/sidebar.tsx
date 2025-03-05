import { AnimatePresence, motion } from 'motion/react'
import SidebarContent from './sidebar-content'

interface Props {
	isOpen: boolean
	toggleSidebar: () => void
}
function Sidebar({ isOpen, toggleSidebar }: Props) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.nav
					layout
					className={`border-r-accent bg-background absolute top-0 z-100 h-screen shrink-0 overflow-hidden border-r p-2 ${isOpen ? 'w-full lg:w-64' : ''}`}
					initial={{ opacity: 0, x: '-100%' }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: '-100%' }}
					transition={{ duration: 0.5 }}
				>
					<SidebarContent
						toggleSidebar={toggleSidebar}
						isOpen={isOpen}
					/>
				</motion.nav>
			)}
		</AnimatePresence>
	)
}

export default Sidebar
