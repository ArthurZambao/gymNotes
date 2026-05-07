import { getWorkoutLogsByMonth, saveWorkoutLog } from "@/src/lib/api/workoutsLog";
import { ExerciseLogPayload } from "@/src/lib/api/workoutsLog/types";
import { useState, useEffect, useMemo } from "react";
import { useCurrentWorkout } from "./useCurrentWorkout";


export function useCalendarWorkout() {
  const { workouts, allExercises } = useCurrentWorkout();
  const activeWorkout = workouts[0];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [logsDoMes, setLogsDoMes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkoutDay, setSelectedWorkoutDay] = useState<string>("");
  const [exerciseForms, setExerciseForms] = useState<ExerciseLogPayload[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mesAtualStr = `${year}-${String(month + 1).padStart(2, "0")}`;

  const fetchLogs = async () => {
    setIsLoading(true);
    const data = await getWorkoutLogsByMonth(mesAtualStr);
    setLogsDoMes(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, [mesAtualStr]);

  const currentLog = useMemo(() => {
    return logsDoMes.find((log) => {
      const logDate = new Date(log.date);
      return (
        logDate.getDate() === selectedDate.getDate() &&
        logDate.getMonth() === selectedDate.getMonth() &&
        logDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [logsDoMes, selectedDate]);

  useEffect(() => {
    setSelectedWorkoutDay("");
    setExerciseForms([]);
  }, [selectedDate]);

  const handleSelectWorkoutDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dayName = e.target.value;
    setSelectedWorkoutDay(dayName);

    const dayData = activeWorkout?.days.find((d: any) => d.name === dayName);
    if (dayData) {
      const initialForms = dayData.exercises.map((ex: any) => ({
        exerciseId: typeof ex.exerciseId === 'object' ? ex.exerciseId._id : ex.exerciseId,
        sets: ex.sets || 0,
        reps: ex.reps || 0,
        weight: 0,
      }));
      setExerciseForms(initialForms);
    } else {
      setExerciseForms([]);
    }
  };

  const handleFormChange = (index: number, field: 'sets' | 'reps' | 'weight', value: string | number) => {
    const newForms = [...exerciseForms];
    newForms[index][field] = Number(value);
    setExerciseForms(newForms);
  };

  const handleSaveLog = async () => {

    if (!activeWorkout || !selectedWorkoutDay) return;

    setIsSaving(true);
    try {
      const payload = {
        workoutId: activeWorkout._id,
        dayName: selectedWorkoutDay,
        date: selectedDate.toISOString(),
        exercises: exerciseForms,
      };

      await saveWorkoutLog(payload);
      await fetchLogs();
      setSelectedWorkoutDay("");
    } catch (error) {
      console.error("Falha ao salvar treino", error);
      alert("Erro ao salvar o treino. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const getExerciseName = (id: string) => {
    if (typeof id === 'object' && (id as any).name) return (id as any).name;
    return allExercises.find((ex) => ex._id === id)?.name || "Exercício Desconhecido";
  };

  const getExerciseUnit = (id: string) => {
    const exerciseId = typeof id === 'object' ? (id as any)._id : id;
    const exercise = allExercises.find((ex) => ex._id === exerciseId);
    return exercise?.weightUnit === 'placas' ? 'Pl' : 'kg';
  };

  return {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    logsDoMes,
    isLoading,
    selectedWorkoutDay,
    setSelectedWorkoutDay,
    exerciseForms,
    setExerciseForms,
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
  };
}