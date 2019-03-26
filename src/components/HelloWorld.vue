<template>
  <div class="hello">
    <p class="tip">在Network为fast3g下效果才更明显</p>
    <div class="section">
      <h3>回调函数请求</h3>
      <mtButton @click="fetchNormal">有loading和错误toast</mtButton>
      <mtButton @click="fetchSilent">没有loading和toast</mtButton>
    </div>
    <div class="section">
      <h3>返回promise请求</h3>
      <mtButton @click="ProFetchNormal">有loading和错误toast</mtButton>
      <mtButton @click="ProFetchSilent">没有loading和toast</mtButton>
    </div>

    <p>{{res}}</p>
  </div>
</template>

<script>
import base, { promiseFecthGetNew } from '../api/base'
import { Toast, Button } from 'mint-ui'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    mtButton: Button
  },
  data () {
    return {
      res: ''
    }
  },
  methods: {
    fetchNormal () {
      this.res = ''
      base.getNews({
        success: res => {
          this.res = JSON.stringify(res)
          console.log('success')
        },
        fail: error => {
          Toast(error)
        },
        complete: () => {
          console.log('complete')
        }
      })
    },
    fetchSilent () {
      this.res = ''
      base.getNews({
        silent: true,
        success: res => {
          this.res = JSON.stringify(res)
          console.log('success')
        },
        fail: error => {
          Toast(error)
        },
        complete: () => {
          console.log('complete')
        }
      })
    },
    async ProFetchNormal () {
      this.res = ''

      const res = await promiseFecthGetNew()
      console.log("TCL: ProFetchNormal -> res", res)

      this.res = res
    },
    async ProFetchSilent () {
      this.res = ''

      const res = await promiseFecthGetNew({ silent: true })
      console.log("TCL: ProFetchSilent -> res", res)
      this.res = res
    },
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
