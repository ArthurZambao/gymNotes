export interface LoginPayload {
  id?: string;
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  weight?: number;
  height?: number;
}

export interface registerUserPayload{
  email: string;
  password:string;
  name:string;
}
