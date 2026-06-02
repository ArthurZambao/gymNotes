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
  const [newAvatar, setNewAvatar] = useState("");
  const [pictureMenu, openPictureMenu] = useState(false);
  const [newExerciseUnit, setNewExerciseUnit] = useState<"kg" | "placas">("kg");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workouts, setWorkouts] = useState<WorkoutResponseDTO[]>([]);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editWorkout, setEditWorkout] = useState(false);
  const [afirmationOpen, setAfirationOpen] = useState(false);
  const [deleteWorkout, setDeleteWorkout] = useState(false);
  const [exerciseMenuOpen, setExerciseMenuOpen] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [createWorkoutOpen, setCreateWorkoutOpen] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
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
  const editedExercises = currentDay?.exercises || [];
  const canAddExercise = currentWorkout?.days?.length > 0;




  function handleDeleteWorkout() {
    if (!currentWorkout) return;
    setAfirationOpen(true);
  }


  async function handleConfirmDeleteWorkout() {
    if (!currentWorkout) return;
    try {
      await DeleteWorkout(currentWorkout._id);
      const updated = await GetMyWorkouts();
      setWorkouts(updated);
      toast.success("Treino excluído com sucesso!");
      setEditWorkout(false);
      setSelectedDayIndex(0);
      setAfirationOpen(false);
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
      setNewAvatar(user.avatar || "");
    }
  }, [user]);



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
        startDate: currentDate,
        expirationDate: expirationDate ? new Date(expirationDate) : undefined,
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

  async function handleUpdateAvatar(picUrl: string) {
    try {
      await updateUserRequest(user!.id, { avatar: picUrl });
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...stored, avatar: picUrl }));
      openPictureMenu(false);
      toast.success("Avatar atualizado com sucesso!");
      window.location.reload();
    } catch {
      toast.error("Erro ao atualizar avatar");
    };
  };

  function handleCreateWorkoutDay(dayName: string) {
    setNewWorkoutDays((prev) => [
      ...prev,
      { name: dayName, exercises: [] },
    ]);
  };

  function handleAddExerciseToNewWorkout(dayIndex: number, exercise: Exercise) {
    const updated = [...newWorkoutDays];
    const sets = 3;

    updated[dayIndex].exercises.push({
      exerciseId: exercise._id || "",
      sets,
      reps: Array(sets).fill(0),
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
      reps: Array(3).fill(10),
      order: currentDay.exercises.length,
    });
    setWorkouts(updated);
  }



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

    const exercise =
      updated[0].days[selectedDayIndex].exercises[index];

    if (field === "sets") {
      exercise.sets = value;


      exercise.reps = Array(value).fill(
        exercise.reps?.[0] || 10
      );
    }

    if (field === "reps") {
      exercise.reps = Array(exercise.sets).fill(value);
    }

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



  function handleExerciseList() {
    setExerciseMenuOpen(true);
  }

  function handleShowEditWorkout() {
    setEditWorkout(!editWorkout);
  }



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



  return {
    user,
    isEditing,
    setIsEditing,
    setWeight,
    setHeight,
    setNewAvatar,
    newAvatar,
    handleUpdate,
    workouts,
    allExercises,
    afirmationOpen,
    setAfirationOpen,
    handleDeleteWorkout,
    handleConfirmDeleteWorkout,
    editWorkout,
    setEditWorkout,
    exerciseMenuOpen,
    setExerciseMenuOpen,
    selectedDayIndex,
    createWorkoutOpen,
    setCreateWorkoutOpen,
    newWorkoutName,
    setNewWorkoutName,
    expirationDate,
    setExpirationDate,
    currentDate,
    pictureMenu,
    openPictureMenu,
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
    handleRemoveWorkoutDay,
    handleUpdateAvatar,
  };
}