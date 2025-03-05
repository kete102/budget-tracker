import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

export function ModeToggle() {
	const { setTheme, theme } = useTheme()

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleTheme}
		>
			<AnimatePresence mode="wait">
				{theme === 'dark' ? (
					<motion.div
						key="sun"
						initial={{ y: 20, opacity: 0, rotate: -90 }}
						animate={{ y: 0, opacity: 1, rotate: 0 }}
						exit={{ y: -20, opacity: 0, rotate: 90 }}
						transition={{ duration: 0.2 }}
						className="absolute"
					>
						<Sun className="h-[1.2rem] w-[1.2rem]" />
					</motion.div>
				) : (
					<motion.div
						key="moon"
						initial={{ y: -20, opacity: 0, rotate: 90 }}
						animate={{ y: 0, opacity: 1, rotate: 0 }}
						exit={{ y: 20, opacity: 0, rotate: -90 }}
						transition={{ duration: 0.2 }}
						className="absolute"
					>
						<Moon className="h-[1.2rem] w-[1.2rem]" />
					</motion.div>
				)}
			</AnimatePresence>
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
