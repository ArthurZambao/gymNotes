"use client";

import { motion } from "framer-motion";
import { loginSchema } from "../../schemas/login-schema";
import { useLoginForm } from "../../hook/useLoginForm";
import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";
import { RegisterInput } from "@/src/shared/components/formComponents/form-input";
import { GoogleLoginButton } from "@/src/shared/components/googleLoginButton";

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
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight wrap-break-word">
              Bem-vindo <span className="green-shine-animation">
                {form.email.includes("@") ? form.email.slice(0, form.email.indexOf("@")) + "!" : ""}
              </span>
            </h1>
            <p className="text-zinc-400 mt-1 text-sm">
              Continue sua evolução
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <RegisterInput form={form} errors={errors} handleChange={handleChange} type="email" />
            <RegisterInput form={form} errors={errors} handleChange={handleChange} type="password" />

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

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs uppercase tracking-widest">ou</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <div className="flex justify-center mb-4">
            <GoogleLoginButton />
          </div>

          <p className="text-center text-sm text-zinc-500">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
              Criar Conta
            </Link>
          </p>
        </motion.div>

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