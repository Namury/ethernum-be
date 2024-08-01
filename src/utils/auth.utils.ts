export interface UserToken {
  id: number;
  username: string | null;
  email: string | null;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface VerifyUserRequest {
  email: string;
  verifyToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  resetToken: string;
}

export interface LoginResponse {
  token: string;
  name: string|null;
  username: string;
  email: string;
}

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
