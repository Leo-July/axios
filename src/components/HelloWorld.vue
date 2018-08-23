<template>
  <div class="hello">
    <button @click="fetchFast">快接口</button>
    <button @click="fetchLow">慢接口</button>
  </div>
</template>

<script>
import base from '../api/base'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    fetchFast() {
      base.getPublicInfo({
        data: { uid: '664316171' },
        success: res => {
          console.log(res)
        },
        fail: error => {
          console.log(error)
        },
        finish: () => {
          console.log('finish')
        }
      })
    },
    fetchLow(){
    base.getLowInfo({
      // silent: true,
      success: res => {
        console.log(res)
      },
      fail: error => {
        console.log(error)
      }, finish: () => {
        console.log('finish')
      }
    })
    }
  },
  created() {
    this.fetchLow()
    this.fetchFast()
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
