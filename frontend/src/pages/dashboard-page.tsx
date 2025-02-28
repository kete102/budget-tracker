import { useAuth } from "@/hooks/useAuth"

function DashboardPage() {
  const context = useAuth()
  console.log(context)

  return (
    <div className="h-full w-full flex flex-col justify-center p-2">
      <h1>Dashboard</h1>
      <p>Hello, {JSON.stringify(context.user)}</p>
    </div>
  )
}

export default DashboardPage
