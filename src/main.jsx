import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App.jsx";
import AddReport from "./pages/AddReport.jsx";
import Reports from "./pages/ViewReport.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/add" element={<AddReport />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  </BrowserRouter>
);
