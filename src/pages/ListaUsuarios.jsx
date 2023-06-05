import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export default function Home() {
  const [jugador, setJugador] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    loadJugador();
  }, []);

  const loadJugador = async () => {
    const result = await axios.get("http://localhost:8080/jugadores")
    setJugador(result.data);
    setUser(result.data.user);
  };

  const height = null

  return (
     
    <div className="container">      
      <div className="py-4">
        <table className="table" title="List of users">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Image</th>
              <th scope="col">Correo</th>
              <th scope="col">Usuario</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{jugador.firstName}</td>
              <td>{jugador.lastName}</td>
              <td>
                <img src={jugador.image} alt="imagen" width="25" height="25" />
              </td>
              <td>{user.correo}</td>
              <td>{user.username}</td>
            </tr>
          </tbody>
        </table>
        <a href="javascript:history.back()"> Volver Atrás</a>
      </div>
    </div>

    
  );
}