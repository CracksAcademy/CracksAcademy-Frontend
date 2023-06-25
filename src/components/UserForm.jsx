import React, { useState } from 'react';
import userService from '../services/users';

export default function UserForm () {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [creado, setCreado] = useState(false);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleSurnameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleCreateUser = async (event) => {
    event.preventDefault();

    try {
      const newUser = {
        username: username,
        password: password,
        name: name,
        lastName: lastName,
        email: email,
      };

      const createdUser = await userService.newUser(newUser);
        setCreado(true);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <>
    {creado &&
    <div className="row justify-content-center">
        <div className="col-sm-6 col-md-4">
            <h1 className="text-center pt-4 pb-4">Usuario creado</h1>
            <h2 className="text-center pt-4 pb-4">Ya puedes iniciar sesión</h2>
        </div>
    </div>}

    {!creado &&    <div className="row justify-content-center">
      <div className="col-sm-6 col-md-4">
        <h1 className="text-center pt-4 pb-4">Registro de usuario</h1>
        <form onSubmit={handleCreateUser}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={username}
              name="Username"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              name="Password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              name="Name"
              placeholder="Name"
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={lastName}
              name="lastName"
              placeholder="Last Name"
              onChange={handleSurnameChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={email}
              name="Email"
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
        </form>
      </div>
    </div>}

    </>
  );
}