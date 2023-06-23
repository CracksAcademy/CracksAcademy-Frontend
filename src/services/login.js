import axios from 'axios'


const token = async credentials => {
  const baseUrl = 'http://localhost:8080/token'
  const { data } = await axios.post(baseUrl, credentials)
  return data
}


const login = async credentials => {
  const baseUrl = 'http://localhost:8080/signin'
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { token, login }