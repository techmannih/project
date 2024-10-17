import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import ImageUpload from "./components/Image/UploadImage";
import ImageGallery from "./components/Image/ImageGallery";
import ImageDetail from "./components/Image/ImageDetails";
import "./index.css";

const App = () => {
  const [token, setToken] = useState(Cookies.get("authToken") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("authToken"));
  const [userId, setUserId] = useState(Cookies.get("userId") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = Cookies.get("authToken");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setToken(storedToken);
          setUserId(decodedToken.id);
          setIsLoggedIn(true);
        } else {
          console.warn("Token expired, logging out...");
          handleLogout(false);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogout(false);
      }
    }
  }, []);

  const handleLogin = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
    setIsLoggedIn(true);

    Cookies.set("authToken", newToken, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("userId", newUserId, { expires: 7 });
  };

  const handleSignup = () => {
    setIsLoggedIn(false);
  };

  const handleLogout = (navigateToLogin = true) => {
    setToken("");
    setUserId("");
    setIsLoggedIn(false);
    Cookies.remove("authToken");
    Cookies.remove("userId");
    Cookies.remove("token");

    // Only navigate to login if requested, preventing issues during reload
    if (navigateToLogin) {
      navigate("/login");
    }
  };

  const renderProtectedRoute = (Component) => {
    console.log("Token:", token, "UserId:", userId);
    return isLoggedIn ? (
      <Component token={token} userId={userId} onLogout={handleLogout} />
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/upload" element={renderProtectedRoute(ImageUpload)} />
        <Route path="/gallery" element={renderProtectedRoute(ImageGallery)} />
        <Route path="/image/:id" element={renderProtectedRoute(ImageDetail)} />
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/gallery" : "/login"} />}
        />
      </Routes>

      {isLoggedIn && (
        <button onClick={() => handleLogout()} className="logout-button">
          Logout
        </button>
      )}
    </div>
  );
};

export default App;
