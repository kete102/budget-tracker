import { AnyFieldApi } from "@tanstack/react-form";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <p className="text-red-500 mt-2 italic text-md">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.map((err) => err.message).join(',')}</em>
      ) : null}
    </p>
  );
}
export default FieldInfo

