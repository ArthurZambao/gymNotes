"use client";

import Link from "next/link";
import { useUser } from "../../hooks/useUser";
import { logoutRequest } from "@/src/lib/api/auth";
import { Dumbbell, LogOut } from "lucide-react"; // Importando os ícones!

export function MainHeader() {
  const user = useUser();

  return (
    <header className="w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 fixed top-0 z-50 transition-all">
      <div className="max-w-6xl mx-auto py-3 px-6 flex justify-between items-center">

        <Link href="/" className="flex items-center gap-2 group">
          <Dumbbell className="text-emerald-500 group-hover:rotate-12 transition-transform" size={26} />
          <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tighter">
            Gym<span className="text-emerald-500">Notes</span>
          </h1>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">

          {user ? (
            <>
              <Link href="/home" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors hidden sm:block">
                Home
              </Link>
              <Link href="#" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors hidden sm:block">
                Sobre
              </Link>

              <div className="w-px h-5 bg-zinc-800 hidden sm:block"></div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-zinc-400 hidden md:block">
                  Fala, <span className="text-emerald-400 font-bold">{user.name.split(' ')[0]}</span>
                </span>

                <button
                  onClick={logoutRequest}
                  className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-red-500 transition-colors bg-zinc-900/50 hover:bg-red-500/10 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-red-500/30"
                >
                  <LogOut size={16} />
                  <span className="cursor-pointer hidden sm:inline">Sair</span>
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 text-sm font-bold px-5 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}