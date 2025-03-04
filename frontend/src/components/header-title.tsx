import { CircleDollarSign } from 'lucide-react'
import { Link } from 'react-router'

interface Props {
	styles?: string
}
function HeaderTitle({ styles }: Props) {
	return (
		<Link
			to="/"
			viewTransition
			className={`inline-flex items-center gap-x-1 text-center text-5xl font-bold tracking-tight text-neutral-50 md:text-6xl ${styles}`}
		>
			<CircleDollarSign
				className="size-7"
				stroke="currentColor"
			/>
			Budget Tracker
		</Link>
	)
}

export default HeaderTitle
