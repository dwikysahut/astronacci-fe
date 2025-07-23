import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/http";
import ToastHelper from "../utils/toast-helper";

export const useManualAuth = () => {
  const mutationRegister = useMutation({
    mutationFn: (data) => register(data),
    onSuccess: () => {
      ToastHelper.success("Register successful!");
    },
    onError: (error) => {
      console.error("Register failed:", error);
      ToastHelper.danger(error.message || "Login failed. Please try again.");
    },
    retry: false,
  });
  const mutationLogin = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: () => {
      ToastHelper.success("Login successful!");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      ToastHelper.danger(error.message || "Login failed. Please try again.");
    },
    retry: false,
  });
  return { mutationRegister, mutationLogin };
};
