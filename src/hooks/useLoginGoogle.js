import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "../api/http";
import ToastHelper from "../utils/toast-helper";

export const useLoginWithGoogle = () => {
  return useMutation({
    mutationFn: (tokenId) => loginWithGoogle(tokenId),
    onSuccess: () => {
      ToastHelper.success("Login successful!");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      ToastHelper.danger("Login failed. Please try again.");
    },
    retry: false,
  });
};
