import Axios from '../http/index'
import promiseFecth from '../http/promiseIndex'

export default {
  getNews(arg) {
    return Axios({
      url: 'api.apiopen.top/getJoke?page=1&count=2&type=video',
      ...arg,
      all: true
    })
  },
}
export function promiseFecthGetNew(arg) {
  return promiseFecth({
    url: 'api.apiopen.top/getJoke?page=1&count=2&type=video',
    ...arg,
    all: true
  })
}
