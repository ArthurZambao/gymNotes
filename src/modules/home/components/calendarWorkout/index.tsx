"use client";

import { Check, Dumbbell, Save, ChevronDown } from "lucide-react";
import { useCalendarWorkout } from "../../hooks/useCalendarWorkout";

export function CalendarWorkout() {
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    logsDoMes,
    isLoading,
    selectedWorkoutDay,
    setSelectedWorkoutDay,
    exerciseForms,
    isSaving,
    currentLog,
    handleSelectWorkoutDay,
    handleFormChange,
    handleSaveLog,
    getExerciseName,
    getExerciseUnit,
    activeWorkout,
    daysInMonth,
    year,
    month,
  } = useCalendarWorkout();

  if (!activeWorkout || !activeWorkout.days) {
    return (
      <div className="w-full p-10 flex items-center justify-center text-zinc-500 font-bold bg-zinc-900 border border-zinc-800 rounded-2xl">
        Você não possui nenhum treino ativo. Crie um treino para começar a registrar sua evolução!
      </div>
    );
  }
  return (
    <div className="grid lg:grid-cols-3 gap-6">

      <div className="bg-zinc-900 border border-zinc-800 shadow-xl rounded-2xl p-6 lg:col-span-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs text-emerald-400 uppercase font-extrabold tracking-widest">
            Frequência
          </h3>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            {currentDate.toLocaleString("pt-BR", { month: "long", year: "numeric" })}
          </span>
        </div>

        {isLoading ? (
          <div className="flex-1 flex justify-center items-center text-zinc-500 text-sm font-semibold">
            Carregando dados...
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1.5 flex-1 content-start">
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNumber = i + 1;
              const dateForSquare = new Date(year, month, dayNumber);

              const hasLog = logsDoMes.some((log) => {
                const ld = new Date(log.date);
                return ld.getDate() === dayNumber;
              });

              const isSelected = selectedDate.getDate() === dayNumber;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateForSquare)}
                  className={`aspect-square rounded-sm flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer hover:scale-110 border
                  ${isSelected
                      ? "border-emerald-500 text-emerald-400 bg-zinc-950 scale-105 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                      : "border-transparent"
                    }
                  ${hasLog
                      ? "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/40"
                      : !isSelected ? "bg-zinc-950 text-zinc-700 hover:bg-zinc-800" : ""
                    }
                `}
                >
                  {dayNumber}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500 font-semibold justify-end border-t border-zinc-800/50 pt-4">
          <span>não foi</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-zinc-950"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-500/50"></div>
          </div>
          <span>Foi</span>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 shadow-xl rounded-2xl p-6 lg:col-span-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h3 className="text-xs text-emerald-400 uppercase font-extrabold tracking-widest mb-1">
              Registro de Hoje
            </h3>
            <span className="text-sm font-semibold text-zinc-400">
              {selectedDate.toLocaleDateString("pt-BR", { weekday: 'long', day: '2-digit', month: 'long' })}
            </span>
          </div>

          {currentLog && (
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
              <Check size={14} /> {currentLog.dayName} Completo
            </span>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">

          {currentLog ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-900/80 text-zinc-500 text-xs uppercase font-bold tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="px-4 py-3">Exercício</th>
                    <th className="px-4 py-3 text-center w-24">Carga</th>
                    <th className="px-4 py-3 text-center w-20">Séries</th>
                    <th className="px-4 py-3 text-center w-20">Reps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {currentLog.exercises.map((t: any, i: number) => (
                    <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3 font-semibold text-zinc-200">
                        {getExerciseName(t.exerciseId)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-zinc-800 text-emerald-400 font-bold px-2.5 py-1 rounded text-xs shadow-inner">
                          {t.weight} {getExerciseUnit(t.exerciseId)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-medium text-zinc-400">{t.sets}</td>
                      <td className="px-4 py-3 text-center font-medium text-zinc-400">{t.reps}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          ) : (

            <div className="p-4">
              {!selectedWorkoutDay ? (
                <div className="py-8 flex flex-col items-center text-center space-y-4">
                  <Dumbbell className="text-zinc-600 mb-2" size={32} />
                  <div>
                    <h4 className="text-zinc-200 font-bold text-lg">Nenhum registro encontrado</h4>
                    <p className="text-zinc-500 text-sm mb-6">Qual treino você realizou nesta data?</p>
                  </div>

                  <div className="relative w-full max-w-sm">
                    <select
                      className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm font-semibold rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-3 appearance-none cursor-pointer hover:border-zinc-500 transition-colors"
                      value={selectedWorkoutDay}
                      onChange={handleSelectWorkoutDay}
                    >
                      <option value="" disabled>Selecione a ficha do dia...</option>
                      {activeWorkout?.days?.map((day: any, idx: number) => (
                        <option key={idx} value={day.name}>
                          {day.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-md">
                      {selectedWorkoutDay}
                    </h4>
                    <button
                      onClick={() => setSelectedWorkoutDay("")}
                      className="cursor-pointer text-xs text-zinc-500 hover:text-zinc-300 font-semibold transition-colors"
                    >
                      Trocar Ficha
                    </button>
                  </div>

                  <div className="space-y-2 mb-6 max-h-62.5 overflow-y-auto custom-scrollbar pr-2">
                    {exerciseForms.map((exForm, index) => (
                      <div key={index} className="grid grid-cols-12 gap-3 items-center bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                        <div className="col-span-12 lg:col-span-5 font-semibold text-zinc-200 text-sm truncate">
                          {getExerciseName(exForm.exerciseId)}
                        </div>

                        <div className="col-span-6 sm:col-span-3 flex flex-col">
                          <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1">
                            {getExerciseUnit(exForm.exerciseId) === "Pl" ? "Placas" : "Carga (kg)"}
                          </label>
                          <input
                            type="number"
                            value={exForm.weight || ''}
                            onChange={(e) => handleFormChange(index, 'weight', e.target.value)}
                            className="bg-zinc-950 border border-zinc-700 rounded p-1.5 text-center text-emerald-400 font-bold outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-700"
                            placeholder="0"
                          />
                        </div>

                        <div className="col-span-3 sm:col-span-2 flex flex-col">
                          <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Séries</label>
                          <input
                            type="number"
                            value={exForm.sets || ''}
                            onChange={(e) => handleFormChange(index, 'sets', e.target.value)}
                            className="bg-zinc-950 border border-zinc-700 rounded p-1.5 text-center text-white outline-none focus:border-zinc-500 transition-colors"
                          />
                        </div>

                        <div className="col-span-3 sm:col-span-2 flex flex-col">
                          <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Reps</label>
                          <input
                            type="number"
                            value={exForm.reps || ''}
                            onChange={(e) => handleFormChange(index, 'reps', e.target.value)}
                            className="bg-zinc-950 border border-zinc-700 rounded p-1.5 text-center text-white outline-none focus:border-zinc-500 transition-colors"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-zinc-800">
                    <button
                      onClick={handleSaveLog}
                      disabled={isSaving}
                      className="cursor-pointer flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold px-6 py-2.5 rounded-lg transition-colors"
                    >
                      <Save size={18} />
                      {isSaving ? "Salvando..." : "Salvar Treino"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}