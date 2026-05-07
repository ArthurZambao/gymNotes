import { updateUserRequest } from "@/src/lib/api/auth";
import { GetExercises, AddExercise } from "@/src/lib/api/exercises";
import { Exercise } from "@/src/lib/api/exercises/type";
import { CreateWorkout, DeleteWorkout, GetMyWorkouts, UpdateWorkout } from "@/src/lib/api/workouts";
import { WorkoutResponseDTO } from "@/src/lib/api/workouts/type";
import { useUser } from "@/src/shared/hooks/useUser";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useCurrentWorkout() {
  const user = useUser();
  const [newExerciseUnit, setNewExerciseUnit] = useState<"kg" | "placas">("kg");
  const [workouts, setWorkouts] = useState<WorkoutResponseDTO[]>([]);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editWorkout, setEditWorkout] = useState(false);
  const [exerciseMenuOpen, setExerciseMenuOpen] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [createWorkoutOpen, setCreateWorkoutOpen] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [selectedMuscles, setSelectedMuscles] = useState<
    { name: string; type: "primary" | "secondary" | "tertiary" }[]
  >([]);
  const [newWorkoutDays, setNewWorkoutDays] = useState<
    { name: string; exercises: any[] }[]
  >([]);

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  const currentWorkout = workouts?.[0];
  const currentDay = currentWorkout?.days?.[selectedDayIndex];

  // CONSTANTE QUE FALTAVA PARA A RENDERIZAÇÃO DA TABELA
  const editedExercises = currentDay?.exercises || [];
  const canAddExercise = currentWorkout?.days?.length > 0;

  // ---------------- EFFECTS ----------------

  async function handleDeleteWorkout() {
    if (!currentWorkout) return;
    console.log("Deletando treino com ID:", currentWorkout._id);
    try {
      await DeleteWorkout(currentWorkout._id);

      const updated = await GetMyWorkouts();
      setWorkouts(updated);

      toast.success("Treino excluído com sucesso!");
      setEditWorkout(false);
      setSelectedDayIndex(0);

    } catch (err) {
      toast.error("Erro ao excluir treino");
    }
  }

  function handleRemoveWorkoutDay(indexToRemove: number) {
    setNewWorkoutDays((prevDays) => prevDays.filter((_, index) => index !== indexToRemove));
  }

  async function handleUpdate() {
    if (!user) return;

    const userId = (user as any)._id || (user as any).id;

    try {
      await updateUserRequest(userId, {
        weight,
        height,
      });
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      const newUser = { ...stored, weight, height };
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
      window.location.reload();

    } catch (err) {
      toast.error("Erro ao atualizar as medidas");
    }
  }

  useEffect(() => {
    async function fetchExercises() {
      const data = await GetExercises();
      setAllExercises(data);
    }
    fetchExercises();
  }, []);

  useEffect(() => {
    async function fetchWorkouts() {
      const data = await GetMyWorkouts();
      setWorkouts(data);
    }
    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (user) {
      setWeight(user.weight || 0);
      setHeight(user.height || 0);
    }
  }, [user]);

  // ---------------- CREATE WORKOUT ----------------

  async function handleCreateWorkout() {
    try {
      if (!newWorkoutName || newWorkoutDays.length === 0) {
        toast.error("Preencha nome e dias");
        return;
      }
      console.log(newWorkoutName, newWorkoutDays);
      await CreateWorkout({
        name: newWorkoutName,
        days: newWorkoutDays,
      });

      toast.success("Treino criado");

      setCreateWorkoutOpen(false);
      setNewWorkoutName("");
      setNewWorkoutDays([]);

      const updated = await GetMyWorkouts();
      setWorkouts(updated);
    } catch (err) {
      toast.error("Erro ao criar treino");
    }
  }

  function handleCreateWorkoutDay(dayName: string) {
    setNewWorkoutDays((prev) => [
      ...prev,
      { name: dayName, exercises: [] },
    ]);
  }

  function handleAddExerciseToNewWorkout(dayIndex: number, exercise: Exercise) {
    const updated = [...newWorkoutDays];

    updated[dayIndex].exercises.push({
      // CORRIGIDO: Agora enviamos apenas a string do ID
      exerciseId: exercise._id || "",
      sets: 3,
      reps: 10,
      order: updated[dayIndex].exercises.length,
    });

    setNewWorkoutDays(updated);
  }

  function handleAddExercise(exercise: Exercise) {
    if (!currentDay) return;

    const updated = [...workouts];

    updated[0].days[selectedDayIndex].exercises.push({
      exerciseId: { _id: exercise._id || "", name: exercise.name || "" },
      sets: 3,
      reps: 10,
      order: currentDay.exercises.length,
    });
    setWorkouts(updated);
  }

  // ---------------- WORKOUT EDIT ----------------

  function handleRemoveExercise(index: number) {
    const updated = [...workouts];

    updated[0].days[selectedDayIndex].exercises =
      updated[0].days[selectedDayIndex].exercises.filter(
        (_, i) => i !== index
      );

    setWorkouts(updated);

    toast.success("Exercício removido");
  }

  function handleRemoveDay(dayIndex: number) {
    const updated = [...workouts];

    updated[0].days = updated[0].days.filter(
      (_, i) => i !== dayIndex
    );

    setWorkouts(updated);

    const newIndex = Math.max(0, selectedDayIndex - 1);
    setSelectedDayIndex(newIndex);

    toast.success("Dia removido");
  }

  function handleSelectDay(index: number) {
    setSelectedDayIndex(index);
  }

  function handleExerciseChange(
    index: number,
    field: "sets" | "reps",
    value: number
  ) {
    const updated = [...workouts];

    updated[0].days[selectedDayIndex].exercises[index][field] = value;

    setWorkouts(updated);
  }

  async function handleSaveWorkout() {
    try {
      await UpdateWorkout(workouts[0]._id, workouts[0]);

      toast.success("Treino salvo");
      setEditWorkout(false);
    } catch (err) {
      toast.error("Erro ao salvar treino");
    }
  }

  // ---------------- UI CONTROLS FALTANTES ----------------

  function handleExerciseList() {
    setExerciseMenuOpen(true);
  }

  function handleShowEditWorkout() {
    setEditWorkout(!editWorkout);
  }

  // ---------------- EXERCISE ----------------

  async function handleAddNewExercise(e: React.FormEvent) {
    e.preventDefault();

    try {
      const newEx = await AddExercise({
        name: newExerciseName,
        muscleGroups: selectedMuscles,
        weightUnit: newExerciseUnit,
      });

      setAllExercises((prev) => [...prev, newEx]);

      setSelectedMuscles([]);
      setNewExerciseName("");
      setNewExerciseUnit("kg");
      setExerciseMenuOpen(false);

      toast.success("Exercício criado");
    } catch {
      toast.error("Erro ao criar exercício");
    }
  }

  // ---------------- RETURN ----------------

  return {
    user,
    isEditing,
    setIsEditing,
    setWeight,
    setHeight,
    handleUpdate,
    workouts,
    allExercises,
    editWorkout,
    setEditWorkout,
    exerciseMenuOpen,
    setExerciseMenuOpen,
    selectedDayIndex,
    createWorkoutOpen,
    setCreateWorkoutOpen,
    newWorkoutName,
    setNewWorkoutName,
    newWorkoutDays,
    newExerciseUnit,
    setNewExerciseUnit,
    weight,
    height,
    selectedMuscles,
    setSelectedMuscles,
    canAddExercise,
    editedExercises,
    newExerciseName,
    setNewExerciseName,
    handleExerciseList,
    handleShowEditWorkout,
    handleRemoveExercise,
    handleRemoveDay,
    handleSelectDay,
    handleExerciseChange,
    handleSaveWorkout,
    handleCreateWorkout,
    handleCreateWorkoutDay,
    handleAddExerciseToNewWorkout,
    handleAddNewExercise,
    handleAddExercise,
    handleDeleteWorkout,
    handleRemoveWorkoutDay,
  };
}