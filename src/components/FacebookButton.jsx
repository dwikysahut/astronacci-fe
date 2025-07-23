import React from "react";
import useFacebookSdk from "../hooks/useFacebookSdk";
import { useLoginWithFacebook } from "../hooks/useloginFacebook";

const FacebookLoginButton = () => {
  useFacebookSdk(); // simpan APP ID di .env
  const { mutate } = useLoginWithFacebook();

  const handleLogin = () => {
    if (!window.FB) return;

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          loginWithFacebook(accessToken);
        } else {
          console.log("User batal login");
        }
      },
      { scope: "email" }
    );
  };

  const loginWithFacebook = async (accessToken) => {
    mutate({ accessToken });
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
    >
      Sign in with Facebook
    </button>
  );
};

export default FacebookLoginButton;
