import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/coordinators'

const allCoordinators = async () => {
    const { data } = await axios.get(baseUrl + "/get-all")
    return data
  }

  
export default { allCoordinators }