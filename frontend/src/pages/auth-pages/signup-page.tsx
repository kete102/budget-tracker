import FieldInfo from "@/components/auth/field-info";
import { useAuthService } from "@/hooks/use-auth-service";
import { signUpSchema } from "@/services/auth/types";
import { formOptions, useForm } from "@tanstack/react-form";
import { Link } from "react-router";

const formOpts = formOptions({
	defaultValues: {
		email: '',
		username: '',
		password: '',
	},
	validators: {
		onChange: signUpSchema,
	}
});

function SignUpPage() {
	const { signUpUser } = useAuthService()

	const form = useForm({
		...formOpts,
		onSubmit: async ({ value }) => {
			signUpUser(value)
		}
	});


	return (
		<div className="h-full w-full flex flex-col justify-center p-2">
			<div className="w-full max-w-md md:max-w-lg mx-auto bg-neutral-500/20 border-2 border-neutral-700 p-6 rounded-lg">
				<h1 className="text-neutral-100 font-medium text-3xl text-center mb-4">
					Register
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
										className="text-neutral-100 font-normal text-xl my-1"
									>
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
						<form.Field name="username">
							{(field) => (
								<>
									<label className="font-normal text-neutral-100 text-xl my-1">
										Username
									</label>
									<input
										className="w-full bg-neutral-900 p-2 rounded-md my-1 ring-2 ring-neutral-700 outline-none focus:ring-neutral-300 text-lg text-neutral-100"
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
								{isSubmitting ? '...' : 'Create acccount'}
							</button>
						)}
					></form.Subscribe>
				</form>
				<p className="w-full text-neutral-100  mt-4">
					Already have an account?{' '}
					<Link
						to="/sign-in"
						className="underline cursor-pointer underline-offset-2"
						viewTransition
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}

export default SignUpPage
