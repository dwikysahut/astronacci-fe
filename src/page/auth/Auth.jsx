import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { useLoginWithGoogle } from "../../hooks/useLoginGoogle";
import { useManualAuth } from "../../hooks/useManualAuth";
import useFetchMe from "../../hooks/useFetchMe";

import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import FacebookLoginButton from "../../components/FacebookButton";

const Auth = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useFetchMe();
  const { mutate } = useLoginWithGoogle();
  const { mutationLogin, mutationRegister } = useManualAuth();
  const [mode, setMode] = useState("login"); // "login" or "register"

  useEffect(() => {
    if (!isLoading && user) {
      console.log("User already authenticated:", user);
      navigate("/"); // ✅ if already authenticated, redirect to home
    }
  }, [user, isLoading, navigate]);

  const handleSuccess = (credentialResponse) => {
    const tokenId = credentialResponse.credential;
    mutate(
      { tokenId },
      {
        onSuccess: () => {
          navigate("/"); // ✅ after login, redirect to home
        },
      }
    );
  };

  const handleError = () => {
    console.error("Login Google Failed");
  };

  const handleManualRegister = (data) => {
    mutationRegister.mutate(data, {
      onSuccess: () => {
        setMode("login");
      },
    });
  };

  const handleManualLogin = (data) => {
    mutationLogin.mutate(data, {
      onSuccess: () => {
        navigate("/"); // ✅ after manual login, redirect
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6">
      <h3 className="text-2xl font-semibold">{mode === "login" ? "Login" : "Register"}</h3>

      <div className="flex w-96">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 p-2 rounded ${mode === "login" ? "bg-blue-500 text-white" : "bg-white "}`}
        >
          Login
        </button>
        <button
          onClick={() => setMode("register")}
          className={`flex-1 p-2 rounded ${mode === "register" ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          Register
        </button>
      </div>

      <div className="space-y-4 bg-white p-6 rounded shadow w-96">
        {mode === "login" ? (
          <LoginForm onLogin={handleManualLogin} />
        ) : (
          <RegisterForm onRegister={handleManualRegister} />
        )}

        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        <FacebookLoginButton />
      </div>
    </div>
  );
};

export default Auth;
