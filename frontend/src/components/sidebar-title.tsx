import { X } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from './ui/button'

interface Props {
	isOpen: boolean
	toggleSidebar: () => void
}

function SidebarHeader({ isOpen, toggleSidebar }: Props) {
	return (
		<motion.div
			layout
			className=""
		>
			{isOpen && (
				<div className="flex-start flex w-full p-2">
					<Button
						variant="outline"
						size="icon"
						onClick={toggleSidebar}
					>
						<X />
					</Button>
				</div>
			)}
		</motion.div>
	)
}

export default SidebarHeader
