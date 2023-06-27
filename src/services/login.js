import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/'
 
const token = async credentials => {
  const { data } = await axios.post(baseUrl + "token", credentials)
  return data
}


const login = async credentials => {
  const { data } = await axios.post(baseUrl + "signin", credentials)
  return data
}

export default { token, login }