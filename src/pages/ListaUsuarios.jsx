import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:8080/users")
    setUser(result.data);
  };


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
            {user.map((usuario, index) => 
               <tr>
               <td>{usuario.nombre}</td>
               <td>{usuario.apellidos}</td>
               <td>{usuario.correo}</td>
               <td>{usuario.usuario}</td>
               <td>
                 <Link className="btn btn-primary mr-2" to={`/usuarios/${usuario.id}`}>
                   Ver
                 </Link>
                 <Link className="btn btn-outline-primary mr-2" to={`/usuarios/edit/${usuario.id}`}>
                   Editar
                 </Link>
               </td>
             </tr>
           )}
            
          </tbody>
        </table>
      </div>
    </div>

    
  );
}