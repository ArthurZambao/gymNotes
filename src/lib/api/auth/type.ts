export interface LoginPayload {
  id?: string;
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  name?: string;
  weight?: number;
  height?: number;
  biotype?: string;
  avatar?: string;
}

export interface registerUserPayload{
  email: string;
  password:string;
  name:string;
}
