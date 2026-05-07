
export type MuscleType = "primary" | "secondary" | "tertiary";

export interface MuscleGroup {
  _id?: string;
  name: string;
  type: MuscleType;
}


export interface Exercise {
  _id: string;
  name: string;
  weightUnit: "kg" | "placas";
  muscleGroups: MuscleGroup[];


  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}