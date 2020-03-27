import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:4002'
})

export default axios