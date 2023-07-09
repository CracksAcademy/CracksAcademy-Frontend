const validateUsername = (username) => {
    if (username.length < 3) {
      return 'El nombre de usuario debe tener al menos 3 caracteres';
    }
    return '';
  };
  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula y una minúscula';
    }
    return '';
  };
  
  const validateName = (name) => {
    if (name.length < 3) {
      return 'El nombre debe tener al menos 3 caracteres';
    }
    return '';
  };
  
  const validateLastName = (lastName) => {
    if (lastName.length < 3) {
      return 'El apellido debe tener al menos 3 caracteres';
    }
    return '';
  };
  
  const validateCity = (city) => {
    if (!city) {
      return 'Debes seleccionar una ciudad';
    }
    return '';
  };

  const validateTelephone = (telephone) => {
    const telephoneRegex = /^[0-9]{7,}$/;
    if (!telephoneRegex.test(telephone)) {
        return 'El teléfono debe tener al menos 7 caracteres';
    }
    return '';
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!emailRegex.test(email)) {
            return 'El email debe tener un formato válido';
        } else if(email.length < 3) {
            return 'El email debe tener al menos 3 caracteres';
        }
        return '';
    };
    
    const validateGender = (gender) => {
        if (!gender) {
            return 'Debes seleccionar un género';
        }
        return '';
        };

    const validateRolUser = (rolUser) => {
        if (!rolUser) {
            return 'Debes seleccionar un rol';
        }
        return '';
        };


  
  export {
    validateUsername,
    validatePassword,
    validateName,
    validateLastName,
    validateCity,
    validateTelephone, 
    validateEmail, 
    validateGender, 
    validateRolUser
  };
  