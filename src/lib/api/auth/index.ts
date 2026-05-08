import apiClient from "../../http/api-client";
import { LoginPayload, registerUserPayload, UpdateUserPayload } from "./type";

export async function loginRequest(data: LoginPayload) {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
}

/**
 * Função para atualizar dados do usuário
 * @param id - O ID do usuário a ser atualizado
 * @param data - Objeto com os campos que serão alterados
 */
export async function updateUserRequest(id: string, data: UpdateUserPayload) {
  const response = await apiClient.patch(`/users/me`, data);
  return response.data;
}

/**
 * Alternativa: Se o seu back-end usar o token para saber 
 * quem é o usuário atual, você nem precisa passar o ID.
 */
export async function updateMeRequest(data: UpdateUserPayload) {
  const response = await apiClient.patch("/users/me", data, {
    cache: false,
  });
  return response.data;
}

export async function registerUser(data: registerUserPayload) {
  const response = await apiClient.post("/users", data)
  return response.data;
}

export async function logoutRequest() {
  await apiClient.post("/auth/logout");
  localStorage.removeItem("user");
}