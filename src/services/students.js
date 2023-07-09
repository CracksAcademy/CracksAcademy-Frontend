import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/students'

const getStudent = async (id) => {
  const { data } = await axios.get(baseUrl + `/get/${id}`)
  return data
}
// eslint-disable-next-line
const allStudents = async () => {
  const { data } = await axios.get(baseUrl + "/get-all")
  return data
}
// eslint-disable-next-line
export default { getStudent, allStudents }
