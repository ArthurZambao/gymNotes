export interface ExerciseLogPayload {
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface SaveWorkoutLogDTO {
  workoutId: string;
  dayName: string;
  date: string;
  exercises: ExerciseLogPayload[];
}
