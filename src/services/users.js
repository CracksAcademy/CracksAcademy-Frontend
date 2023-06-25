import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/users'

const newUser = async user => {
    const { data } = await axios.post(baseUrl + "/new", user)
    return data
}

export default { newUser }