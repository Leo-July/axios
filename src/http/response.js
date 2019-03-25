export default {
  res: res => {
    let data = res.data
    if (~~data.code === 200) {
      return data
    }
    return Promise.reject(data)
  },
  error: error => {
    return Promise.reject(error)
  }

}