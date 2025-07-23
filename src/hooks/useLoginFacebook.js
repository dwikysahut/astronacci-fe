import { useMutation } from "@tanstack/react-query";
import { loginFacebook } from "../api/http";
import ToastHelper from "../utils/toast-helper";

export const useLoginWithFacebook = () => {
  return useMutation({
    mutationFn: (tokenId) => loginFacebook(tokenId),
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
