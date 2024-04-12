import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className=" min-h-screen font-sans bg-gray-50">
      <Navbar />
      <Outlet />
    </main>
  );
}

export default App;
