import { apiClient } from "@/lib/api/client";

import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  SocialProvider,
} from "../types/auth.types";

export function login(payload: LoginPayload) {
  return apiClient.post("/api/auth/login", payload);
}

export function register(payload: RegisterPayload) {
  return apiClient.post("/api/auth/register", payload);
}

export function forgotPassword(payload: ForgotPasswordPayload) {
  return apiClient.post("/api/auth/forgot-password", payload);
}

export function resetPassword(payload: ResetPasswordPayload) {
  return apiClient.post("/api/auth/reset-password", payload);
}

export function verifyEmail(token: string) {
  return apiClient.post("/api/auth/verify-email", { token });
}

export function logout() {
  return apiClient.post("/api/auth/logout");
}

export function refreshToken() {
  return apiClient.post("/api/auth/refresh");
}

export function startSocialLogin(provider: SocialProvider) {
  return apiClient.post(`/api/auth/social/${provider}`);
}
