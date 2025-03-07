import "./i18n"; // Import your i18n.js file here
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Homepage from "./pages/student/Homepage";
import AdminHomepage from "./pages/admin/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student" element={<Homepage />} />
        <Route path="/admin" element={<AdminHomepage />} />
      </Routes>
    </Router>
  );
}

export default App;
