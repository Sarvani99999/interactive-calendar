import React from "react";
import Calendar from "./components/Calendar";


export default function App() {
  return (
    <div
      className="flex flex-col items-center justify-between"
      style={{
        height: "100vh",              // 🧭 Full screen height
        overflow: "hidden",            // 🧭 No scrolling
        backgroundColor: "transparent" // 🧭 Let image show through
      }}
    >
      {/* ===== Header ===== */}
      <header>
        <h1 className="text-2xl font-bold text-indigo-700 mt-4 mb-2">
          Interactive Calendar
        </h1>
      </header>

      {/* ===== Calendar Section ===== */}
      <main className="flex-grow flex items-center justify-center w-full">
        <Calendar />
      </main>

      {/* ===== Footer ===== */}
      <footer className="text-sm text-gray-500 mb-3">
        © 2025 Calendar Project
      </footer>
    </div>
  );
}
