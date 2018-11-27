<template>
  <div class="hello">
    <p class="tip">测试最好在开发者工具中修改Network为fast3g,想过才更明显</p>
    <button @click="fetchNormal">有loading和错误toast</button>
    <button @click="fetchSilent">没有loading和toast</button>
    <p>{{res}}</p>
  </div>
</template>

<script>
import base from '../api/base'
import { Toast } from 'mint-ui'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
    }
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
