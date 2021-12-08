import axios from 'axios'


let config = {

    headers: {
        "Content-Type": "application/json"
    }

}

const api = axios.create({ baseURL: 'https://54.147.100.207/api' }, config)
// const api = axios.create({ baseURL: 'https://localhost:5001/api' }, config)

export default api