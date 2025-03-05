import { useUserResume } from '@/hooks/use-user-service'

function DashboardPage() {
	const { data, isFetching } = useUserResume()

	if (!data) {
		return <div className="text-neutral-100">No username</div>
	}

	if (isFetching) {
		return <div className="text-neutral-100">Loading...</div>
	}

	return (
		<div className="flex h-full w-full flex-col p-2">
			<h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
				Hi! {data.userResume.username} 👋
			</h1>
			<section></section>
		</div>
	)
}

export default DashboardPage
