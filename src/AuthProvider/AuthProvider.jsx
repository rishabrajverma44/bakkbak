import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    try {
      const { credential } = response;
      const userDetails = jwtDecode(credential);
      setUser(userDetails);
      localStorage.setItem("user", JSON.stringify(userDetails));
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      handleLoginSuccess,
      handleLoginFailure,
      handleLogout,
    }),
    [user, loading]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default AuthProvider;
