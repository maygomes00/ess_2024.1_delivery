export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

export interface LoginState {
  user: User | null;
}

export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };
