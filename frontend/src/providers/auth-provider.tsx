import { AuthContext } from "@/contexts/auth"
import { User } from "@/services/auth/types"
import { ReactNode, useState } from "react"

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (user: User) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </ AuthContext.Provider>
  )
}

export default AuthProvider
