import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
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
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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

	const chartData = [
		{ month: 'January', desktop: 186, mobile: 80 },
		{ month: 'February', desktop: 305, mobile: 200 },
		{ month: 'March', desktop: 237, mobile: 120 },
		{ month: 'April', desktop: 73, mobile: 190 },
		{ month: 'May', desktop: 209, mobile: 130 },
		{ month: 'June', desktop: 214, mobile: 140 },
	]

	const chartConfig = {
		desktop: {
			label: 'Desktop',
			color: 'hsl(var(--chart-1))',
		},
		mobile: {
			label: 'Mobile',
			color: 'hsl(var(--chart-2))',
		},
	} satisfies ChartConfig

	return (
		<div className="flex h-full w-full flex-col gap-y-4 p-2">
			<section className="flex w-full items-center justify-between">
				<h1 className="text-foreground text-2xl font-bold">
					Hi! {data.userResume.username} 👋
				</h1>
				<UserCurrency />
			</section>

			<section className="flex w-full flex-col justify-between gap-y-2 md:flex-row md:gap-x-1">
				<Button
					variant="default"
					className="md:w-1/2"
				>
					<SquareArrowDownRight />
					New income
				</Button>
				<Button
					variant="secondary"
					className="md:w-1/2"
				>
					<SquareArrowUpRight />
					New expense
				</Button>
			</section>

			<section className="grid grid-cols-4 grid-rows-4 gap-2 md:grid-rows-6">
				<Card className="col-span-2 bg-neutral-900/10 dark:bg-white/5">
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

				<Card className="bg-background col-span-2 col-start-3"></Card>

				<Card className="bg-background col-span-2 row-start-2 w-full">
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

				<Card className="bg-background col-span-2 col-start-3 row-start-2 w-full">
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

				<Card className="bg-background col-span-4 row-span-2 row-start-3 md:row-span-4">
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
