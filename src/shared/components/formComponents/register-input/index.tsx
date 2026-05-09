import { Mail, Lock, User } from "lucide-react";

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

const config = {
  name: {
    icon: User,
    placeholder: "Seu nome completo",
    label: "Nome",
    inputType: "text",
  },
  email: {
    icon: Mail,
    placeholder: "seu@email.com",
    label: "Email",
    inputType: "email",
  },
  password: {
    icon: Lock,
    placeholder: "••••••••",
    label: "Senha",
    inputType: "password",
  },
};

export function RegisterInput({ form, handleChange, errors, type }: RegisterInputProps) {
  const { icon: Icon, placeholder, label, inputType } = config[type];

  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          value={form[type]}
          onChange={(e) => handleChange(type, e.target.value)}
          type={inputType}
          placeholder={placeholder}
          className="w-full h-12 pl-10 pr-4 bg-zinc-950/70 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all"
        />
      </div>
      {errors[type] && (
        <span className="text-red-400 text-xs">{errors[type]}</span>
      )}
    </div>
  );
}