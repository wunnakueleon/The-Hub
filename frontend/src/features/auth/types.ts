export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  github?: string;
  bio?: string;
  skills?: string[];
}
