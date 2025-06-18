import React from "react";
import { Routes, Route } from "react-router";
import App from "../App";
import ChatPage from "../components/ChatPage";

const AppRoutes = () => {
    return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/test" element={<h1>This is a testing page for Routes</h1>} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    );
};

export default AppRoutes;