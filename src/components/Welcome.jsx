import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gifImage from '../resources/min.gif'
import Notification from './Notification';
import loginService from '../services/login';
import LoginForm from './LoginForm';
import CustomNavbar from './Navbar';

export default function Welcome () {
  
  const [mensajeBienvenida, setMensajeBienvenida] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [, setToken] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('tokenLoggedUser');
    if (loggedUserJSON) {
      const { user, token } = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(token);
      user.gender ==='FEMENINO' ? setMensajeBienvenida('Bienvenida') : setMensajeBienvenida('Bienvenido');
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const token = await loginService.token({
        username,
        password,
      });

      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'tokenLoggedUser',
        JSON.stringify({ user, token })
      );

      setToken(token);
      setUser(user);
      user.gender ==='FEMENINO' ? setMensajeBienvenida('Bienvenida') : setMensajeBienvenida('Bienvenido');
    } catch (e) {
      setErrorMessage('Credenciales inválidas');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem('tokenLoggedUser');
  };

  return (
    <>

<div className="container" style={{ height: '100vh', width: '100vw' }}>
      <Notification message={errorMessage} />

          {user ? (
            <>
              <CustomNavbar action={handleLogout}/>
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
                <Link to="/users/new" style={{ display: 'flex', justifyContent: 'center' }}>
                  <button className="btn btn-primary btn-lg btn-block mt-5">Nuevo usuario</button>
                    </Link>
            </div>
            </>
          ) : (
            
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              />
            
          )}
        
    </div>

      
    </>
  );
};
