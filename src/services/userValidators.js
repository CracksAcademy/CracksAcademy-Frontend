const validateUsername = (username,users,setUsernameError) => {
    console.log(users);
    console.log(username);
    if (username.length < 3) {
      setUsernameError(' El nombre de usuario debe tener al menos 3 caracteres');
    } else if (users.find(user => user.username === username)){
      setUsernameError(' El nombre de usuario ya existe');
    } else {
      setUsernameError('');
    }
  };
  
  const validatePassword = (password, setPasswordError) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(' La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula y una minúscula');
    } else {
      setPasswordError('');
    }
  };
  
  const validateName = (name,setNameError) => {
    if (name.length < 3) {
      setNameError(' El nombre debe tener al menos 3 caracteres');
    } else {
      setNameError('');
    }
  };
  
  const validateLastName = (lastName,setLastNameError) => {
    if (lastName.length < 3) {
      setLastNameError(' El apellido debe tener al menos 3 caracteres');
    } else {
      setLastNameError('');
    } 
  };
  
  const validateCity = (city,setCityError) => {
    if (!city) {
      setCityError(' Debes seleccionar una ciudad');
    } else {
      setCityError('');
    }
  };

export {validateUsername,validatePassword,validateName,validateLastName,validateCity};  
