import { register } from "@/services/auth/auth-service"
import { RegisterUser } from "@/services/auth/types"
import { useNavigate } from "react-router"
import { useAuth } from "./useAuth"

export function useAuthService() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const registerUser = async (userData: RegisterUser) => {
    try {
      const user = await register(userData)

      //NOTE: Setear el usuario en el contexto global
      //FIX: user esta llegando como undefined
      login(user)
      navigate({ pathname: '/dashboard' })

    } catch (error) {
      console.error(error)
    }
  }


  return {
    registerUser
  }
}
