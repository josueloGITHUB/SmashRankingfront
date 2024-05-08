import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import { useState} from "react";
import './App.css';
import Inicio from "./pages/inicio";
import Add from "./pages/Add";
import Estadisticas from "./pages/Estadisticas";
import Tabla from "./pages/Tabla"





function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/estadisticas/" element={<Estadisticas />} />
          <Route path="/tabla" element={<Tabla />} />
          <Route path="/Add/" element={<Add />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Header() {
  const navigate = useNavigate();

  const handleInicioClick = () => {
    // Redirige al usuario a la página de inicio
    navigate("/Inicio");
  };

  return (
    <header className="App-header">
      <h1 style={{ color: 'red' }}>Smash Ranking</h1>
      <button className="start-button" onClick={handleInicioClick}>
        Inicio
      </button>
    </header>
  );
}

export default App;
