import Axios from '../http/index'
export default {
  getNews(arg) {
    return Axios({
      url: 'https://www.apiopen.top/journalismApi',
      ...arg,
    })
  }
}
