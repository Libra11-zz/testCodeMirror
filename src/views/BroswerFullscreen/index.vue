<!--
 * @Author: Libra
 * @Date: 2021-05-11 13:11:13
 * @LastEditTime: 2021-05-11 13:51:53
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /interview-vue/src/views/BroswerFullscreen/index.vue
-->
<template>
  <div class="exam-container">
    <div class="fullScreen" @click="Fullscreen()">{{ title }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prefixName: '',
      isFullscreenData: true,
      title: '开始考试'
    }
  },
  created() {
    this.isFullscreen(() => console.log('浏览器不支持全屏幕'))
    const _this = this
    document.onfullscreenchange = function(event) {
      _this.screenChange(() => console.log('进入全屏'), () => {
        _this.$alert('请不要退出全屏', '考试中', {
          confirmButtonText: '确定',
          callback: action => {
            _this.Fullscreen()
          }
        })
      })
    }
  },
  destroyed() {
    document.onfullscreenchange = null
  },
  methods: {
    isFullscreen(fn) {
      let fullscreenEnabled
      // 判断浏览器前缀
      if (document.fullscreenEnabled) {
        fullscreenEnabled = document.fullscreenEnabled
      } else if (document.webkitFullscreenEnabled) {
        fullscreenEnabled = document.webkitFullscreenEnabled
        this.prefixName = 'webkit'
      } else if (document.mozFullScreenEnabled) {
        fullscreenEnabled = document.mozFullScreenEnabled
        this.prefixName = 'moz'
      } else if (document.msFullscreenEnabled) {
        fullscreenEnabled = document.msFullscreenEnabled
        this.prefixName = 'ms'
      }
      if (!fullscreenEnabled) {
        if (fn !== undefined) fn() // 执行不支持全屏的回调
        this.isFullscreenData = false
      }
    },
    Fullscreen() {
      this.title = '考试中'
      const element = document.querySelector('.exam-container') // 获取dom
      const methodName =
    this.prefixName === ''
      ? 'requestFullscreen'
      : `${this.prefixName}RequestFullScreen` // API前缀
      element[methodName]() // 调用全屏
    },
    exitFullscreen() {
      const methodName =
    this.prefixName === ''
      ? 'exitFullscreen'
      : `${this.prefixName}ExitFullscreen` // API 前缀
      document[methodName]() // 调用
    },
    isElementFullScreen() {
      const fullscreenElement =
    document.fullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement // 有前缀的f是大写，没前缀是小写
      if (fullscreenElement === null) {
        return false // 当前没有元素在全屏状态
      } else {
        return true // 有元素在全屏状态
      }
    },
    screenChange(enter, quit) {
      console.log(this.isFullscreenData)
      if (!this.isFullscreenData) return
      const methodName = `on${this.prefixName}fullscreenchange`
      document[methodName] = e => {
        if (this.isElementFullScreen()) {
          enter && enter(e) // 进入全屏回调
        } else {
          quit && quit(e) // 离开全屏的回调
        }
      }
    }
  }
}
</script>

<style scoped>
.exam-container{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.exam-container:fullscreen{
  background-color: #fff;
}
.fullScreen{
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: #fff;
  background-color: #36bfc4;
  font-size: 24px;
  cursor: pointer;
}
</style>
