"use client";

import { motion } from "framer-motion";
import { useRegisterForm } from "../../hook/useRegisterForm";
import { registerSchema } from "../../schema/register-schema";
import { RegisterInput } from "@/src/shared/components/formComponents/register-input";
import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";

export function RegisterPage() {
  const { form, errors, handleChange, handleSubmit } = useRegisterForm(registerSchema);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 px-6 relative overflow-hidden selection:bg-emerald-500/30">

      {/* Glow de fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 bg-emerald-500/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-75 h-75 bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <Link href="/" className="flex items-center gap-2 group">
            <Dumbbell className="text-emerald-500 group-hover:rotate-12 transition-transform" size={26} />
            <span className="text-2xl font-extrabold text-zinc-100 tracking-tighter">
              Gym<span className="text-emerald-500">Notes</span>
            </span>
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
        >
          {/* Header do card */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight">
              Crie sua conta
            </h1>
            <p className="text-zinc-400 mt-1 text-sm">
              Comece sua evolução agora mesmo!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <RegisterInput form={form} errors={errors} handleChange={handleChange} type="name" />
            <RegisterInput form={form} errors={errors} handleChange={handleChange} type="email" />
            <RegisterInput form={form} errors={errors} handleChange={handleChange} type="password" />

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="cursor-pointer group w-full h-12 mt-2 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)]"
            >
              Criar Conta
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          {/* Divisor */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs uppercase tracking-widest">ou</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Login */}
          <p className="text-center text-sm text-zinc-500">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              Entrar
            </Link>
          </p>
        </motion.div>

        {/* Rodapé */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-zinc-700 mt-6"
        >
          © 2025 GymNotes. Todos os direitos reservados.
        </motion.p>
      </div>
    </div>
  );
}