import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import AdminPage from "./page/AdminPage";
import AdminDashboardPage from "./page/AdminDashboardPage";
import AddsPage from "./page/AddsPage";
import SliderPage from "./page/SliderPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/adds" element={<AddsPage />} />
        <Route path="/slider" element={<SliderPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
