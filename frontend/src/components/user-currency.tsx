import { CURRENCIES } from '@/consts/currencies'
import { useUserResume } from '@/hooks/use-user-service'
import { cn } from '@/lib/utils'
import { updateUserCurrency } from '@/services/user/user-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, ChevronsUpDown, Ellipsis } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from './ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

function UserCurrency() {
	const queryClient = useQueryClient()
	const { data, isLoading } = useUserResume()
	const [open, setOpen] = useState(false)
	const [currentCurrency, setCurrentCurrency] = useState<
		(typeof CURRENCIES)[0]
	>(CURRENCIES[0])
	//NOTE: Finds the user currency from the backend in the CURRENCIES array
	const selectedCurrency = CURRENCIES.find(
		(currency) => currency.value === currentCurrency.value
	)

	//NOTE:Sets the user currency on the picker
	useEffect(() => {
		if (data) {
			const currency = CURRENCIES.find(
				(currency) => currency.value === data.userResume.currency
			)
			if (currency) {
				setCurrentCurrency(currency)
			}
		}
	}, [data])

	const { mutate: updateCurrency } = useMutation({
		mutationKey: ['update-user-currency'],
		mutationFn: (newCurrenty: string) => {
			return updateUserCurrency(newCurrenty)
		},
		onMutate: (newCurrency) => {
			const previousCurrency = currentCurrency
			setCurrentCurrency(
				CURRENCIES.find((c) => c.value === newCurrency) || CURRENCIES[0]
			)

			return { previousCurrency }
		},
		onError: () => {
			toast.error('Error updating currency')
		},
		onSuccess: () => {
			toast.success('Currency updated')
			queryClient.invalidateQueries({ queryKey: ['user-resume'] })
		},
	})

	if (isLoading) {
		return <Ellipsis />
	}

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-fit"
				>
					<span>
						{selectedCurrency
							? `${selectedCurrency.name} ${selectedCurrency.flag}`
							: 'Currency...'}
					</span>
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput
						placeholder="Search currency"
						className="h-9"
					/>
					<CommandList>
						<CommandEmpty>No framework found.</CommandEmpty>
						<CommandGroup>
							{CURRENCIES.map((currency) => (
								<CommandItem
									key={currency.value}
									value={currency.value}
									onSelect={(currentValue) => {
										const selectedCurrency = CURRENCIES.find(
											(c) => c.value === currentValue
										)
										if (selectedCurrency) {
											setCurrentCurrency(
												selectedCurrency?.value === currentCurrency.value
													? CURRENCIES[0]
													: selectedCurrency!
											)
											updateCurrency(selectedCurrency.value)
										}
										setOpen(false)
									}}
								>
									<span className="text-md font-medium">
										{currency.flag} {currency.symbol} {currency.name}
									</span>
									<Check
										className={cn(
											'ml-auto',
											currentCurrency.value === currency.value
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default UserCurrency
