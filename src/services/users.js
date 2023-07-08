import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/users'

// Metodo para crear un nuevo usuario

const newUser = async user => {
  const { data } = await axios.post(baseUrl + "/new", user)
  return data
}

// Metodo para obtener un usuario por id

const getUser = async (id) => {
  const { data } = await axios.get(baseUrl + `/get/${id}`)
  return data
}

// Metodo para obtener el usuario logueado

const getUserLogeado = async () => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenLoggedUser'));
    const token = tokenData.token;

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.get(baseUrl + "/logged", config);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Metodos para obtener datos de la base de datos para los select

const cities = async () => {
  const { data } = await axios.get(baseUrl + "/cities")
  return data
}

const roles = async () => {
  const { data } = await axios.get(baseUrl + "/roles")
  return data
}

const gender = async () => {
  const { data } = await axios.get(baseUrl + "/gender")
  return data
}

// Metodo para obtener todos los usuarios y poder listarlos

const allUsers = async () => {
  const { data } = await axios.get(baseUrl + "/get-all")
  return data
}

export default { newUser, cities, roles, gender, allUsers, getUser, getUserLogeado }
