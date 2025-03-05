import { useSidebar } from '@/hooks/use-sidebar'
import { ThemeProvider } from '@/providers/theme-provider'
import { Menu } from 'lucide-react'
import { ReactNode } from 'react'
import Footer from '../footer'
import HeaderTitle from '../header-title'
import { ModeToggle } from '../mode-toogle'
import Sidebar from '../sidebar'

const RootLayout = ({ children }: { children: ReactNode }) => {
	const { toggleSidebar, isSidebarOpen } = useSidebar()

	return (
		<ThemeProvider defaultTheme="dark">
			<div className="flex h-screen w-full transition-colors duration-700">
				<Sidebar
					isOpen={isSidebarOpen}
					toggleSidebar={toggleSidebar}
				/>
				<div className="flex h-full w-full flex-col items-center p-2 dark:bg-neutral-950">
					<div className="flex w-full items-center justify-between p-2">
						<button
							onClick={() => toggleSidebar()}
							className="cursor-pointer rounded-md border p-1"
						>
							<Menu />
						</button>
						<HeaderTitle />
						<ModeToggle />
					</div>
					<main className="my-2 h-full w-full">{children}</main>
					<Footer />
				</div>
			</div>
		</ThemeProvider>
	)
}

export default RootLayout
