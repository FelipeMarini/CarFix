import axios from 'axios'


let config = {

    headers: {
        "Content-Type": "application/x-www-form-urlencoded",  //pode ser isso o problema
        Accept: "application/json"
    }

}

// const api = axios.create({ baseURL: 'https://54.147.100.207/api' }, config)  // -nuvem
const api = axios.create({ baseURL: 'https://localhost:5001/api' }, config)     // -local não da certo no mobile

export default api