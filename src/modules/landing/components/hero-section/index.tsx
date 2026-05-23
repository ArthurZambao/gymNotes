import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Dumbbell } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden pt-20">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tighter text-white max-w-4xl relative z-10"
      >
        Transforme seu corpo. <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-600">
          Evolua sua mente.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl font-medium relative z-10"
      >
        Abandone as planilhas de papel. Construa, monitore e evolua seus treinos com inteligência e precisão de atleta profissional.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10"
      >
        <Link
          href="/register"
          className="group flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1"
        >
          Começar Agora
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/login"
          className="flex items-center justify-center bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-xl transition-all"
        >
          Já tenho conta
        </Link>
      </motion.div>
    </section>
  );
}