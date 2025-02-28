import { User } from "@/services/auth/types"
import { createContext } from "react"

interface AuthContextProps {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)
