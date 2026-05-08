"use client";

import { motion } from "framer-motion";
import { useRegisterForm } from "../../hook/useRegisterForm";
import { registerSchema } from "../../schema/register-schema";
import { RegisterInput } from "@/src/shared/components/formComponents/register-input";
import Link from "next/link";

export function RegisterPage() {
  const { form, errors, handleChange, handleSubmit } = useRegisterForm(registerSchema);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-zinc-200"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Criar Conta</h1>
          <p className="text-gray-500 mt-2">
            Comece sua evolução agora mesmo 💪
          </p>
        </div>

        <form onSubmit={handleSubmit} className="tex-black space-y-5 flex flex-col">
          <RegisterInput form={form} errors={errors} handleChange={handleChange} type="name" />
          <RegisterInput form={form} errors={errors} handleChange={handleChange} type="email" />
          <RegisterInput form={form} errors={errors} handleChange={handleChange} type="password" />
          <button className="cursor-pointer w-full h-12 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-xl">
            Criar Conta
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">ou</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem uma conta? <Link href="/login" className="text-green-600 font-medium cursor-pointer">
            Entrar
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
