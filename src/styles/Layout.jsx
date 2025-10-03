// src/Layout.jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-t from-slate-700 via-cyan-900 to-black text-gray-900">
      <main className="w-full max-w-screen">
        <Outlet />
      </main>
    </div>
  );
}
