"use client";

import { motion } from "framer-motion";
import { loginSchema } from "../../schemas/login-schema";
import { useLoginForm } from "../../hook/useLoginForm";
import Link from "next/link";
import { Dumbbell, ArrowRight, Mail, Lock } from "lucide-react";

export function LoginPage() {
  const { form, errors, handleChange, handleSubmit } = useLoginForm(loginSchema);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 px-6 relative overflow-hidden selection:bg-emerald-500/30">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 bg-emerald-500/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-75 h-75 bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="w-full max-w-md relative z-10">
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
        >
          {/* Header do card */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight wrap-break-word">
              Bem-vindo <span className="green-shine-animation">{form.email.slice(0, form.email.indexOf("@")) + " !" || ""}</span>
            </h1>
            <p className="text-zinc-400 mt-1 text-sm">
              Continue sua evolução
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full h-12 pl-10 pr-4 bg-zinc-950/70 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                />
              </div>
              {errors.email && (
                <span className="text-red-400 text-xs">{errors.email}</span>
              )}
            </div>

            {/* Senha */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Senha
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-4 bg-zinc-950/70 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                />
              </div>
              {errors.password && (
                <span className="text-red-400 text-xs">{errors.password}</span>
              )}
            </div>

            {/* Botão */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="cursor-pointer group w-full h-12 mt-2 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)]"
            >
              Entrar
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          {/* Divisor */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs uppercase tracking-widest">ou</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Criar conta */}
          <p className="text-center text-sm text-zinc-500">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              Criar conta
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