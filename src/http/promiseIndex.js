import Axios from './axios.config'

/**
 * 请求方法
 *
 * @param {String}    url      接口地址
 * @param {String}    methods  请求方法
 * @param {Object}    headers  headers 设置
 * @param {Object}    data     参数
 * @param {Boolean}   silent   静默模式
 *
 */

export default function request({ url = '', method = 'get', data = {}, params = {}, headers = {}, silent = false, all = false } = {}) {
  // console.log(`${url}============>`, methods, data, silent)
  const id = `${url}TIME${new Date().getTime()}` // 生成id
  if (!silent) {
    // 非静默模式，压入请求队列
    Axios.setRequestList({ id })
  }

  return new Promise((resolve, reject) => {
    Axios.axios({
      url,
      method,
      headers,
      data,
      params,
    })
      .then(res => {
        Axios.setRequestList({ el: id, remove: true }) // 请求完成后，出队
        all ? resolve(res) : resolve(res.data)
      })
      .catch(error => {
        Axios.setRequestList({ el: id, remove: true }) // 请求完成后，出队
        if (!silent) Axios.Toast(error.msg || error.message || error)
        reject(error)
      })
  })
}
