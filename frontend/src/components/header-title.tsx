import { CircleDollarSign } from "lucide-react";

interface Props {
  styles?: string
}
function HeaderTitle({ styles }: Props) {
  return (
    <h1 className={`inline-flex text-neutral-50 items-center gap-x-1 text-4xl tracking-tight font-bold ${styles}`}>
      <CircleDollarSign className="size-7" stroke="currentColor" />
      Budget Tracker
    </h1>
  )
}

export default HeaderTitle
