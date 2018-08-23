import qs from 'qs'
import {
  Toast
} from 'mint-ui'
export default {
  config: config => {
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) { // 序列化
      config.headers['Content-Type'] = 'application/json; charset=utf-8'
      config.data = qs.stringify(config.data);
    }
    return config
  },
  error: error => {
    Toast(error)
    return Promise.reject(error)
  }
}