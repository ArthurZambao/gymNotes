import apiClient from "../../http/api-client";
import { Exercise } from "./type";

export async function GetExercises() {
  const response = await apiClient.get("/exercises");
  return response.data;
}

export async function AddExercise(data: Omit<Exercise, "_id">) {
  const response = await apiClient.post("/exercises", data);
  return response.data;
}