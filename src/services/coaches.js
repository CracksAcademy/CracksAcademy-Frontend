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

export default { getCoach, allCoaches }
