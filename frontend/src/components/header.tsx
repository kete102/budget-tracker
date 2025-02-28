import { CircleDollarSign } from "lucide-react"

function Header() {

  return (
    <header className="container mx-auto">
      <h1 className="text-neutral-300 inline-flex items-center gap-x-1 text-4xl tracking-tight font-bold">
        <CircleDollarSign className="size-7" stroke="currentColor" />
        Budget Trucker
      </h1>
    </header >
  )
}

export default Header
