import FieldInfo from '@/components/auth/field-info'
import { useAuthService } from '@/hooks/use-auth-service'
import { formOptions, useForm } from '@tanstack/react-form'
import { Link } from 'react-router'
import z from 'zod'

const loginSchema = z.object({
	email: z.string().email({ message: 'Please, enter a valid email address' }),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
})

const formOpts = formOptions({
	defaultValues: {
		email: '',
		password: '',
	},
	validators: {
		onChange: loginSchema,
	},
})

function SignInPage() {
	const { signInUser } = useAuthService()

	const form = useForm({
		...formOpts,
		onSubmit: async ({ value }) => {
			signInUser(value)
		},
	})

	return (
		<div className="flex h-full w-full flex-col justify-center p-2">
			<div className="mx-auto w-full max-w-md rounded-lg border-2 border-neutral-700 bg-neutral-500/20 p-6 md:max-w-lg">
				<h1 className="mb-8 text-center text-3xl font-medium text-neutral-100">
					Welcome back
				</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
					className="w-full space-y-4"
				>
					<div>
						<form.Field name="email">
							{(field) => (
								<>
									<label
										htmlFor={field.name}
										className="text-xl font-normal text-neutral-100"
									>
										Email
									</label>
									<input
										className="my-1 w-full rounded-md bg-neutral-900 p-2 text-lg text-neutral-100 ring-2 ring-neutral-700 outline-none focus:ring-neutral-300"
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										placeholder="example@email.com"
										onChange={(e) => field.handleChange(e.target.value)}
										type="email"
									/>
									<FieldInfo field={field} />
								</>
							)}
						</form.Field>
					</div>
					<div>
						<form.Field name="password">
							{(field) => (
								<>
									<label className="my-1 text-xl font-normal text-neutral-100">
										Password
									</label>
									<input
										className="my-1 w-full rounded-md bg-neutral-900 p-2 text-lg text-neutral-100 ring-2 ring-neutral-700 outline-none focus:ring-neutral-300"
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										type="password"
									/>
									<FieldInfo field={field} />
								</>
							)}
						</form.Field>
					</div>
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<button
								type="submit"
								disabled={!canSubmit}
								className="mt-6 w-full cursor-pointer rounded-md bg-neutral-100 py-2 text-center text-xl font-medium text-neutral-900 transition-transform duration-200 active:scale-95"
							>
								{isSubmitting ? '...' : 'Log in'}
							</button>
						)}
					></form.Subscribe>
				</form>
				<p className="mt-4 w-full text-neutral-100">
					Don&apos;t have an account?{' '}
					<Link
						to="/sign-up"
						className="cursor-pointer underline underline-offset-2"
						viewTransition
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	)
}

export default SignInPage
