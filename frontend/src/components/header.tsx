import { useAuthService } from "@/hooks/use-auth-service"
import { useAuth } from "@/hooks/useAuth"
import HeaderTitle from "./header-title"


function Header() {
  const { token } = useAuth()
  const { signOutUser } = useAuthService()

  return (
    <header className="container mx-auto text-neutral-300">
      <div className="flex items-center justify-between">
        <HeaderTitle />
        {token &&
          (
            <button onClick={() => signOutUser()} className="px-4 py-2 cursor-pointer bg-neutral-100 text-neutral-900 active:scale-95 hover:scale-105 transition-transform  rounded-lg font-medium text-md">Log out</button>
          )
        }
      </div>
    </header >
  )
}

export default Header
