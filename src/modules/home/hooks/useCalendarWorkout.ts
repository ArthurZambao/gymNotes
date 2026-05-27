import { DeleteWorkoutLog, getWorkoutLogsByMonth, saveWorkoutLog } from "@/src/lib/api/workoutsLog";
import { ExerciseLogPayload } from "@/src/lib/api/workoutsLog/types";
import { useState, useEffect, useMemo } from "react";
import { useCurrentWorkout } from "./useCurrentWorkout";
import { toast } from "sonner";


export function useCalendarWorkout() {
  const { workouts, allExercises } = useCurrentWorkout();
  const activeWorkout = workouts[0];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [afirmationOpen, setAfirationOpen] = useState(false);
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

  const fetchLogs = async (noCache = false) => {
    setIsLoading(true);
    const data = await getWorkoutLogsByMonth(mesAtualStr, noCache);
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
    if (!currentLog) {
      setSelectedWorkoutDay("");
      setExerciseForms([]);
    }
  }, [selectedDate]);

  const handleSelectWorkoutDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dayName = e.target.value;
    setSelectedWorkoutDay(dayName);

    const dayData = activeWorkout?.days.find((d: any) => d.name === dayName);
    if (dayData) {
      const initialForms = dayData.exercises.map((ex: any) => {
        const sets = ex.sets || 3;
        const existingReps = ex.reps;
        // Ensure reps is always an array with exactly `sets` entries
        const baseReps = Array.isArray(existingReps) ? existingReps : [existingReps || 0];
        const reps = Array.from({ length: sets }, (_, i) => baseReps[i] ?? baseReps[0] ?? 0);
        return {
          exerciseId: typeof ex.exerciseId === 'object' ? ex.exerciseId._id : ex.exerciseId,
          sets,
          reps,
          weight: 0,
        };
      });
      setExerciseForms(initialForms);
    } else {
      setExerciseForms([]);
    }
  };

  function handleDeleteWorkoutLog() {
    if (!currentLog) return;
    setAfirationOpen(true);
  }

  async function handleConfirmDeleteWorkoutLog() {
    if (!currentLog) return;
    try {
      await DeleteWorkoutLog(currentLog._id);
      await fetchLogs(true);
      setAfirationOpen(false);
      setSelectedWorkoutDay("");
      toast.success("Registro de treino excluído com sucesso!");
      setExerciseForms([]);
    } catch (err) {
      console.error("Erro ao excluir log", err);
      toast.error("Erro ao excluir registro de treino!");
    }
  }

  const handleFormChange = (
    index: number,
    field: 'sets' | 'reps' | 'weight',
    value: string | number,
    repIndex?: number
  ) => {
    const newForms = [...exerciseForms];

    if (field === 'sets') {
      const sets = Number(value);

      newForms[index].sets = sets;

      newForms[index].reps = Array(sets).fill(
        newForms[index].reps?.[0] || 10
      );
    }

    else if (field === 'reps' && repIndex !== undefined) {
      newForms[index].reps[repIndex] = Number(value);
    }

    else if (field === 'weight') {
      newForms[index].weight = Number(value);
    }

    setExerciseForms(newForms);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
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
      await fetchLogs(true);
      console.log("Treino salvo com sucesso!", payload);
    } catch (error) {
      console.error("Falha ao salvar treino", error);
      alert("Erro ao salvar o treino. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const getExerciseName = (id: string | { _id: string; name: string }) => {
    if (typeof id === 'object' && id !== null) return id.name;
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
    prevMonth,
    month,
    nextMonth,
    afirmationOpen,
    setAfirationOpen,
    handleConfirmDeleteWorkoutLog,
    handleDeleteWorkoutLog,
  };
}