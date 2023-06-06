//Quiero crear una página para crear un usuario

import React, { useState } from "react";
import axios from "axios";

export default function UsuarioCrear() {
    
    const [user, setUser] = useState({
        nombre: "",
        apellidos: "",
        correo: "",
        telefono: "",
        imagen: ""
    });

    const handleChange = async (e) => {
        await setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/user", user);
            window.location.href = "/usuarios";
          } catch (error) {
            console.error("Error al crear el usuario:", error);
          }
    }

    return (
        <div className="container">
            <h1>Crear Usuario</h1>
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
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>
    )
}
