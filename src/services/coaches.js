import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/coaches'

const getCoach = async (id) => {
  const { data } = await axios.get(baseUrl + `/get/${id}`)
  return data
}

const allCoaches = async () => {
  const { data } = await axios.get(baseUrl + "/get-all")
  return data
}
// eslint-disable-next-line
const studentsByCoach = async (id) => {
  const { data } = await axios.get(baseUrl + `/get/students/${id}`)
  return data
}

const newCoach = async coach => {
  const { data } = await axios.post(baseUrl + "/new", coach)
  return data
}

const getCoachByUserId = async (id) => {
  const { data } = await axios.get(baseUrl + `/get/user/${id}`)
  return data
}


// eslint-disable-next-line
export default { getCoach, allCoaches, studentsByCoach, newCoach, getCoachByUserId }
