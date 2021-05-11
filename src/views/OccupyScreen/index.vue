<!--
 * @Author: Libra
 * @Date: 2021-05-11 09:36:07
 * @LastEditTime: 2021-05-11 09:45:37
 * @LastEditors: Libra
 * @Description:霸屏测试
 * @FilePath: /interview-vue/src/views/OccupyScreen/index.vue
-->
<template>
  <div class="container">
    <span class="content">考试中，请不要离开当前页面</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibilityChange: '',
      hidden: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
        this.hidden = 'hidden'
        this.visibilityChange = 'visibilitychange'
      } else if (typeof document.msHidden !== 'undefined') {
        this.hidden = 'msHidden'
        this.visibilityChange = 'msvisibilitychange'
      } else if (typeof document.webkitHidden !== 'undefined') {
        this.hidden = 'webkitHidden'
        this.visibilityChange = 'webkitvisibilitychange'
      }
      // 如果浏览器不支持addEventListener 或 Page Visibility API 给出警告
      if (typeof document.addEventListener === 'undefined' || typeof document[this.hidden] === 'undefined') {
        console.log('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.')
      } else {
        // 处理页面可见属性的改变
        document.addEventListener(this.visibilityChange, this.handleVisibilityChange, false)
      }
    },
    handleVisibilityChange() {
      if (document[this.hidden]) {
        this.$message.error('请注意，你刚才离开了页面！！！')
      } else {
        console.log('appear')
      }
    }
  }
}
</script>

<style scoped>
.container{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .content{
    font-size: 80px;
  }
</style>
