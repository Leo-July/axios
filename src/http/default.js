import axios from 'axios'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://'
}

axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.timeout = 10000

export default axios
