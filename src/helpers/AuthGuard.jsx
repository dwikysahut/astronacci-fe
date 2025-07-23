import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetchMe from "../hooks/useFetchMe";

export default function AuthGuard({ children }) {
  const { isLoading, error } = useFetchMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token"); // optional: clear token
        navigate("/auth");
      }
    }
  }, [isLoading, error, navigate]);

  if (isLoading) return <p>Loading...</p>;

  return children;
}
