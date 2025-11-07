import React from "react";
import Calendar from "./components/Calendar";

export default function App() {
  return (
    <div
      className="h-screen flex flex-col items-center justify-between overflow-hidden"
      style={{
        backgroundColor: "transparent", // Allows background image to show
      }}
    >
      {/* ===== Header ===== */}
      <header className="mt-3">
        <h1 className="text-2xl font-bold text-indigo-700">
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
