import { Link, useLocation } from 'react-router'

function SidevarLink({
	path,
	name,
	toggleSidebar,
}: {
	path: string
	name: string
	toggleSidebar: () => void
}) {
	const location = useLocation()
	return (
		<Link
			to={`${path}`}
			viewTransition
			onClick={toggleSidebar}
			className={`text-4xl font-semibold transition-all hover:scale-110 active:scale-95 ${location.pathname === path ? 'text-amber-500' : 'text-neutral-400'}`}
		>
			{name}
		</Link>
	)
}

export default SidevarLink
