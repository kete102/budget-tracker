import { CircleDollarSign, X } from 'lucide-react'
import { motion } from 'motion/react'

interface Props {
	isOpen: boolean
	toggleSidebar: () => void
}

function SidebarTitle({ isOpen, toggleSidebar }: Props) {
	return (
		<motion.div
			layout
			className="border-b border-neutral-800 p-2 pb-3"
		>
			{isOpen && (
				<div className="flex w-full items-center justify-between">
					<button
						onClick={toggleSidebar}
						className="cursor-pointer rounded-md border p-1 dark:border-neutral-800"
					>
						<X />
					</button>
					<h1 className="inline-flex items-center gap-x-1 text-center text-3xl font-bold tracking-tight select-none md:text-6xl dark:text-neutral-50">
						<CircleDollarSign
							className="size-7"
							stroke="currentColor"
						/>
						Budget Tracker
					</h1>
				</div>
			)}
		</motion.div>
	)
}

export default SidebarTitle
