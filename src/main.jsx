import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./styles/Layout.jsx";
import App from "./pages/App.jsx";
import AddReport from "./pages/AddReport.jsx";
import Reports from "./pages/ViewReport.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddReport />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
