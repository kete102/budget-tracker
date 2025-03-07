import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import UserCurrency from '@/components/user-currency'
import { CURRENCIES } from '@/consts/currencies'
import { useUserResume } from '@/hooks/use-user-service'
import {
	Activity,
	ArrowRight,
	Ellipsis,
	PiggyBank,
	SquareArrowDownRight,
	SquareArrowUpRight,
	TrendingDown,
	TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router'

function DashboardPage() {
	const { data, isLoading } = useUserResume()

	if (!data) {
		return <div className="text-foreground">No username</div>
	}

	if (isLoading) {
		return (
			<div className="grid h-full w-full place-content-center">
				<Ellipsis className="size-10" />
			</div>
		)
	}

	const userCurrency = CURRENCIES.find(
		(currency) => currency.value === data.userResume.currency
	)

	return (
		<div className="flex h-full w-full flex-col gap-y-4 p-2">
			<section className="flex w-full items-center justify-between">
				<h1 className="text-foreground text-2xl font-bold">
					Hi! {data.userResume.username} 👋
				</h1>
				<UserCurrency />
			</section>

			<section className="my-4 grid grid-cols-4 grid-rows-10 gap-4">
				<Card className="bg-foreground text-accent col-span-2 rounded-lg">
					<CardHeader>
						<CardTitle className="flex flex-row items-center justify-center gap-x-2">
							<SquareArrowDownRight />
							New income
						</CardTitle>
					</CardHeader>
				</Card>

				<Card className="bg-background text-accent-foreground col-span-2 col-start-3 rounded-lg">
					<CardHeader>
						<CardTitle className="flex flex-row items-center justify-center gap-x-2">
							<SquareArrowUpRight />
							New expense
						</CardTitle>
					</CardHeader>
				</Card>

				<Card
					className={`col-span-2 row-span-2 row-start-2 border bg-neutral-900/10 dark:bg-white/5`}
				>
					<CardContent>
						<h2
							className={`text-foreground inline-flex items-center gap-x-2 text-2xl font-bold`}
						>
							{data.userResume.balance} {userCurrency?.symbol}
						</h2>
					</CardContent>
					<CardHeader>
						<CardTitle className="text-muted-foreground flex items-center gap-x-2">
							<PiggyBank />
							Total Balance
						</CardTitle>
					</CardHeader>
				</Card>

				<Card className="bg-background col-span-2 col-start-3 row-span-2 row-start-2"></Card>

				<Card className="bg-background col-span-2 row-span-2 row-start-4">
					<CardContent>
						<h2 className="inline-flex items-center gap-x-2 text-2xl font-bold text-green-600">
							+ {data.userResume.totalIncome} {userCurrency?.symbol}
						</h2>
					</CardContent>
					<CardHeader className="flex w-full flex-col items-start justify-between md:flex-row md:items-center">
						<CardTitle className="flex items-center gap-x-2">
							<TrendingUp />
							Total Incomes
						</CardTitle>
						<Button
							variant="link"
							asChild
							className="text-muted-foreground"
						>
							<Link
								viewTransition
								to="/transactions?filter=income"
							>
								See all <ArrowRight />{' '}
							</Link>
						</Button>
					</CardHeader>
				</Card>

				<Card className="bg-background col-span-2 col-start-3 row-span-2 row-start-4">
					<CardContent>
						<h2 className="inline-flex items-center gap-x-2 text-2xl font-bold text-red-600">
							- {data.userResume.totalExpenses} {userCurrency?.symbol}
						</h2>
					</CardContent>
					<CardHeader className="flex w-full flex-col items-start justify-between md:flex-row md:items-center">
						<CardTitle className="flex items-center gap-x-2">
							<TrendingDown /> Total Expenses
						</CardTitle>
						<Button
							variant="link"
							asChild
							className="text-muted-foreground"
						>
							<Link
								viewTransition
								to="/transactions?filter=expense"
							>
								See all <ArrowRight />{' '}
							</Link>
						</Button>
					</CardHeader>
				</Card>

				<Card className="bg-background col-span-4 row-span-full row-start-6">
					<CardHeader className="flex w-full flex-row items-center justify-between">
						<CardTitle className="flex items-center gap-x-2">
							<Activity /> Activity
						</CardTitle>
						<CardDescription>
							<Button
								variant="link"
								asChild
								className="text-muted-foreground"
							>
								<Link
									viewTransition
									to="/transactions"
								>
									See all <ArrowRight />{' '}
								</Link>
							</Button>
						</CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</section>
		</div>
	)
}

export default DashboardPage
