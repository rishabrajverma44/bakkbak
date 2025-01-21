import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../AuthProvider/AuthProvider";

const LoginPage = () => {
  const { handleLoginSuccess, handleLoginFailure } = useAuth();

  return (
    <div>
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
};

export default LoginPage;
