import React from "react";
import Calendar from "./components/Calendar";

export default function App() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start overflow-auto py-8"
      style={{
        backgroundColor: "transparent", // Keeps your gradient background visible
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
    </div>
  );
}
