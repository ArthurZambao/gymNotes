import apiClient from "../../http/api-client";
import { SaveWorkoutLogDTO } from "./types";

export async function getWorkoutLogsByMonth(month: string) {
  try {
    const response = await apiClient.get('/workout-logs', {
      params: { month }
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