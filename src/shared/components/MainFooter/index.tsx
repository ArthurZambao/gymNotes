"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";

export function MainFooter() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 pt-12 pb-8 px-6 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* BRAND / LOGO */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2 group opacity-80 hover:opacity-100 transition-opacity">
            <Dumbbell className="text-emerald-500" size={20} />
            <span className="text-xl font-extrabold text-zinc-100 tracking-tighter">
              Gym<span className="text-emerald-500">Notes</span>
            </span>
          </Link>
          <p className="text-zinc-500 text-sm font-medium">
            Sua evolução, registrada com inteligência.
          </p>
        </div>

        {/* LINKS */}
        <div className="flex gap-6 text-sm font-bold text-zinc-500">
          <Link href="#" className="hover:text-emerald-400 transition-colors">
            Termos de Uso
          </Link>
          <Link href="#" className="hover:text-emerald-400 transition-colors">
            Privacidade
          </Link>
          <Link href="#" className="hover:text-emerald-400 transition-colors">
            Contato
          </Link>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-zinc-900 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest">
        © {new Date().getFullYear()} GymNotes. Todos os direitos reservados.
      </div>
    </footer>
  );
}