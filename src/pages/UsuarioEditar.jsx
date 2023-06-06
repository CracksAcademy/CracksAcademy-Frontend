//Quiero crear una página para editar un usuario que voy a recibir por una id en la url

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UsuarioEditar() {
    
    const [user, setUser] = useState({});
    const { id } = useParams();
    
    useEffect(() => {
        loadUser();
    }, []);
    
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    }

    const handleChange = async (e) => {
        await setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/user/${id}`, user);
            window.location.href = "/usuarios";
          } catch (error) {
            console.error("Error al editar el usuario:", error);
          }
    }

    return (
        <div className="container">
            <h1>Editar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" name="nombre" className="form-control" value={user.nombre} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Apellidos</label>
                    <input type="text" name="apellidos" className="form-control" value={user.apellidos} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Correo</label>
                    <input type="text" name="correo" className="form-control" value={user.correo} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Telefono</label>
                    <input type="text" name="telefono" className="form-control" value={user.telefono} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Imagen</label>
                    <input type="text" name="imagen" className="form-control" value={user.imagen} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Editar</button>
            </form>
        </div>
    )
       

}
