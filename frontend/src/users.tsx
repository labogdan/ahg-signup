import axios from 'axios'

axios.defaults.headers.common = {
    "Content-Type": "application/json"
}

const baseUrl = 'feed/users'

const getAllAUsers = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


export default { getAllAUsers }
