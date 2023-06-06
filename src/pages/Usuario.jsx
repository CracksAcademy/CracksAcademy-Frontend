

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Usuario() {
    const [user, setUser] = useState({});
    
    const { id } = useParams();
    
    useEffect(() => {
        loadUser();
    }, []);
    
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    };
    
    return (
        <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-12 col-xl-4">

        <div className="card">
          <div className="card-body text-center">
            <div className="mt-3 mb-4">
              <img src={user.imagen} className="rounded-circle img-fluid" />
            </div>
            <h4 className="mb-2">{user.usuario}</h4>
            <div className="mb-4 pb-2">
            <h4 className="mb-2">{user.nombre}</h4>
            <h4 className="mb-2">{user.apellidos}</h4>
            <h4 className="mb-2">{user.correo}</h4>
            <h4 className="mb-2">{user.telefono}</h4>
            <h4 className="mb-2">{user.sexo}</h4>
            <h4 className="mb-2">{user.ciudad}</h4>
            </div>
            <Link className="btn btn-primary mr-2" to={`/usuarios/editar/${user.id}`}>
                   Editar
                 </Link>
            <div className="px-5 py-2">
                
            </div>
            <button type="button" className="btn btn-primary btn-rounded btn-lg">
              Eliminar
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
    );
    }