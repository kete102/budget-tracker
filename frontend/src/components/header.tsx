import { useAuthService } from "@/hooks/use-auth-service"
import { useAuth } from "@/hooks/useAuth"
import { CircleDollarSign } from "lucide-react"
import { Link } from "react-router"

function Header() {
  const { token } = useAuth()
  const { signOutUser } = useAuthService()

  return (
    <header className="container mx-auto text-neutral-300">
      <div className="flex items-center justify-between">
        <h1 className="inline-flex items-center gap-x-1 text-4xl tracking-tight font-bold">
          <CircleDollarSign className="size-7" stroke="currentColor" />
          Budget Trucker
        </h1>
        {token
          ? (
            <button onClick={() => signOutUser()} className="px-4 py-2 cursor-pointer bg-neutral-100 text-neutral-900 active:scale-95 hover:scale-105 transition-transform  rounded-lg font-medium text-md">Log out</button>
          )
          : (
            <Link to='/sign-in'>
              <button className="px-4 py-2 cursor-pointer bg-neutral-100 text-neutral-900 active:scale-95 hover:scale-105 transition-transform  rounded-lg font-medium text-md">Log in</button>
            </Link>
          )
        }
      </div>
    </header >
  )
}

export default Header
