import FieldInfo from '@/components/auth/field-info'
import { useAuthService } from '@/hooks/use-auth-service'
import { signUpSchema } from '@/services/auth/types'
import { formOptions, useForm } from '@tanstack/react-form'
import { Link } from 'react-router'

const formOpts = formOptions({
	defaultValues: {
		email: '',
		username: '',
		password: '',
	},
	validators: {
		onChange: signUpSchema,
	},
})

function SignUpPage() {
	const { signUpUser } = useAuthService()

	const form = useForm({
		...formOpts,
		onSubmit: async ({ value }) => {
			signUpUser(value)
		},
	})

	return (
		<div className="flex h-full w-full flex-col justify-center p-2">
			<div className="mx-auto w-full max-w-md rounded-lg border-2 border-neutral-700 bg-neutral-500/20 p-6 md:max-w-lg">
				<h1 className="mb-8 text-center text-3xl font-medium text-neutral-100">
					Create an account
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
										className="my-1 text-xl font-normal text-neutral-100"
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
						<form.Field name="username">
							{(field) => (
								<>
									<label className="my-1 text-xl font-normal text-neutral-100">
										Username
									</label>
									<input
										className="my-1 w-full rounded-md bg-neutral-900 p-2 text-lg text-neutral-100 ring-2 ring-neutral-700 outline-none focus:ring-neutral-300"
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										placeholder="John Doe"
										onChange={(e) => field.handleChange(e.target.value)}
										type="text"
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
								{isSubmitting ? '...' : 'Create acccount'}
							</button>
						)}
					></form.Subscribe>
				</form>
				<p className="mt-4 w-full text-neutral-100">
					Already have an account?{' '}
					<Link
						to="/sign-in"
						className="cursor-pointer underline underline-offset-2"
						viewTransition
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}

export default SignUpPage
