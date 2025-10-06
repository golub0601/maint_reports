// src/Layout.jsx
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pageInfo, setPageInfo] = useState({
    title: "Dashboard",
    shift: "Smjena A",
    showBack: false,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-slate-800 via-cyan-950 to-cyan-900 text-white">
      {/* 🔹 Top Bar */}
      <header className="w-full flex justify-between items-center backdrop-blur-lg bg-black/30 border-b border-black/20 px-6 py-4 shadow-lg fixed top-0 left-0 right-0 z-20">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          {pageInfo.showBack && (
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg text-sm font-medium text-lime-300 transition"
            >
              ← Nazad na panel
            </button>
          )}
        </div>

        {/* Centered Title */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white text-center absolute left-1/2 transform -translate-x-1/2">
          {pageInfo.title || "Dashboard"}
        </h1>

        {/* Right side — Shift & Clock */}
        <div className="flex flex-col text-right text-white/70 text-sm">
          <p>{pageInfo.shift || "Smjena ?"}</p>
          <p>{currentTime.toLocaleTimeString("sr-RS")}</p>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 pt-20 px-4 sm:px-8 overflow-y-auto">
        <Outlet context={{ setPageInfo }} />
      </main>
    </div>
  );
}
