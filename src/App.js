import React, { useState, useEffect } from 'react';
import Notification from './components/Notification';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Welcome';
import CustomNavbar from './components/Navbar';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [, setToken] = useState(null);

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

      
          {user ? (
            <>
              <CustomNavbar action={handleLogout}/>
              <Welcome user={user} />
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
  );
};

export default App;
