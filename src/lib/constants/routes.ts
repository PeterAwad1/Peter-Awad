export const routes = {
  home: "/",
  about: "/about",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
} as const;

export const publicSitemapPaths = [routes.home, routes.about] as const;
