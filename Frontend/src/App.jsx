import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import AdminPage from "./page/AdminPage";
import AddsPage from "./page/AddsPage";
import SliderPage from "./page/SliderPage";
import AllAdds from "./page/AllAdds";
import LoginPage from "./page/LoginPage";
import OTPPage from "./page/OTPPage";
import SettingsPage from "./page/SettingsPage";
import MyAddsPage from "./page/MyAddsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-adds" element={<AllAdds />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/my-account/settings" element={<SettingsPage />} />
        <Route path="/my-account/my-adds" element={<MyAddsPage />} />
        <Route path="/admin-login" element={<AdminPage />} />
        <Route path="/admin-dashboard/adds" element={<AddsPage />} />
        <Route path="/admin-dashboard/slider" element={<SliderPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
