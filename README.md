# axios

> 此项目是用[vue cli 3](https://cli.vuejs.org/zh/guide/) 脚手架生成的项目

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Lints and fixes files

```
yarn run lint
```

## document

```js
┣━  http               // 采用类中的set,get方式监听请求接口队列
┃     ┣━ axios.config.js   // 创建axios实例
┃     ┣━ default.js    // 默认配置
┃     ┣━ index.js      // 导出最终的request方法
┃     ┣━ request.js    // request拦截器
┃     ┣━ response.js   // response拦截器
┣━  http_store         // 试了下采用vuex 的 watch api 监听请求队列
┃     ┣━ default.js
┃     ┣━ index.js      // vuex监听实现代码放在了这里
┃     ┣━ request.js    // request 拦截器
┃     ┣━ response.js   // response拦截器
```

---

#### 实现原理

是在类`class` 中声明 `requestList`请求队列变量，然后通过`set` `get`函数监听请求队列变化，当请求队列为空的时候，关闭`loading`，反之显示。

#### `axios.config.js`

实现静默功能的主要代码，和声明`axios`实例

```js
import { Indicator, Toast } from 'mint-ui'

import axios from './default'
import request from './request'
import response from './response'

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
    this.Indicator = Indicator
    this.Toast = Toast
  }

  get requestList() {
    return this._requestList
  }

  set requestList(list) {
    this._requestList = list // 设置请求队列
    if (this._requestList.length === 0) {
      // 如果请求队列为空了，就关闭loading
      this.Indicator.close()
    } else {
      // 反知显示loading
      this.Indicator.open({
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
    const array = [...this._requestList]
    remove ? array.splice(array.indexOf(id), 1) : array.push(id)
    this.requestList = array
  }
}()
```

#### `default.js`

`axios`默认配置

```js
import axios from 'axios'

axios.defaults.baseURL = ''
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = '/'
axios.defaults.timeout = 5000

export default axios
```

#### `request.js`

```js
import qs from 'qs'

export default {
  config: config => {
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      // 序列化
      config.headers['Content-Type'] = 'application/json; charset=utf-8'
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error: error => {
    return Promise.reject(error)
  },
}
```

#### `response.js`

```js
export default {
  res: res => {
    let data = res.data
    if (~~data.code === 200) {
      return data.data
    }
    return Promise.reject(data)
  },
  error: error => {
    return Promise.reject(error)
  },
}
```

#### `index.js`

```js
import Axios from './axios.config'

/**
 * 请求方法
 *
 * @param {String}    url      接口地址
 * @param {String}    methods  请求方法
 * @param {Object}    headers  headers 设置
 * @param {Object}    data     参数
 * @param {Boolean}   silent   静默模式
 * @param {Function}  success  请求成功回调
 * @param {Function}  fail  请求失败回调
 * @param {Function}  complete   请求结束回调
 *
 */

export default async function request({
  url = '',
  method = 'get',
  data = {},
  params = {},
  headers = {},
  success = () => {},
  fail = () => {},
  complete = () => {},
  silent = false,
  all = false,
} = {}) {
  // console.log(`${url}============>`, methods, data, silent)
  const id = `${url}TIME${new Date().getTime()}` // 生成id
  if (!silent) {
    // 非静默模式，压入请求队列
    Axios.setRequestList({ id })
  }
  try {
    const result = await Axios.axios({
      url,
      method,
      headers,
      data,
      params,
    })
    Axios.setRequestList({ el: id, remove: true }) // 请求完成后，出队
    all ? success(result) : success(result.data)
  } catch (error) {
    Axios.setRequestList({ el: id, remove: true }) // 请求完成后，出队
    if (!silent) Axios.Toast(error.msg || error.message || error)
    fail(error)
  } finally {
    complete()
  }
}
```
test branch

master-remote branch
[git 源码地址](https://github.com/Leo-July/axios)

[axios 中文使用文档](https://www.kancloud.cn/yunye/axios/234845)
