export interface MuscleGroup {
  name: string;
  type: "primary" | "secondary" | "tertiary";
}

export interface Exercise {
  _id: string;
  name: string;
  muscleGroups?: MuscleGroup[];
}

export interface WorkoutExercise {
  exerciseId: string | Exercise;
  sets: number;
  reps: number | number[];
}