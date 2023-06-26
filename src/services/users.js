import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/users'

const newUser = async user => {
    const { data } = await axios.post(baseUrl + "/new", user)
    return data
}

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

export default { newUser, cities, roles, gender}