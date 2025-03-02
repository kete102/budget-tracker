import HeaderTitle from "@/components/header-title"
import { MoveRight } from "lucide-react"
import { Link } from "react-router"

function HomePage() {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-gradient-to-br from-neutral-950 to-neutral-900">
      <HeaderTitle styles='text-3xl md:text-5xl lg:text-8xl' />
      <section className="w-full max-w-3xl text-center space-y-6 mt-4">
        <h2 className="text-neutral-100 text-md md:text-lg lg:text-xl">Track your finances effortlessly. Gain control over your spending.</h2>
        <div className="flex items-center w-full justify-center gap-x-6">
          <Link to='/dashboard' viewTransition>
            <button className="px-4 py-2 inline-flex items-center gap-x-2 cursor-pointer bg-neutral-100 text-neutral-900 active:scale-95 hover:scale-105 transition-transform rounded-lg font-semibold text-md md:text-lg lg:text-xl">Get started <MoveRight /></button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage

