import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/users';

export default function UserForm () {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [rolUser, setRolUser] = useState('');
  const [city, setCity] = useState('');
  const [telephone, setTelephone] = useState(''); 

  const [creado, setCreado] = useState(false);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleSurnameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleRolUserChange = (event) => setRolUser(event.target.value);
  const handleCityChange = (event) => setCity(event.target.value);
  const handleTelephoneChange = (event) => setTelephone(event.target.value);
  

  const handleCreateUser = async (event) => {
    event.preventDefault();

    try {
      const newUser = {
        username: username,
        password: password,
        name: name,
        lastName: lastName,
        email: email,
        gender: gender,
        rolUser: rolUser,
        city: city,
        telephone: telephone,
      };

      const createdUser = await userService.newUser(newUser);
        setCreado(true);

    } catch (error) {
      console.log(error);
    }
  };

  const [ciudades, setCiudades] = useState([]);
  const [roles, setRoles] = useState([]);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    async function fetchCiudades() {
      try {
        const getCiudades = await userService.cities();
        const ciudadesConId = getCiudades.map((ciudad, index) => ({
          id: index,
          name: ciudad
        }));
        setCiudades(ciudadesConId);

        const getRoles = await userService.roles();
        const rolesConId = getRoles.map((rol, index) => ({
          id: index,
          name: rol
        }));
        setRoles(rolesConId);

        const getSexo = await userService.gender();
        const genderConId = getSexo.map((genero, index) => ({
          id: index,
          name: genero
        }));
        setGeneros(genderConId);

      } catch (error) {
        console.error('Error fetching ciudades:', error);
      }
    }
    fetchCiudades();
  }, []);
  

  



  return (

    <>
    {creado &&
    <div className="row justify-content-center">
        <div className="col-sm-6 col-md-4">
            <h1 className="text-center pt-4 pb-4">Usuario creado</h1>
            <h2 className="text-center pt-4 pb-4">Ya puedes iniciar sesión</h2>
            <Link to="/" style={{ display: 'flex', justifyContent: 'center' }}>
                  <button className="btn btn-primary btn-lg btn-block mt-5">Volver al menú principal</button>
            </Link>
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
          
          <div className="mb-3">
            <select
              className="form-control"
              value={gender}
              name='gender'
              placeholder='Género'
              onChange={handleGenderChange}
            >
              <option value="">Selecciona un género</option>
              {generos.map((genero) => (
                <option key={genero.id} value={genero.id}>
                  {genero.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <select
              className="form-control"
              value={rolUser}
              name='rolUser'
              placeholder='Rol'
              onChange={handleRolUserChange}
            >
              <option value="">Selecciona un rol</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.name}
                </option>
              ))}
            </select>
          </div>
          
          
          <div className="mb-3">
            <select
              className="form-control"
              value={city}
              name='city'
              placeholder='Ciudad'
              onChange={handleCityChange}
            >
              <option value="">Selecciona una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.name}
                </option>
              ))}
            </select>
            
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={telephone}
              name='telephone'
              placeholder='Teléfono'
              onChange={handleTelephoneChange}
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