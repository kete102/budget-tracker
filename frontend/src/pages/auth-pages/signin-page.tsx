import FieldInfo from '@/components/auth/field-info';
import { useAuthService } from '@/hooks/use-auth-service';
import { formOptions, useForm } from '@tanstack/react-form';
import { Link } from 'react-router';
import z from 'zod';

const loginSchema = z.object({
	email: z.string().email({ message: 'Please, enter a valid email address' }),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const formOpts = formOptions({
	defaultValues: {
		email: '',
		password: '',
	},
	validators: {
		onChange: loginSchema,
	},
});

function SignInPage() {
	const { signInUser } = useAuthService()

	const form = useForm({
		...formOpts,
		onSubmit: async ({ value }) => {
			signInUser(value)
		},
	});


	return (
		<div className="h-full w-full flex flex-col justify-center p-2">
			<div className="w-full max-w-md md:max-w-lg mx-auto bg-neutral-500/20 border-2 border-neutral-700 p-6 rounded-lg">
				<h1 className="text-neutral-100 font-medium text-3xl text-center mb-4">
					Login
				</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-4 w-full"
				>
					<div>
						<form.Field name="email">
							{(field) => (
								<>
									<label
										htmlFor={field.name}
										className="text-neutral-100 font-normal text-xl">
										Email
									</label>
									<input
										className="w-full bg-neutral-900 p-2 rounded-md my-1 ring-2 ring-neutral-700 outline-none focus:ring-neutral-300 text-lg text-neutral-100"
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
									<label className="text-neutral-100 font-normal text-xl my-1">
										Password
									</label>
									<input
										className="w-full bg-neutral-900 p-2 rounded-md my-1 ring-2 ring-neutral-700 outline-none focus:ring-neutral-300 text-lg text-neutral-100"
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
								className="w-full cursor-pointer text-center text-xl bg-neutral-100 active:scale-95 transition-transform duration-200 rounded-md py-2 text-neutral-900 font-medium mt-6"
							>
								{isSubmitting ? '...' : 'Log in'}
							</button>
						)}
					></form.Subscribe>
				</form>
				<p className="w-full text-neutral-100  mt-4">
					Don&apos;t have an account?{' '}
					<Link
						to="/sign-up"
						className="underline underline-offset-2 cursor-pointer"
						viewTransition
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default SignInPage;
