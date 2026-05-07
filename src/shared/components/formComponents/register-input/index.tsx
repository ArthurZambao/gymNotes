interface RegisterInputProps {
  form: {
    name: string;
    email: string;
    password: string;
  };
  handleChange: (field: "name" | "email" | "password", value: string) => void;
  errors: Partial<Record<"name" | "email" | "password", string>>;
  type: "name" | "email" | "password";
}

export function RegisterInput({ form, handleChange, errors, type }: RegisterInputProps) {
  return (
    <div>
      <input
        value={form[type]}
        onChange={(e) => handleChange(type, e.target.value)}
        type={type === "password" ? "password" : "text"}
        placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
        className="h-12 pl-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {errors[type] && (
        <span className="text-red-500 text-sm">{errors[type]}</span>
      )}
    </div>
  );
}