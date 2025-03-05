import { useSidebar } from '@/hooks/use-sidebar'
import { ThemeProvider } from '@/providers/theme-provider'
import { Menu } from 'lucide-react'
import { ReactNode } from 'react'
import HeaderTitle from '../header-title'
import { ModeToggle } from '../mode-toogle'
import Sidebar from '../sidebar'
import { Button } from '../ui/button'

const RootLayout = ({ children }: { children: ReactNode }) => {
	const { toggleSidebar, isSidebarOpen } = useSidebar()

	return (
		<ThemeProvider defaultTheme="dark">
			<div className="flex h-screen w-full transition-colors duration-700">
				<Sidebar
					isOpen={isSidebarOpen}
					toggleSidebar={toggleSidebar}
				/>
				<div className="bg-background flex h-full w-full flex-col items-center p-2">
					<div className="flex w-full items-center justify-between p-2">
						<Button
							variant="outline"
							size="icon"
							onClick={() => toggleSidebar()}
						>
							<Menu />
						</Button>
						<HeaderTitle />
						<ModeToggle />
					</div>
					<main className="my-2 h-full w-full">{children}</main>
				</div>
			</div>
		</ThemeProvider>
	)
}

export default RootLayout
