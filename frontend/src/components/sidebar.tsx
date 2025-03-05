import { useAuth } from '@/hooks/useAuth'
import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router'
import SidebarContent from './sidebar-content'
import SidebarTitle from './sidebar-title'

interface Props {
	isOpen: boolean
	toggleSidebar: () => void
}
function Sidebar({ isOpen, toggleSidebar }: Props) {
	const { token } = useAuth()
	return (
		<AnimatePresence>
			{token ? (
				isOpen && (
					<motion.nav
						layout
						className={`absolute top-0 z-100 h-screen shrink-0 overflow-hidden border-r border-neutral-400 bg-neutral-300 p-2 dark:border-neutral-800 dark:bg-neutral-900 ${isOpen ? 'w-full' : ''}`}
						initial={{ opacity: 0, x: '-100%' }} // Aparece deslizándose
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '-100%' }} // Se oculta deslizándose
						transition={{ duration: 0.5 }}
					>
						<SidebarTitle
							isOpen={isOpen}
							toggleSidebar={toggleSidebar}
						/>
						<SidebarContent toggleSidebar={toggleSidebar} />
					</motion.nav>
				)
			) : (
				<Link
					to="/sign-in"
					className="dark:ext-neutral-900 inline-flex items-center gap-x-2 rounded-md bg-neutral-900 px-4 py-2 text-center text-lg font-semibold text-neutral-100 dark:bg-neutral-100"
				>
					Sign in
					<ArrowRight />
				</Link>
			)}
		</AnimatePresence>
	)
}

export default Sidebar
