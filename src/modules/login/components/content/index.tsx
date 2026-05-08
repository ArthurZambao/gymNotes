"use client";

import { motion } from "framer-motion";
import { loginSchema } from "../../schemas/login-schema";
import { useLoginForm } from "../../hook/useLoginForm";
import Link from "next/link";


export function LoginPage() {
  const { form, errors, handleChange, handleSubmit } = useLoginForm(loginSchema);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-zinc-200"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Entrar</h1>
          <p className="text-gray-500 mt-2">
            Continue sua evolução 💪
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <div>
            <input
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              type="email"
              placeholder="Email"
              className="text-black h-12 pl-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div>
            <input
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              type="password"
              placeholder="Senha"
              className="text-black h-12 pl-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          <button className="cursor-pointer w-full h-12 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-xl transition">
            Entrar
          </button>
        </form>
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">ou</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem uma conta?{' '}
          <Link href="/register" className="text-green-600 font-medium cursor-pointer">
            Criar conta
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

