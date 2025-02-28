import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
	return <div className='h-screen bg-neutral-950 p-4'>{children}</div>
}

export default RootLayout
