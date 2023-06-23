import React, { useState, useEffect } from 'react';
import Notification from './components/Notification';
import loginService from './services/login';
import LoginForm from './components/LoginForm.js';
import Logout from './components/Logout.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './resources/logo.png';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const { user, token } = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(token);
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
        'loggedAppUser',
        JSON.stringify({ user, token })
      );

      setToken(token);
      setUser(user);
    } catch (e) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem('loggedAppUser');
  };

  return (
    <div className="container">
      <Notification message={errorMessage} />
      <div className="pt-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-6 col-md-4">
          {user ? (
            <>
              <div>
                <h2 className="text-center pt-4 pb-4">WELCOME</h2>
                <p className="text-center">Bienvenido, {user.username}</p>
                <p className="text-center">Tu correo es: {user.email}</p>
              </div>
              <Logout handleSubmitLogout={handleLogout} />
            </>
          ) : (
            <>
              <h1 className="text-center pt-4 pb-4">LOGIN</h1>
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
