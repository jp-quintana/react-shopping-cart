import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";

import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
