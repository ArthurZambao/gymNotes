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

  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          value={form[type] ?? ""}
          onChange={(e) => handleChange(type, e.target.value)}
          type={resolvedType}
          placeholder={placeholder}
          className="w-full h-12 pl-10 pr-10 bg-zinc-950/70 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
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