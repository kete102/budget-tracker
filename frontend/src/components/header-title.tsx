import { CircleDollarSign } from "lucide-react";
import { Link } from "react-router";

interface Props {
  styles?: string
}
function HeaderTitle({ styles }: Props) {
  return (
    <Link to='/' viewTransition className={`inline-flex text-neutral-50 items-center text-center gap-x-1 text-5xl md:text-6xl tracking-tight font-bold ${styles}`}>
      <CircleDollarSign className="size-7" stroke="currentColor" />
      Budget Tracker
    </Link>
  )
}

export default HeaderTitle
