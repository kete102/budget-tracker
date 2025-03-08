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
import { useUserTransactions } from '@/hooks/use-user-transactions'
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
	const { data: userOverview, isLoading: loadingUserOverview } = useUserResume()
	const { data: transactions, isLoading: loadingTransactions } =
		useUserTransactions()

	console.log(transactions)

	if (!userOverview) {
		return <div className="text-foreground">No username</div>
	}

	if (loadingUserOverview) {
		return (
			<div className="grid h-full w-full place-content-center">
				<Ellipsis className="size-10" />
			</div>
		)
	}

	const userCurrency = CURRENCIES.find(
		(currency) => currency.value === userOverview.userResume.currency
	)

	return (
		<div className="h-full w-full p-2">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
				{/* Saludo y Balance */}
				<article className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3">
					<section className="flex w-full flex-col gap-4">
						<div className="flex w-full items-center justify-between">
							<h1 className="text-foreground text-2xl font-bold">
								Hi! {userOverview.userResume.username} 👋
							</h1>
							<UserCurrency />
						</div>
						<div className="flex items-center justify-between">
							<h2 className="inline-flex items-center gap-x-2 text-xl font-semibold text-amber-600">
								<PiggyBank /> Total Balance
							</h2>
							<h1 className="text-foreground text-2xl font-bold">
								{userOverview.userResume.balance} {userCurrency?.symbol}
							</h1>
						</div>
					</section>
				</article>

				{/* Ingresos y Gastos */}
				<article className="col-span-full flex w-full flex-row items-center gap-x-2">
					<Card className="bg-background w-full">
						<CardContent>
							<h2 className="text-foreground text-2xl font-bold">
								+ {userOverview.userResume.totalIncome} {userCurrency?.symbol}
							</h2>
						</CardContent>
						<CardHeader className="flex w-full justify-between">
							<CardTitle className="text-muted-foreground flex items-center gap-x-2">
								<TrendingUp className="size-5" /> Total Incomes
							</CardTitle>
						</CardHeader>
						<CardContent className="w-full">
							<Button
								variant="outline"
								className="w-full border border-green-900 bg-emerald-600"
							>
								<SquareArrowDownRight /> New income
							</Button>
						</CardContent>
					</Card>

					<Card className="bg-background w-full">
						<CardContent>
							<h2 className="text-foreground text-2xl font-bold">
								- {userOverview.userResume.totalExpenses} {userCurrency?.symbol}
							</h2>
						</CardContent>
						<CardHeader className="flex w-full justify-between">
							<CardTitle className="text-muted-foreground flex items-center gap-x-2">
								<TrendingDown className="size-5" /> Total Expenses
							</CardTitle>
						</CardHeader>
						<CardContent className="w-full">
							<Button
								variant="outline"
								className="w-full border border-red-900 bg-red-500"
							>
								<SquareArrowUpRight /> New expense
							</Button>
						</CardContent>
					</Card>
				</article>

				{/* Actividad */}
				<article className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3">
					<Card className="bg-background h-full">
						<CardHeader className="flex w-full justify-between">
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
										See all <ArrowRight />
									</Link>
								</Button>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<span className="text-muted-foreground text-sm">
								Showing last transactions
							</span>
							<div className="mt-4">
								{loadingTransactions && <p>Loading...</p>}
								{transactions.length === 0 && (
									<p className="text-muted-foreground text-center font-semibold">
										No transactions yet
									</p>
								)}
							</div>
						</CardContent>
					</Card>
				</article>
			</div>
		</div>
	)
}

export default DashboardPage
