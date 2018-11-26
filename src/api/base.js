import Axios from '../http/index'
export default {
  getNews(arg) {
    return Axios.request({
      url: 'https://www.apiopen.top/journalismApi',
      ...arg,
    })
  }
}
