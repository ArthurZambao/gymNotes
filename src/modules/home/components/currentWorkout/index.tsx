"use client";

import { Trash2, Plus, Edit2, Check, Dumbbell } from "lucide-react";
import { muscleOptions, muscleTypes } from "@/src/shared/constants/MuscleOptions";
import { useCurrentWorkout } from "../../hooks/useCurrentWorkout";
import { useState } from "react";
import { MuscleGroup, WorkoutExercise } from "@/src/types/currentWorkouttypes";

export function CurrentWorkout() {
  const [searchTerms, setSearchTerms] = useState<Record<number, string>>({});
  const {
    workouts,
    editWorkout,
    editedExercises,
    allExercises,
    newWorkoutDays,
    newWorkoutName,
    setNewWorkoutName,
    setCreateWorkoutOpen,
    selectedDayIndex,
    createWorkoutOpen,
    handleExerciseChange,
    handleExerciseList,
    handleShowEditWorkout,
    handleSaveWorkout,
    handleRemoveExercise,
    handleSelectDay,
    handleCreateWorkoutDay,
    handleAddExerciseToNewWorkout,
    handleCreateWorkout,
    exerciseMenuOpen,
    setExerciseMenuOpen,
    newExerciseName,
    setNewExerciseName,
    selectedMuscles,
    setSelectedMuscles,
    handleAddNewExercise,
    handleDeleteWorkout,
    handleRemoveWorkoutDay,
    newExerciseUnit,
    setNewExerciseUnit,
  } = useCurrentWorkout();

  return (
    <div className="bg-zinc-900 border border-zinc-800 shadow-xl rounded-2xl p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xs text-emerald-400 uppercase font-extrabold tracking-widest mb-1">
            Plano de Treino
          </h2>
          <div className="flex gap-4 items-center">
            <h3 className="text-2xl font-bold text-white">
              {workouts[0]?.name || "Nenhum treino ativo"}
            </h3>
            {editWorkout && (
              <button onClick={handleDeleteWorkout} className="cursor-pointer text-sm font-semibold text-red-500 hover:text-red-400 mt-1 transition-colors duration-300">
                Excluir Treino
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleExerciseList}
            className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-lg transition-colors text-sm"
          >
            <Plus size={16} /> Novo Exercício
          </button>
          <button
            onClick={() => setCreateWorkoutOpen(true)}
            className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-lg transition-colors text-sm"
          >
            <Plus size={16} /> Criar Treino
          </button>
        </div>
      </div>

      <div className="mb-6">
        {/* Mobile: carousel com 2 cards visíveis */}
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory sm:flex-wrap sm:overflow-visible scrollbar-hide">
          {workouts[0]?.days?.map((day, i) => (
            <button
              key={i}
              onClick={() => handleSelectDay(i)}
              className={`
          cursor-pointer whitespace-nowrap px-5 py-2 rounded-xl text-sm font-bold transition-all
          snap-start shrink-0 w-[calc(50%-4px)] sm:w-auto
          ${selectedDayIndex === i
                  ? "bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : "bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                }
        `}
            >
              {day.name || `Dia ${i + 1}`}
            </button>
          ))}
        </div>

        {/* Botões Salvar/Editar separados */}
        <div className="flex justify-end items-center mt-2">
          {editWorkout && (
            <button
              onClick={() => handleSaveWorkout()}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors text-emerald-400 hover:text-emerald-300"
            >
              Salvar
            </button>
          )}
          <button
            onClick={() => handleShowEditWorkout()}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${editWorkout ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" : "text-zinc-400 hover:text-white"
              }`}
          >
            {workouts[0]?.name ? (editWorkout ? "Cancelar Edição" : <><Edit2 size={16} /> Editar</>) : ""}
          </button>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-2 sm:gap-4 p-3 sm:p-4 border-b border-zinc-800 text-xs font-bold text-zinc-500 uppercase tracking-wider bg-zinc-900/50">
          <div className="col-span-8">
            <div className="flex">
              <span className="pr-4">Exercício</span>
              <div className="flex gap-2">
                <span className="text-xs text-main-green flex items-center">1º</span>
                <span className="text-xs text-yellow-400 flex items-center">2º</span>
                <span className="text-xs text-zinc-500 flex items-center">3º</span>
              </div>
            </div>
          </div>
          <div className="col-span-2 text-center">Séries</div>
          <div className="col-span-2 text-center">Reps</div>
        </div>
        {editedExercises.length === 0 && (
          <div className="p-6 text-center text-zinc-400">
            Nenhum exercício adicionado para este dia.
          </div>
        )}
        <div className="divide-y divide-zinc-800/50">
          {editedExercises.map((t: WorkoutExercise, i: number) => {
            const exercise = typeof t.exerciseId === "object" ? t.exerciseId : allExercises.find((ex) => ex._id === t.exerciseId);

            return (
              <div key={i} className="grid grid-cols-12 gap-2 sm:gap-4 p-3 sm:p-4 items-center hover:bg-zinc-900/50 transition-colors group">
                <div className="col-span-8">
                  <div className="font-semibold text-zinc-100 text-sm sm:text-base">{exercise?.name || "Exercício"}</div>
                  <div className="flex flex-row flex-wrap gap-1 mt-1">
                    {exercise?.muscleGroups?.map((m: MuscleGroup, idx: number) => (
                      <span
                        key={idx}
                        className={`w-fit text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wide ${m.type === "primary" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                          m.type === "secondary" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                            "bg-zinc-800 text-zinc-400"
                          }`}
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 flex justify-center">
                  {editWorkout ? (
                    <input
                      type="number"
                      value={t.sets}
                      onChange={(e) => handleExerciseChange(i, "sets", Number(e.target.value))}
                      className="w-12 sm:w-16 bg-zinc-900 border border-zinc-700 rounded p-1 text-center text-white outline-none focus:border-emerald-500 text-sm"
                    />
                  ) : (
                    <span className="bg-zinc-800 px-2 sm:px-3 py-1 rounded text-zinc-300 font-medium text-sm">{t.sets}</span>
                  )}
                </div>

                <div className="col-span-2 flex justify-center items-center gap-1 sm:gap-2">
                  {editWorkout ? (
                    <input
                      type="number"
                      value={Array.isArray(t.reps) ? t.reps[0] ?? '' : t.reps}
                      onChange={(e) => handleExerciseChange(i, "reps", Number(e.target.value))}
                      className="w-12 sm:w-16 bg-zinc-900 border border-zinc-700 rounded p-1 text-center text-white outline-none focus:border-emerald-500 text-sm"
                    />
                  ) : (
                    <span className="bg-zinc-800 px-2 sm:px-3 py-1 rounded text-zinc-300 font-medium text-sm">{Array.isArray(t.reps) ? t.reps[0] : t.reps}</span>
                  )}

                  {editWorkout && (
                    <button onClick={() => handleRemoveExercise(i)} className="cursor-pointer text-zinc-600 hover:text-red-500 transition-colors ml-1 sm:ml-2">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {exerciseMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setExerciseMenuOpen(false)}
          />

          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 w-full max-w-md z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <Dumbbell className="text-emerald-500" size={24} />
              Novo Exercício
            </h2>

            <form
              onSubmit={handleAddNewExercise}
              className="flex flex-col gap-5 overflow-hidden flex-1"
            >
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase mb-2 block">
                  Nome do Exercício
                </label>
                <input
                  autoFocus
                  type="text"
                  placeholder="Ex: Supino Inclinado com Halteres"
                  value={newExerciseName}
                  onChange={(e) => setNewExerciseName(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase mb-2 block">
                  Unidade de Medida
                </label>
                <div className="flex gap-4 bg-zinc-950 border border-zinc-800 p-3 rounded-lg">
                  <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer hover:text-white transition-colors">
                    <input
                      type="radio"
                      value="kg"
                      checked={newExerciseUnit === 'kg'}
                      onChange={(e) => setNewExerciseUnit(e.target.value as "kg" | "placas")}
                      className="w-4 h-4 accent-emerald-500 bg-zinc-900 border-zinc-700"
                    />
                    <span className="font-semibold">Quilogramas (KG)</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer hover:text-white transition-colors">
                    <input
                      type="radio"
                      value="placas"
                      checked={newExerciseUnit === 'placas'}
                      onChange={(e) => setNewExerciseUnit(e.target.value as "kg" | "placas")}
                      className="w-4 h-4 accent-emerald-500 bg-zinc-900 border-zinc-700"
                    />
                    <span className="font-semibold">Placas</span>
                  </label>
                </div>
              </div>

              {/* SELEÇÃO DE MÚSCULOS */}
              <div className="flex flex-col flex-1 min-h-0">
                <label className="text-xs text-zinc-400 font-bold uppercase mb-2 block">
                  Músculos Recrutados
                </label>

                {/* LEGENDA DE CORES */}
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider mb-3 bg-zinc-950/50 p-2 rounded-lg border border-zinc-800/50">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" /> Primário
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" /> Secundário
                  </span>
                  <span className="flex items-center gap-1 text-zinc-300">
                    <div className="w-2 h-2 bg-zinc-400 rounded-full" /> Terciário
                  </span>
                </div>

                {/* LISTA SCROLLÁVEL DE MÚSCULOS */}
                <div className="overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  {muscleOptions.map((muscle) => {
                    const selected = selectedMuscles.find((m) => m.name === muscle);

                    return (
                      <div key={muscle} className="flex items-center justify-between bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg hover:border-zinc-700 transition-colors">
                        <span className="text-sm font-semibold text-zinc-300">{muscle}</span>

                        {/* BOTÕES P, S, T */}
                        <div className="flex gap-1.5">
                          {muscleTypes.map((type) => {
                            const active = selected?.type === type;

                            let btnClass = "bg-zinc-900 text-zinc-600 border-zinc-800 hover:bg-zinc-800";

                            if (active) {
                              if (type === "primary") btnClass = "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 scale-105";
                              else if (type === "secondary") btnClass = "bg-amber-500/20 text-amber-400 border-amber-500/50 scale-105";
                              else btnClass = "bg-zinc-700 text-zinc-100 border-zinc-500 scale-105";
                            }

                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => {
                                  setSelectedMuscles((prev) => {
                                    const exists = prev.find((m) => m.name === muscle);
                                    const typedValue = type as "primary" | "secondary" | "tertiary";

                                    if (exists && exists.type === typedValue) {
                                      return prev.filter(m => m.name !== muscle);
                                    }

                                    if (exists) {
                                      return prev.map((m) => m.name === muscle ? { ...m, type: typedValue } : m);
                                    }

                                    return [...prev, { name: muscle, type: typedValue }];
                                  });
                                }}
                                className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded cursor-pointer border transition-all ${btnClass}`}
                                title={type}
                              >
                                {type[0].toUpperCase()}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BOTÕES DE AÇÃO */}
              <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setExerciseMenuOpen(false);
                    setSelectedMuscles([]);
                  }}
                  className="px-5 py-2 text-zinc-400 hover:text-white font-semibold transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CRIAR TREINO */}
      {createWorkoutOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setCreateWorkoutOpen(false)} />

          {/* Mudei max-w-2xl para max-w-4xl para comportar os cards lado a lado */}
          <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-4xl rounded-2xl p-6 z-10 max-h-[90vh] overflow-y-auto shadow-2xl custom-scrollbar">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <Plus className="text-emerald-500" size={24} />
              Configurar Novo Treino
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase mb-1 block">Nome da Ficha</label>
                <input
                  placeholder="Ex: Treino Hipertrofia A/B/C"
                  value={newWorkoutName}
                  onChange={(e) => setNewWorkoutName(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase mb-1 block">Adicionar Dia</label>
                <div className="flex gap-2">
                  <input
                    placeholder="Ex: Peito e Tríceps"
                    id="dayInput"
                    className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500 transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.currentTarget;
                        if (input.value) { handleCreateWorkoutDay(input.value); input.value = ""; }
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById("dayInput") as HTMLInputElement;
                      if (input.value) { handleCreateWorkoutDay(input.value); input.value = ""; }
                    }}
                    className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-6 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {newWorkoutDays.map((day, dayIndex) => (
                <div key={dayIndex} className="flex flex-col md:flex-row gap-4 items-stretch">

                  <div className="flex-1 border border-zinc-800 rounded-xl p-4 bg-zinc-950/50">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-emerald-400 mb-3">{day.name}</h3>
                      <button onClick={() => handleRemoveWorkoutDay(dayIndex)} className="cursor-pointer hover:text-red-500 transition-colors duration-300">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {day.exercises.length === 0 ? (
                      <div className="p-4 border border-dashed border-zinc-800 rounded-lg text-center text-xs text-zinc-500">
                        Nenhum exercício adicionado ainda.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {day.exercises.map((ex, i) => (
                          <div key={i} className="text-sm text-zinc-300 flex items-center gap-2 bg-zinc-900 border border-zinc-800/50 px-3 py-2 rounded-lg">
                            <Check size={14} className="text-emerald-500 shrink-0" />
                            {allExercises.find(a => a._id === ex.exerciseId)?.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-80 border border-zinc-800 rounded-xl p-4 bg-zinc-900 flex flex-col max-h-64">
                    <div className="pb-4">
                      <input
                        className="bg-zinc-950 border border-zinc-700 focus:border-emerald-500 text-white text-sm font-semibold rounded-lg px-3 py-2 w-full outline-none transition-colors placeholder:text-zinc-500"
                        type="text"
                        placeholder="Buscar exercício..."
                        value={searchTerms[dayIndex] ?? ""}
                        onChange={(e) => setSearchTerms((prev) => ({ ...prev, [dayIndex]: e.target.value }))}
                      />
                    </div>

                    <h4 className="text-xs text-zinc-400 font-bold uppercase mb-3 flex items-center gap-2">
                      <Dumbbell size={14} className="text-emerald-500" />
                      Adicionar em: {day.name}
                    </h4>
                    <div className="overflow-y-auto pr-2 space-y-1 custom-scrollbar">
                      {allExercises
                        .filter((ex) =>
                          ex.name.toLowerCase().includes((searchTerms[dayIndex] ?? "").toLowerCase())
                        )
                        .map((ex) => (
                          <div
                            key={ex._id}
                            onClick={() => handleAddExerciseToNewWorkout(dayIndex, ex)}
                            className="cursor-pointer p-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg border border-transparent hover:border-zinc-700 transition-all flex justify-between items-center group"
                          >
                            <div className="flex flex-col">
                              <span>{ex.name}</span>
                              {ex.muscleGroups[0] && (
                                <span className="text-[10px] text-zinc-500 uppercase tracking-wide">
                                  {ex.muscleGroups[0].name}
                                </span>
                              )}
                            </div>
                            <button className="cursor-pointer w-6 h-6 flex items-center justify-center rounded bg-zinc-800 group-hover:bg-emerald-500 group-hover:text-zinc-950 text-zinc-500 transition-colors">
                              <Plus size={14} />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-zinc-800">
              <button onClick={() => setCreateWorkoutOpen(false)} className="cursor-pointer px-5 py-2 text-zinc-400 hover:text-white font-semibold transition-colors">
                Cancelar
              </button>
              <button onClick={handleCreateWorkout} className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-zinc-950 px-8 py-2 rounded-lg font-bold transition-colors">
                Salvar Treino
              </button>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}