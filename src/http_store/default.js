import axios from 'axios'

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = '/'
axios.defaults.timeout = 5000

export default axios