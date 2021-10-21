<!--
 * @Author: Libra
 * @Date: 2021-09-29 11:10:18
 * @LastEditTime: 2021-09-29 14:55:43
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /testCodeMirror/src/views/VideoToGif/index.vue
-->
<template>
  <div />
</template>

<script>
import RecordRTCPromisesHandler from 'recordrtc'
export default {
  created() {
    this.recordScreen()
    console.log(RecordRTCPromisesHandler)
  },
  methods: {
    async recordScreen() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          frameRate: 1
        },
        audio: false
      })
      const recorder = new RecordRTCPromisesHandler(stream, {
        type: 'gif'
      })
      recorder.startRecording()

      const sleep = m => new Promise(r => setTimeout(r, m))
      await sleep(15000)

      await recorder.stopRecording()
      const blob = await recorder.getBlob()
      var a = document.createElement('a')
      var url = window.URL.createObjectURL(blob)
      var filename = 'test.gif'
      a.href = url
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(url)
      // const file = new File([blob], `a.gif`, {
      //   type: 'gif'
      // })
      // console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped></style>
