export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  id: string;
  email: string;
  token: string;
}

export interface SignupFormData extends LoginFormData {
  name: string;
}
