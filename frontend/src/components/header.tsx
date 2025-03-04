import { useAuthService } from '@/hooks/use-auth-service'
import { useAuth } from '@/hooks/useAuth'
import HeaderTitle from './header-title'

function Header() {
	const { token } = useAuth()
	const { signOutUser } = useAuthService()

	return (
		<header className="container mx-auto text-neutral-300">
			<div className="flex items-center justify-between">
				<HeaderTitle />
				{token && (
					<button
						onClick={() => signOutUser()}
						className="text-md cursor-pointer rounded-lg bg-neutral-100 px-4 py-2 font-medium text-neutral-900 transition-transform hover:scale-105 active:scale-95"
					>
						Log out
					</button>
				)}
			</div>
		</header>
	)
}

export default Header
