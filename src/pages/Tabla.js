import React from "react";
import { Routes, Route } from "react-router-dom";
import TablaPartida from "../components/tablaPartida";
import BackButton from "../components/buttonBack";

function Tabla() {
  return (
    <div className="App-header">
      <BackButton/>
      <h1 style={{ color: "red" }}>Guardar Partida</h1>
    <TablaPartida/>
    </div>
  );
}

export default Tabla;
