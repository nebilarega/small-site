import React from "react";
import { Organize } from "./components/Organize";
import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Fallback from "./components/Fallback";

function App() {
  return (
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <Routes>
        <Route path="/" element={<>No shit</>} />
        <Route path="/models/:id" element={<Organize />}></Route>
      </Routes>
    </div>
  );
}

export default App;
