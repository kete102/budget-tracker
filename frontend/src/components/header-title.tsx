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
			className={`inline-flex items-center gap-x-1 text-center text-3xl font-bold tracking-tight md:text-6xl dark:text-neutral-50 ${styles}`}
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
