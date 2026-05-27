import apiClient from "../../http/api-client";
import { SaveWorkoutLogDTO } from "./types";

export async function getWorkoutLogsByMonth(month: string, noCache = false) {
  try {
    const response = await apiClient.get('/workout-logs', {
      params: { month },
      cache: noCache ? false : undefined,
    });
    return response.data;
  } catch (error) {
    console.error("Erro em getWorkoutLogsByMonth:", error);
    return [];
  }
}

export async function saveWorkoutLog(data: SaveWorkoutLogDTO) {
  try {
    const response = await apiClient.post('/workout-logs', data);
    return response.data;
  } catch (error) {
    console.error("Erro em saveWorkoutLog:", error);
    throw error;
  }
}

export async function DeleteWorkoutLog(id: string) {
  const response = await apiClient.delete(`/workout-logs/${id}`);
  return response.data;
}