import { Link, useLocation } from 'react-router'

interface Props {
	path: string
	name: string
	toggleSidebar: () => void
}
function SidevarLink({ path, name, toggleSidebar }: Props) {
	const location = useLocation()

	return (
		<Link
			to={path}
			viewTransition
			onClick={toggleSidebar}
			className={`text-4xl font-semibold transition-all hover:scale-110 active:scale-95 ${location.pathname === path ? 'text-amber-600 dark:text-amber-500' : 'text-neutral-500 dark:text-neutral-400'}`}
		>
			{name}
		</Link>
	)
}

export default SidevarLink
