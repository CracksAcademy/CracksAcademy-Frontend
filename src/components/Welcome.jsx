import React from 'react'
import gifImage from '../resources/min.gif'

export default function Welcome ({user,...props}) {
      return (
       <>
       <div>
                <h2 className="text-center pt-4 pb-4">WELCOME</h2>
                <p className="text-center">Bienvenido, <b>{user.username}</b></p>
                <p className="text-center">Tu correo es: {user.email}</p>
                <div className="pt-5" style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={gifImage} alt="GIF" style={{ width: '420px', height: '230px' }}/>
                </div>
              </div>
              
        </>
      );
    };