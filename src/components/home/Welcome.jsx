import React, { useState, useEffect } from 'react';
import gifImage from '../../resources/min.gif'
import Notification from '../utils/Notification';
import loginService from '../../services/login';
import LoginForm from './LoginForm';
import CustomNavbar from '../utils/Navbar';
import userService from '../../services/users';

export default function Welcome() {

  const [mensajeBienvenida, setMensajeBienvenida] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [, setToken] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('tokenLoggedUser');
    if (loggedUserJSON) {
      const { token } = JSON.parse(loggedUserJSON);
      setToken(token);
      const getUserByTokenFunc = async () => {
        const user = await userService.getUserLogeado();
        setUser(user);
      }
      getUserByTokenFunc();
      if (user) {
        user.gender === 'FEMENINO' ? setMensajeBienvenida('Bienvenida') : setMensajeBienvenida('Bienvenido');
      }
    } else {
      setToken(null);
      setUser(null);
    }
  }, [user]);

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
        'tokenLoggedUser', JSON.stringify({ token }))
        ;

      setToken(token);
      setUser(user);
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
            <CustomNavbar action={handleLogout} id={user.id} />
            <div>
              <div className="pt-5" style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{mensajeBienvenida} {user.name}</h1>
              </div>
              <div className="pt-5" style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={gifImage} alt="GIF" style={{ width: '420px', height: '230px' }} />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          </div>

        )}

      </div>

    </>
  );
};

