"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

type FieldKey = "name" | "email" | "password";

interface RegisterInputProps<T extends FieldKey> {
  form: Partial<Record<T, string>>;
  handleChange: (field: T, value: string) => void;
  errors: Partial<Record<T, string>>;
  type: T;
}

const config: Record<FieldKey, { icon: React.ElementType; placeholder: string; label: string; inputType: string }> = {
  name: { icon: User, placeholder: "Seu nome completo", label: "Nome", inputType: "text" },
  email: { icon: Mail, placeholder: "seu@email.com", label: "Email", inputType: "email" },
  password: { icon: Lock, placeholder: "••••••••", label: "Senha", inputType: "password" },
};

export function RegisterInput<T extends FieldKey>({ form, handleChange, errors, type }: RegisterInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const { icon: Icon, placeholder, label, inputType } = config[type];

  const resolvedType = type === "password" ? (showPassword ? "text" : "password") : inputType;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = type === "email" ? e.target.value.toLowerCase() : e.target.value;
    handleChange(type, value);
  };

  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          value={form[type] ?? ""}
          onChange={handleInputChange}
          type={resolvedType}
          placeholder={placeholder}
          className={`
            w-full h-12 pl-10 pr-10 rounded-xl text-zinc-100 placeholder:text-zinc-600 text-sm
            bg-zinc-950/70 border transition-all
            focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/60
            ${errors[type] ? "border-red-400" : "border-zinc-800"}
          `}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 transition-colors
              ${errors[type] ? "text-red-400" : "text-zinc-500 hover:text-zinc-300"}
            `}
            aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {errors[type] && (
        <span className="text-red-400 text-xs">{errors[type]}</span>
      )}
    </div>
  );
}