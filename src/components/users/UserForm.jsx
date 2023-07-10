import React, { useState, useEffect } from 'react';
import userService from '../../services/users';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import CustomNavbar from '../utils/Navbar';
import fetchData from '../../services/utils/fetchData';
import coachService from '../../services/coaches';
import { validateUsername, validatePassword, validateName, validateLastName, validateCity, validateTelephone, validateEmail, validateGender, validateRolUser } from '../../services/utils/validaciones';

export default function UserForm() {


  const [moneybox, setMoneybox] = useState('');
  //const [moneyboxError, setMoneyboxError] = useState('');
  const [coordinator, setCoordinator] = useState('');
  //const [coordinatorError, setCoordinatorError] = useState('');
  const [createdUser, setCreatedUser] = useState([]);

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
  const [avatar, setAvatar] = useState('');

  // Añadimos un estado para el mensaje de error
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [cityError, setCityError] = useState('');
  const [telephoneError, setTelephoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [rolUserError, setRolUserError] = useState('');


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
  const handleRolUserChange = (event) => {
    const selectedRole = event.target.value;
    setRolUser(selectedRole);
  };
  const handleAvatarChange = (event) => setAvatar(event.target.value);
  const handleMoneyboxChange = (event) => setMoneybox(event.target.value);
  const handleCoordinatorChange = (event) => setCoordinator(event.target.value); 

  const handleCreateRol = async (event) => {
    event.preventDefault();
    try {
      const newCoach = {
        moneybox: moneybox,
        coordinator: coordinator,
        user: createdUser,
      };
      const response = await coachService.newCoach(newCoach);
      console.log(response);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };


  const handleCityChange = (event) => setCity(event.target.value);
  const handleTelephoneChange = (event) => setTelephone(event.target.value);

  const handleCreateUser = async (event) => {
    event.preventDefault();

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const nameError = validateName(name);
    const lastNameError = validateLastName(lastName);
    const cityError = validateCity(city);
    const telephoneError = validateTelephone(telephone);
    const emailError = validateEmail(email);
    const rolUserError = validateRolUser(rolUser);
    const genderError = validateGender(gender);

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setNameError(nameError);
    setLastNameError(lastNameError);
    setCityError(cityError);
    setTelephoneError(telephoneError);
    setEmailError(emailError);
    setRolUserError(rolUserError);
    setGenderError(genderError);

    if (!usernameError && !passwordError && !nameError && !lastNameError && !cityError && !emailError && !genderError && !rolUserError && !telephoneError) {
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
          avatar: avatar,
        };

        const response = await userService.newUser(newUser);
        setCreatedUser(response);
        console.log(createdUser);

        if (selectedRole === 'COACH') {
          // Crea un nuevo registro en la tabla Coach con el id del usuario creado
          const newCoach = {
            moneybox: '',
            coordinator: 'May',
            user: createdUser.id
          };
        }
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

  const handleLogout = () => {
    window.localStorage.removeItem('tokenLoggedUser');
    window.location.href = '/';
  };

  return (
    <>
      <div className="container text-center" style
        ={{ height: '100vh', width: '100vw' }}>
        <CustomNavbar action={handleLogout} id={userLog.id} />
        {creado && createdUser.rolUser == 'COACH' && (
          <div className="row justify-content-center">
            <div className="col-sm-6 col-md-4">
              <h1 className="text-center pt-4 pb-4">Registro de rol</h1>
              <form onSubmit={handleCreateRol}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={moneybox}
                    name="Moneybox"
                    placeholder="Moneybox"
                    onChange={handleMoneyboxChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={coordinator}
                    name="Coordinator"
                    placeholder="Coordinator"
                    onChange={handleCoordinatorChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>
              </form>

            </div>
          </div>
        )}
        {creado && createdUser.rolUser == 'STUDENT' && (
          <div className="row justify-content-center">
            <div className="col-sm-6 col-md-4">
              <h1 className="text-center pt-4 pb-4">Registro de rol</h1>
              <form onSubmit={handleCreateRol}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={moneybox}
                    name="Moneybox"
                    placeholder="Moneybox"
                    onChange={handleMoneyboxChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={coordinator}
                    name="Coordinator"
                    placeholder="Coordinator"
                    onChange={handleCoordinatorChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>
              </form>

            </div>
          </div>
        )}
        {!creado && (
          <div className="row justify-content-center">
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
                    onBlur={() => setUsernameError(validateUsername(username))}
                  />
                  {usernameError && (
                    <div className="error-message" style={{ color: 'orange' }}>
                      <BsExclamationTriangleFill className="warning-icon" />
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
                    onBlur={() => setPasswordError(validatePassword(password))}
                  />
                  {passwordError && (
                    <div className="error-message" style={{ color: 'orange' }}>
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
                    onBlur={() => setNameError(validateName(name))}
                  />
                  {nameError && (
                    <div className="error-message" style={{ color: 'orange' }}>
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
                    onBlur={() => setLastNameError(validateLastName(lastName))}
                  />
                  {lastNameError && (
                    <div className="error-message" style={{ color: 'orange' }}>
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
                    onBlur={() => setEmailError(validateEmail(email))}
                  />
                </div>
                {emailError && (
                  <div className="error-message" style={{ color: 'orange' }}>
                    <BsExclamationTriangleFill className="warning-icon" />
                    {emailError}
                  </div>
                )}

                <div className="mb-3">
                  <select
                    className="form-control"
                    value={gender}
                    name="gender"
                    placeholder="Género"
                    onChange={handleGenderChange}
                    onBlur={() => setGenderError(validateGender(gender))}
                  >
                    <option value="">Selecciona un género</option>
                    {generos.map((genero) => (
                      <option key={genero.id} value={genero.id}>
                        {genero.name}
                      </option>
                    ))}
                  </select>
                </div>
                {genderError && (
                  <div className="error-message" style={{ color: 'orange' }}>
                    <BsExclamationTriangleFill className="warning-icon" />
                    {genderError}
                  </div>
                )}

                <div className="mb-3">
                  <select
                    className="form-control"
                    value={rolUser}
                    name="rolUser"
                    placeholder="Rol"
                    onChange={handleRolUserChange}
                    onBlur={() => setRolUserError(validateRolUser(rolUser))}
                  >
                    <option value="">Selecciona un rol</option>
                    {roles.map((rol) => (
                      <option key={rol.id} value={rol.id}>
                        {rol.name}
                      </option>
                    ))}
                  </select>

                  <div className='bg-info bg-opacity-10 container text-center mb-3' style={{ height: '80px', width: '400px' }}>
                    <p>Al registrarse, aparecerá un nuevo formulario </p>
                    <p>dependiendo del rol seleccionado.</p>
                  </div>

                </div>
                {rolUserError && (
                  <div className="error-message" style={{ color: 'orange' }}>
                    <BsExclamationTriangleFill className="warning-icon" />
                    {rolUserError}
                  </div>
                )}

                <div className="mb-3">
                  <select
                    className="form-control"
                    value={city}
                    name="city"
                    placeholder="Ciudad"
                    onChange={handleCityChange}
                    onBlur={() => setCityError(validateCity(city))}
                  >
                    <option value="">Selecciona una ciudad</option>
                    {ciudades.map((ciudad) => (
                      <option key={ciudad.id} value={ciudad.id}>
                        {ciudad.name}
                      </option>
                    ))}
                  </select>
                  {cityError && (
                    <div className="error-message" style={{ color: 'orange' }}>
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
                    name="telephone"
                    placeholder="Teléfono"
                    onChange={handleTelephoneChange} 
                    onBlur={() => setTelephoneError(validateTelephone(telephone))}
                  />
                {telephoneError && (
                  <div className="error-message" style={{ color: 'orange' }}>
                    <BsExclamationTriangleFill className="warning-icon" />
                    {telephoneError}
                  </div>
                )}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={avatar}
                    name="avatar"
                    placeholder="Avatar"
                    onChange={handleAvatarChange} 
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
