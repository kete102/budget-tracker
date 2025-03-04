import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
	return <div className="h-screen w-full">{children}</div>
}

export default RootLayout
