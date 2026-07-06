import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home/Home";
import Inicio from "@/pages/Inicio/Inicio";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}