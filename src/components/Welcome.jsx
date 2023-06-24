import React from 'react'
import gifImage from '../resources/min.gif'

export default function Welcome({ user, ...props }) {
  const mensajeBienvenida = user.gender === 'FEMENINO' ? 'Bienvenida' : 'Bienvenido';

  return (
    <>
      <div>
        <h2 className="text-center pt-4 pb-4">{mensajeBienvenida}, <b>{user.username}</b></h2>
        <p className="text-center">Tu correo es: {user.email}</p>
        <p className="text-center">Tu rol es: {user.rolUser}</p>
        <p className="text-center">Tu ciudad es: {user.city}</p>
        <p className="text-center">Tu teléfono es: {user.telephone}</p>
        <p className="text-center">Tu género es: {user.gender}</p>
        <div className="pt-5" style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={gifImage} alt="GIF" style={{ width: '420px', height: '230px' }}/>
        </div>
      </div>
    </>
  );
};
