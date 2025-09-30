// src/Layout.jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-t from-cyan-600 to-cyan-800 text-gray-900">
      <main className="w-full max-w-screen">
        <Outlet />
      </main>
    </div>
  );
}
