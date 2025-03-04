import { AnyFieldApi } from '@tanstack/react-form'

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<p className="text-md mt-2 text-red-500 italic">
			{field.state.meta.isTouched && field.state.meta.errors.length ? (
				<em>{field.state.meta.errors.map((err) => err.message).join(',')}</em>
			) : null}
		</p>
	)
}
export default FieldInfo
