import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./Pages/LoginPage";
import AuthProvider from "./AuthProvider/AuthProvider";
import { PrivateRoute, PublicRoute } from "./Routes/Route";
import VideoReels from "./Components/VideoReels";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<PublicRoute restricted={true} element={<LoginPage />} />}
          />
          <Route
            path="/reels"
            element={<PrivateRoute element={<VideoReels />} />}
          />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
