import axios from './default'
import request from './request'
import response from './response'
import { Indicator, Toast } from 'mint-ui'

export default new class Axios {
  constructor() {
    this.axios = axios.create() // 创建实例
    this.axios.interceptors.request.use(
      // 添加请求拦截器
      request.config,
      request.error,
    )
    this.axios.interceptors.response.use(
      // 添加响应拦截器
      response.res,
      response.error,
    )

    this._requestList = []
  }

  /**
   * 获取请求队列
   *
   */
  get requestList() {
    return this._requestList
  }

  /**
   * 设置请求队列
   * @param {Object} list  请求队列
   */
  set requestList(list) {
    this._requestList = list // 设置请求队列
    if (this._requestList.length === 0) {  // 如果请求队列为空了，就关闭loading
      Indicator.close()
    } else { // 反知显示loading
      Indicator.open({
        spinnerType: 'fading-circle',
      })
    }
  }
  /**
   * 当请求队列发生变化的时候，触发此方法
   * @param {Object} id  请求队列入队或出队的id
   * @param {Boolean} remove  true: 出队   false: 默认  进队
   */
  setRequestList({ id = '', remove = false } = {}) {
    let array = [...this._requestList]
    remove ? array.splice(array.indexOf(id), 1) : array.push(id)
    this.requestList = array
  }

  /**
   * 请求方法
   *
   * @param {String}    url      接口地址
   * @param {String}    methods  请求方法
   * @param {Object}    data     参数
   * @param {Boolean}   silent   静默模式
   * @param {Function}  success  请求成功回调
   * @param {Function}  success  请求失败回调
   * @param {Function}  complete   请求结束回调
   *
   */
  async request({ url = '', methods = 'get', data = {}, silent = false, success = () => {}, fail = () => {}, complete = () => {} } = {}) {
    const id = `${url}TIME${new Date().getTime()}` // 生成id

    if (!silent) {
      // 非静默模式，压入请求队列
      this.setRequestList({ id: id })
    }

    try {
      let result = null
      switch (methods) {
        case 'get':
          result = this.axios.get(url, {
            params: data,
          })
          break
        case 'post':
          result = this.axios.post(url, data)
          break
        // 可以添加其他请求方式
      }
      // 回调
      await result
        .then(res => {
          success(res)
        })
        .catch(error => {
          fail(error)
        })
      this.setRequestList({ el: id,remove: true}) // 请求完成后，出队
    } catch (error) {
      if (silent) Toast(error.msg)  // 非静默，错误toast
    } finally {
      complete()
    }
  }
}()
