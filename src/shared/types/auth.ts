export interface User {
  id: string;
  name: string;
  email: string;
  weight: number;
  height: number;
  biotype?: string;
  avatar: string;
}

export interface AuthContextData {
  user: User | null;
  signed: boolean;
  login(userData: User): void;
  logout(): void;
}