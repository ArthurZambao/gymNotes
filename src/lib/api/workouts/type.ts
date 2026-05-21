export type CreateWorkoutDTO = {
  name: string;

  days: {
    name?: string;
    exercises: {
      exerciseId: string;
      sets: number;
      reps: number[];
      order: number;
    }[];
  }[];
};

export type WorkoutResponseDTO = {
  _id: string;
  name: string;

  days: {
    name?: string;
    exercises: {
      exerciseId: { _id: string; name: string };
      sets: number;
      reps: number[];
      order: number;
    }[];
  }[];
};