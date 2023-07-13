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

const coachByStudent = async (id) => {
  const { data } = await axios.get(baseUrl + `/get/coach/${id}`)
  console.log(data)
  return data
}

const studentById = async (id) => {
  const { data } = await axios.get(baseUrl + `/get/student/${id}`)
  return data
}

const newStudent = async (student) => {
  const { data } = await axios.post(baseUrl + '/new', student)
  return data
}

const courses = async () => {
  const { data } = await axios.get(baseUrl + "/courses")
  return data
}
// eslint-disable-next-line
export default { getStudent, allStudents,coachByStudent , studentById, newStudent, courses}
