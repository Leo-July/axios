import axios from 'axios'

// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = 'http://dev.XXXXXX.com'
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = 'https://XX.XXXXXX.com'
// }

axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = '/'
axios.defaults.timeout = 5000

export default axios
