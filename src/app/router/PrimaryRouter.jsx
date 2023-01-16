import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "../../setup/context/UserContext";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import Canva from "../components/Canva/Canva";
import ProtectedRoute from "../components/ProtectedRoutes";

const PrimaryRouter = () => {
  const [currentColor, setCurrentColor] = useState("#4287f5");
  const [pixelColor, setPixelColor] = useState([]);

  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Canva
                  currentColor={currentColor}
                  setCurrentColor={setCurrentColor}
                  pixelColor={pixelColor}
                  setPixelColor={setPixelColor}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default PrimaryRouter;
