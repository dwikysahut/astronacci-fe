import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/http";
export default function useFetchMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
  });
}
