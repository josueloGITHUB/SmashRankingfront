import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BackButton from "../components/buttonBack";

function Add() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [nombre, setNombre] = useState("");
  const [showAddPlayerField, setShowAddPlayerField] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const fetchData = async () => {
    try {
      const response = await Axios.get("https://localhost:7261/api/Jugador");
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const postData = async (nombre) => {
    try {
      const response = await Axios.post(
        "https://localhost:7261/api/Jugador",
        nombre,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Respuesta del API:", response.data);
      fetchData();
      setNombre(""); // Limpiar el campo de entrada después de guardar
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showSwal = async () => {
    const { value: inputValue } = await withReactContent(Swal).fire({
      title: <i>Añadir Jugador</i>,
      input: "text",
      inputValue: nombre,
      inputPlaceholder: "Nombre del jugador",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      preConfirm: (inputValue) => {
        // Aquí actualizamos el nombre y llamamos a postData
        setNombre(inputValue);
        postData(inputValue);
      },
    });
  };

  return (
    <div className="App-header">
      <div className="App">
        <BackButton />
        <h1 style={{ color: "red" }}>Agregar Nuevo Elemento</h1>
        <h2 className="SubTitle">Jugadores</h2>
        <div>
          {data && data.length > 0 ? (
            <table className="table-container">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {data.map((Jugador) => (
                  <tr key={Jugador.jugadorId}>
                    <td>{Jugador.jugadorId}</td>
                    <td>{Jugador.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay jugadores</p>
          )}
        </div>
        <div>
          <button onClick={showSwal}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default Add;
