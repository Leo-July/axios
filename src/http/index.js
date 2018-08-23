import axios from "./default";
import request from './request'
import response from './response'
import store from '../store'
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
    // 监听store loading 值的变化
    store.watch(state => {
      return state.loading
    }, () => {
      if (store.state.loading) {
        Indicator.open({
          spinnerType: 'fading-circle'
        })
      } else {
        Indicator.close()
      }
    })
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
   * @param {Function}  finish   请求结束回调
   *
   */
  async request({
    url = '',
    methods = 'get',
    data = {},
    silent = false,
    success = () => {},
    fail = () => {},
    finish = () => {}
  } = {}) {
    const id = `${url}TIME${new Date().getTime()}` // 生成id

    if (!silent) { // 非静默模式，压入请求队列
      store.commit('pushRequest', id)
      store.commit('setLoading', true)
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

      finish()
      store.commit('popRequest', id)
      if (store.state.requestList.length === 0) {
        store.commit('setLoading', false)
      }
    } catch (error) {
      console.log(error)
    }
  }
}()