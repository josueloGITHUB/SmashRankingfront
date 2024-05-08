import { Routes, Route} from "react-router-dom";
import React from 'react';
import {useNavigate} from "react-router-dom"

function Inicio() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
    </div>
  );
}

function Header() {

    const navigate = useNavigate();
    const handleInicioClick = () => {
        // Redirige al usuario a la página de inicio
        navigate("/Tabla");
    };
    const handleEstadisticasClick = () => {
        // Redirige al usuario a la página de inicio
        navigate("/Estadisticas");
      };
      const handleAddClick = () => {
        // Redirige al usuario a la página de inicio
        navigate("/Add");
      };

      


    return(
    <header className="App-header">
    <h1 style={{ color: 'red' }}>Inicio</h1>
    <button className="start-button" onClick={handleInicioClick}>
        Empezar
    </button>
{/*     
    <ul>
        {data?.map((Jugador) => (<li key={Jugador.jugadorId}>{Jugador.nombre}</li>))}
    </ul> */}
    <button className="start-button left-button" onClick={handleAddClick}>
    +
    </button>
    <button className="start-button right-button" onClick={handleEstadisticasClick}>
    Estadisticas
    </button>
    </header>
    );
}

export default Inicio;