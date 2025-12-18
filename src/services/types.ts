export interface Teacher {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  organization?: string;
}

export interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: 'student' | 'teacher';
  teacher_id?: string;
  age: number;
  gender: string;
  organization: string;
  profile_image?: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  };
}
