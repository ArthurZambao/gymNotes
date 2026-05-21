"use client";

import { calculateIMC } from "@/src/shared/utils/calculateIMC";
import { useCurrentWorkout } from "../../hooks/useCurrentWorkout";
import Image from "next/image";
import { Camera } from "lucide-react";
import { AVATAR_OPTIONS } from "@/src/shared/constants/avatar";

export function UserCard() {
  const { user, isEditing, setIsEditing, weight, setWeight, height, setHeight, handleUpdate, pictureMenu, openPictureMenu, newAvatar, handleUpdateAvatar } = useCurrentWorkout();

  if (!user) {
    return (
      <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 animate-pulse">
        <h2 className="text-xl font-bold text-zinc-500 text-center md:text-left">Carregando atleta...</h2>
      </div>
    );
  }

  const imc = calculateIMC(user.weight, user.height);

  return (

    <div className="relative z-0 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 overflow-hidden">
      {pictureMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => openPictureMenu(false)}
          />

          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 w-full max-w-md z-10 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <Camera className="text-emerald-500" size={24} />
              Alterar Avatar
            </h2>

            <div className="grid grid-cols-4 gap-3">
              {AVATAR_OPTIONS.map((src, i) => (
                <button
                  key={i}
                  onClick={() => {openPictureMenu(false); handleUpdateAvatar(src)}}
                  className="cursor-pointer w-full aspect-square rounded-full overflow-hidden border-2 border-zinc-700 hover:border-emerald-500 transition-colors"
                >
                  <Image
                    width={64}
                    height={64}
                    src={src}
                    alt={`Avatar ${i + 1}`}
                    className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-zinc-800">
              <button
                onClick={() => openPictureMenu(false)}
                className="px-5 py-2 text-zinc-400 hover:text-white font-semibold transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -z-10" />
      <button
        onClick={() => setIsEditing(!isEditing)}
        className={`cursor-pointer absolute top-4 right-4 text-[10px] sm:text-sm font-bold transition-colors z-20 ${isEditing ? "text-zinc-500 hover:text-zinc-300" : "text-emerald-400 hover:text-emerald-300"
          }`}
      >
        {isEditing ? "CANCELAR" : "EDITAR PERFIL"}
      </button>

      <div className="relative w-24 h-24 md:w-20 md:h-20 shrink-0 group cursor-pointer">
        <Image
          fill
          src={newAvatar || user.avatar || "https://github.com/shadcn.png"}
          alt="Avatar"
          className="rounded-full border-2 border-emerald-500 object-cover shadow-xl"
        />

        <div onClick={() => openPictureMenu(true)} className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Camera className="w-5 h-5 text-white" />
          <span className="text-white text-[10px] font-medium mt-1">Alterar</span>
        </div>
      </div>

      <div className="flex-1 w-full text-center md:text-left">
        <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight">{user.name}</h2>
        <p className="text-zinc-400 text-sm mb-4">{user.email}</p>

        {isEditing ? (
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
            <div className="flex items-center gap-2 bg-zinc-950 px-3 py-2 rounded-lg border border-zinc-800 w-full sm:w-auto">
              <span className="text-zinc-500 text-sm">Peso</span>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="bg-transparent text-white w-full sm:w-16 outline-none text-right"
              />
              <span className="text-zinc-500 text-sm">kg</span>
            </div>

            <div className="flex items-center gap-2 bg-zinc-950 px-3 py-2 rounded-lg border border-zinc-800 w-full sm:w-auto">
              <span className="text-zinc-500 text-sm">Altura</span>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="bg-transparent text-white w-full sm:w-16 outline-none text-right"
              />
              <span className="text-zinc-500 text-sm">cm</span>
            </div>

            <button
              onClick={handleUpdate}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-6 py-2 rounded-lg transition-colors"
            >
              SALVAR
            </button>
          </div>
        ) : (
          /* Grid de Stats Responsivo */
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 md:gap-6 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Peso</span>
              <span className="text-lg font-semibold text-zinc-200">
                {user.weight} <span className="text-xs text-zinc-500 font-normal">kg</span>
              </span>
            </div>

            {/* Divisores ocultos no mobile (opcional, trocado por gap) */}
            <div className="hidden sm:block w-px h-8 bg-zinc-800" />

            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Altura</span>
              <span className="text-lg font-semibold text-zinc-200">
                {user.height} <span className="text-xs text-zinc-500 font-normal">cm</span>
              </span>
            </div>

            <div className="hidden sm:block w-px h-8 bg-zinc-800" />

            <div className="flex flex-col col-span-2 sm:col-span-1 border-t border-zinc-800 pt-3 sm:border-0 sm:pt-0">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">IMC</span>
              <div className="flex items-center justify-center md:justify-start gap-2">
                {!Number.isNaN(imc.value)
                  ? <span className="text-lg font-semibold text-zinc-200">{imc.value.toFixed(1)}</span>
                  : <span className="text-lg font-semibold text-zinc-500">--</span>
                }
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${imc.color.replace('text-', 'bg-').replace('500', '500/20')} ${imc.color}`}>
                  {imc.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}