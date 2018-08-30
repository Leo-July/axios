import {
  Toast
} from 'mint-ui'
export default {
  res: res => {
    let data = res.data
    if (~~data.code === 200) {
      return data.data
    }
    // 消息弹窗组件显示
    Toast(data.msg)
    return Promise.reject(data)
  },
  error: error => {
    Toast(error)
    return Promise.reject(error)
  }

}