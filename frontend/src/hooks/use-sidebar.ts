import { useState } from 'react'

export function useSidebar() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const toggleSidebar = () => {
		setIsSidebarOpen((prev: boolean) => !prev)
	}

	return {
		isSidebarOpen,
		toggleSidebar,
	}
}
