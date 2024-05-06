import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import AdminPage from "./page/AdminPage";
import SliderPage from "./page/SliderPage";
import AllAdds from "./page/AllAdds";
import LoginPage from "./page/LoginPage";
import OTPPage from "./page/OTPPage";
import SettingsPage from "./page/SettingsPage";
import MyAddsPage from "./page/MyAddsPage";
import CreateAddPage from "./page/CreateAddPage";
import AddByKeyword from "./page/AddByKeyword";
import DetailsPage from "./page/DetailsPage";
import ErrorPage from "./page/ErrorPage";
import AdminAddsPage from "./page/AdminAddsPage";

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
        <Route path="/my-account/create-add" element={<CreateAddPage />} />
        <Route path="/admin-login" element={<AdminPage />} />
        <Route path="/admin-dashboard/adds" element={<AdminAddsPage />} />
        <Route path="/admin-dashboard/slider" element={<SliderPage />} />
        <Route path="/by-keyword/:Keyword" element={<AddByKeyword />} />
        <Route path="/details/:addID" element={<DetailsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
