import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/users';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import CustomNavbar from '../utils/Navbar';
import fetchData from '../../services/utils/fetchData';

export default function UserForm () {

  // Manejo de estados
 
const [userLog, setUserLog] = React.useState([]);

  // Añadimos un estado para cada campo del formulario 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [rolUser, setRolUser] = useState('');
  const [city, setCity] = useState('');
  const [telephone, setTelephone] = useState(''); 

  // Añadimos un estado para el mensaje de error
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [cityError, setCityError] = useState('');

  // Lista de atributos en los select
  const [ciudades, setCiudades] = useState([]);
  const [roles, setRoles] = useState([]);
  const [generos, setGeneros] = useState([]);

  // Estado para mostrar el mensaje de usuario creado
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

    validateUsername();
    validatePassword();
    validateName();
    validateLastName();
    validateCity();

      if (!usernameError && !passwordError && !nameError && 
              !lastNameError && !cityError) {
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
          console.log(createdUser);
          setCreado(true);

        } catch (error) {
          console.log(error);
        }
    }
  };

  useEffect(() => {
    fetchData(userService.cities, setCiudades);
    fetchData(userService.roles, setRoles);
    fetchData(userService.gender, setGeneros);

    const getUserLog = async () => {
      const user = await userService.getUserLogeado();
      setUserLog(user);
    }
    getUserLog();
  }, []);
  

const validateUsername = () => {
  if (username.length < 3) {
    setUsernameError(' El nombre de usuario debe tener al menos 3 caracteres');
  } else {
    setUsernameError('');
  }
};

const validatePassword = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    setPasswordError(' La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula y una minúscula');
  } else {
    setPasswordError('');
  }
};

const validateName = () => {
  if (name.length < 3) {
    setNameError(' El nombre debe tener al menos 3 caracteres');
  } else {
    setNameError('');
  }
};

const validateLastName = () => {
  if (lastName.length < 3) {
    setLastNameError(' El apellido debe tener al menos 3 caracteres');
  } else {
    setLastNameError('');
  } 
};

const validateCity = () => {
  if (!city) {
    setCityError(' Debes seleccionar una ciudad');
  } else {
    setCityError('');
  }
};

const handleLogout = () => {
  window.localStorage.removeItem('tokenLoggedUser');
  window.location.href = '/';
};


  return (
    <>

  <div className="container text-center" style={{ height: '100vh', width: '100vw' }}>
            <CustomNavbar action={handleLogout} id={userLog.id} />
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
              onBlur={validateUsername}
            />
            {usernameError && (
              <div className="error-message" style={{ color: 'orange'}}>
                <BsExclamationTriangleFill className="warning-icon"/>
                {usernameError}
              </div>
            )}

          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              name="Password"
              placeholder="Password"
              onChange={handlePasswordChange}
              onBlur={validatePassword}
            />
            {passwordError && (
              <div className="error-message" style={{ color: 'orange'}}>
                <BsExclamationTriangleFill className="warning-icon" />
                {passwordError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              name="Name"
              placeholder="Name"
              onChange={handleNameChange}
              onBlur={validateName}
            />
            {nameError && (
              <div className="error-message" style={{ color: 'orange'}}>
                <BsExclamationTriangleFill className="warning-icon" />
                {nameError}
                </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={lastName}
              name="lastName"
              placeholder="Last Name"
              onChange={handleSurnameChange}
              onBlur={validateLastName}
            />
            {lastNameError && (
              <div className="error-message" style={{ color: 'orange'}}>
                <BsExclamationTriangleFill className="warning-icon" />
                {lastNameError}
                </div>
            )}
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
              onChange={handleRolUserChange}        >
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
              onBlur={validateCity}
            >
              <option value="">Selecciona una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.name}
                </option>
              ))}
            </select>
            {cityError && (
              <div className="error-message" style={{ color: 'orange'}}>
                <BsExclamationTriangleFill className="warning-icon" />
                {cityError}
                </div>
            )}
            
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
    </div>

    </>
  );
}