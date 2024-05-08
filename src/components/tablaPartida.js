import React, { useState, useEffect } from "react";
import Axios from "axios";

function TablaPartida() {
  const [jugadores, setJugadores] = useState([
    "Jugador 1",
    "Jugador 2",
    "Jugador 3",
    "Jugador 4",
  ]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [nombresJugadores, setNombresJugadores] = useState([]);
  const [jugadoresIds, setJugadoresIds] = useState([]); // Agregamos estado para almacenar los IDs de los jugadores
  const [posiciones, setPosiciones] = useState([]);
  const [datosPartida, setDatosPartida] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const agregarJugador = () => {
    const nuevoJugador = `Jugador ${jugadores.length + 1}`;
    setJugadores([...jugadores, nuevoJugador]);
  };

  const quitarJugador = () => {
    const nuevosJugadores = [...jugadores];
    nuevosJugadores.pop();
    setJugadores(nuevosJugadores);
  };

  const fetchData = async () => {
    try {
      const response = await Axios.get("https://localhost:7261/api/Jugador");
      setData(response.data);

      const nombres = response.data.map((jugador) => jugador.nombre);
      const ids = response.data.map((jugador) => jugador.jugadorId - 1); // Ajustamos los IDs para que comiencen en 0
      
      setNombresJugadores(nombres);
      setJugadoresIds(ids);

    } catch (error) {
      setError(error);
    }
  };

  const fetchPosiciones = async () => {
    try {
      const response = await Axios.get("https://localhost:7261/api/Posicion");
      setData(response.data);
      const posiciones = response.data.map((posicion) => posicion.posicionId);
      setPosiciones(posiciones);
    } catch (error) {
      setError(error);
    }
  };

  const guardarPartida = async () => {
    try {
      const response = await Axios.post(
        "https://localhost:7261/api/Punto/SubirPartida",
        datosPartida,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Partida guardada exitosamente");
      console.log(response);
      setModalOpen(true);
      fetchData(); // Actualizar datos después de guardar la partida
    } catch (error) {
        
        console.log(error);
        setMessage(error.response.data);
        setModalOpen(true);
        setError(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPosiciones();
  }, []); 

  const handleSeleccionJugador = (jugadorIndex, jugadorId) => { // Cambiamos a recibir el jugadorId
    const newData = [...datosPartida];
    newData[jugadorIndex] = { ...newData[jugadorIndex], jugadorId: jugadorId }; // Asignamos el jugadorId
    setDatosPartida(newData);
  };

  const handleSeleccionPosicion = (jugadorIndex, posicionId) => {
    const newData = [...datosPartida];
    newData[jugadorIndex] = { ...newData[jugadorIndex], posicionId: posicionId };
    setDatosPartida(newData);
  };

  return (
    <div>
      {jugadores.map((jugador, index) => (
        <div key={index}>
          <h3>{jugador}</h3>
          <select onChange={(e) => handleSeleccionJugador(index, e.target.selectedIndex)} > {/* Utilizamos el índice seleccionado para obtener el ID del jugador */}
            <option value="" disabled selected hidden>
              Seleccione un jugador
            </option>
            {nombresJugadores.map((nombre, index) => (
              <option key={index}>{nombre}</option>
            ))}
          </select>
          <select onChange={(e) => handleSeleccionPosicion(index, e.target.value)}>
            <option value="" disabled selected hidden>
              Posicion
            </option>
            {posiciones.map((posicion, index) => (
              <option key={index}>{posicion}</option>
            ))}
          </select>
        </div>
      ))}
      <div>
        <button onClick={guardarPartida}>Guardar Partida</button>
      </div>
      <button onClick={agregarJugador}>+</button>
      <button onClick={quitarJugador}>-</button>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TablaPartida;
