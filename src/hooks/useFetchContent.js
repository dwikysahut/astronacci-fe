import { useQuery } from "@tanstack/react-query";
import { fetchContent } from "../api/http";
import ToastHelper from "../utils/toast-helper";

export const useFetchContent = () => {
  return useQuery({
    queryKey: ["fetch-content"],
    queryFn: fetchContent,
    onSuccess: () => {
      // You can optionally handle successful fetch here
    },
    onError: (error) => {
      ToastHelper.error("Gagal mengambil konten");
      console.error("Fetch content error:", error);
    },
    retry: false,
  });
};
