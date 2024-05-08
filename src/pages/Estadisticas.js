import React, { useState, useEffect } from "react";
import Axios from "axios";
import BackButton from "../components/buttonBack";

function Estadisticas() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "https://localhost:7261/api/Punto/total"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App-header">
    <div style={{width: "40%"}}>
      <BackButton />
      <h1 style={{ color: "red" }}>Estadisticas</h1>
      <div>
        {data && data.length > 0 ? (
          <table className="table-container">
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {data.map((Jugador, index) => (
                  <tr key={index}>
                  <td>{Jugador.nombreJugador}</td>
                  <td>{Jugador.totalPuntos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay jugadores</p>
        )}
      </div>
    </div>
  </div>
  );
}

export default Estadisticas;
