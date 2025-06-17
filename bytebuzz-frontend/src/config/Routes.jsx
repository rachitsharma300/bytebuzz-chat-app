import React from "react";
import { Routes, Route } from "react-router";
import App from "../App";

const AppRoutes = () => {
    return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/test" element={<h1>This is a testing page for Routes</h1>} />
    </Routes>
    );
};

export default AppRoutes;