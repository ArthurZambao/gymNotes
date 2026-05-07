import apiClient from "../../http/api-client";
import { WorkoutResponseDTO } from "./type";

export async function CreateWorkout(data: any) {
  const response = await apiClient.post("/workouts", data);
  return response.data;
}

export async function GetMyWorkouts(): Promise<WorkoutResponseDTO[]> {
  const response = await apiClient.get<WorkoutResponseDTO[]>(
    "/workouts/me"
  );
  return response.data;
}

export async function UpdateWorkout(
  id: string,
  data: Partial<WorkoutResponseDTO>
): Promise<WorkoutResponseDTO> {
  const response = await apiClient.patch<WorkoutResponseDTO>(
    `/workouts/${id}`,
    data
  );
  return response.data;
}

export async function DeleteWorkout(id: string) {
  const response = await apiClient.delete(`/workouts/${id}`);
  return response.data;
}