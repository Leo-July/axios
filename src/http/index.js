import axios from "./default";
import request from './request'
import response from './response'
import {
  Indicator,
} from 'mint-ui';

export default new class Axios {
  constructor() {
    this.axios = axios.create() // 创建实例
    this.axios.interceptors.request.use( // 添加请求拦截器
      request.config,
      request.error
    )
    this.axios.interceptors.response.use( // 添加响应拦截器
      response.res,
      response.error
    )

    this.requestList = {
      el: []
    }
  }
  get requestList() {
    return this._requestList
  }
  set requestList({
    el,
    remove = false
  } = {}) {
    if (this._requestList) {
      let array = [...this._requestList]
      remove ? array.splice(array.indexOf(el), 1) : array.push(el)
      this._requestList = array
    } else {
      this._requestList = el
    }
    if (this._requestList.length === 0) {
      Indicator.close()
    } else {
      Indicator.open({
        spinnerType: 'fading-circle'
      })
    }
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
  async request({
    url = '',
    methods = 'get',
    data = {},
    silent = false,
    success = () => {},
    fail = () => {},
    complete = () => {}
  } = {}) {
    const id = `${url}TIME${new Date().getTime()}` // 生成id

    if (!silent) { // 非静默模式，压入请求队列
      this.requestList = {
        el: id
      }
    }

    try {
      let result = null
      switch (methods) {
        case 'get':
          result = this.axios.get(url, {
            params: data
          })
          break
        case 'post':
          result = this.axios.post(url, data)
          break
          // 可以添加其他请求方式
      }
      // 回调
      await result.then(res => {
        success(res)
      }).catch(error => {
        fail(error)
      })
      this.requestList = {
        el: id,
        remove: true
      }
    } catch (error) {
      console.log(error)
    } finally {
      complete()
    }
  }
}()