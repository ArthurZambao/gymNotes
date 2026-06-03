"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width={4} height={12} x={2} y={9} />
    <circle cx={4} cy={4} r={2} />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1={17.5} x2={17.51} y1={6.5} y2={6.5} />
  </svg>
);

export function MainFooter() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 pt-12 pb-8 px-6 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
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
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/arthurzambao/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-emerald-500 transition-colors p-2 bg-zinc-900/50 hover:bg-zinc-900 rounded-full border border-transparent hover:border-zinc-800"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="https://github.com/ArthurZambao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-emerald-500 transition-colors p-2 bg-zinc-900/50 hover:bg-zinc-900 rounded-full border border-transparent hover:border-zinc-800"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.instagram.com/arthurzambao/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-emerald-500 transition-colors p-2 bg-zinc-900/50 hover:bg-zinc-900 rounded-full border border-transparent hover:border-zinc-800"
            aria-label="Instagram"
          >
            <InstagramIcon size={20} />
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-zinc-900 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest">
        © {new Date().getFullYear()} GymNotes. Todos os direitos reservados.
      </div>
    </footer>
  );
}