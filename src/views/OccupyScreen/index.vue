<!--
 * @Author: Libra
 * @Date: 2021-05-11 09:36:07
 * @LastEditTime: 2021-05-11 11:26:52
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
      hidden: '',
      isBlur: true
    }
  },
  created() {
    this.init()
  },
  beforeDestroy() {
    document.removeEventListener(this.visibilityChange)
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
      const _this = this
      window.onblur = function() {
        // this.$alert('这是一段内容', '标题名称', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     this.$message({
        //       type: 'info',
        //       message: `action: ${action}`
        //     })
        //   }
        // })
        // this.$message.error('不要点击我以外的应用')
        // console.log('不要点击我以外的应用')
        // alert('不要点击我以外的应用')
        _this.isBlur = false
      }
      window.onfocus = function() {
        console.log('blur')
        console.log(_this.isBlur)
        if (!_this.isBlur) {
          _this.$message.error('不要点击我以外的应用')
          _this.isBlur = true
        }
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
