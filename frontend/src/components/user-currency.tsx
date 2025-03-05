import { CURRENCIES } from '@/consts/currencies'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
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
	const [open, setOpen] = useState(false)
	const [currentCurrency, setCurrentCurrency] = useState<
		(typeof CURRENCIES)[0]
	>(CURRENCIES[0])

	const selectedCurrency = CURRENCIES.find(
		(currency) => currency.value === currentCurrency.value
	)

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
										setCurrentCurrency(
											selectedCurrency?.value === currentCurrency.value
												? CURRENCIES[0]
												: selectedCurrency!
										)
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
