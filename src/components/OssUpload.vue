<!--
 * @Author: your name
 * @Date: 2021-04-06 17:42:57
 * @LastEditTime: 2021-04-28 17:09:55
 * @LastEditors: Libra
 * @Description: In User Settings Edit
 * @FilePath: /interview-vue/src/components/HelloWorld.vue
-->
<template>
  <div>
    <el-upload
      action=""
      :http-request="Upload"
      :on-remove="delitem"
      list-type="picture-card"
      class="upload-demo"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <video v-show="isVideo" id="video" width="272" height="240" />
    <canvas
      v-show="!isVideo"
      id="camera"
      width="272"
      height="240"
    />
  </div>
</template>

<script>
import client from '../common/js/ossClient.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Index',
  data() {
    return {
      url: [],
      isVideo: true,
      file: null
    }
  },
  created() {
    console.log(uuidv4().replace(/-/g, ''))
  },
  mounted() {
    // this.initCamera()
  },
  methods: {
    // 自定义上传方法..
    Upload(file) {
      console.log(file)
      // 判断扩展名
      const tmpcnt = file.name.lastIndexOf('.')
      const exname = file.name.substring(tmpcnt + 1)
      const names = ['jpg', 'jpeg', 'webp', 'png', 'bmp', 'pdf', 'mp4', 'webm']
      if (names.indexOf(exname) < 0) {
        this.$message.error('不支持的格式!')
        return
      }
      const fileName = file.name + '.' + exname
      client
        .put(fileName, file)
        .then((res) => {
          if (res.url) {
            this.url.push(res.url)
          } else {
            this.$message.error('文件上传失败')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 删除一个图片..
    delitem(file, fileList) {
      console.log(file.uid)
      for (let i = 0; i < this.url.length; i++) {
        if (this.url[i].indexOf(file.uid) > -1) {
          this.url.splice(i, 1)
        }
      }
    },
    // 初始化摄像机
    initCamera() {
      const loadingInstance = this.$loading({ background: 'transparent' })
      const canvas = document.getElementById('camera')
      const video = document.getElementById('video')
      this.video = video
      this.context = canvas.getContext('2d')
      const videoObj = {
        video: true,
        audio: true
      }
      const promise = navigator.mediaDevices.getUserMedia(videoObj)
      promise
        .then((MediaStream) => {
          console.info(MediaStream)
          this.mediaStreamTrack = MediaStream
          video.srcObject = MediaStream
          video.play()
          this.Record()
          setTimeout(() => {
            loadingInstance.close()
          }, 1500)
        })
        .catch((PermissionDeniedError) => {
          loadingInstance.close()
          this.isDenied = true
          this.allowCameraVisible = true
          console.log(PermissionDeniedError)
          console.log('请允许打开摄像头')
        })
    },
    Record() {
      const uuid1 = uuidv4().replace(/-/g, '')
      const uuid2 = uuidv4().replace(/-/g, '')
      let count = 0
      console.log('recording..')
      console.log('mediaStreamTrack', this.mediaStreamTrack)
      const mediaRecorder = new MediaRecorder(this.mediaStreamTrack, {
        audioBitsPerSecond: 64000,
        videoBitsPerSecond: 200000,
        mimeType: 'video/webm'
      })
      let chunks = []
      mediaRecorder.start(15000)
      mediaRecorder.ondataavailable = (ev) => {
        console.log(ev)
        chunks.push(ev.data)
        const blob = new Blob(chunks, { type: 'video/webm;' })
        this.file = new File(
          [blob],
          `${uuid1}_${uuid2}_${count}.webm`,
          {
            type: 'video/webm'
          }
        )
        console.log('file', this.file)
        this.Upload(this.file)

        // let videoURL = window.URL.createObjectURL(blob);
        // const url = videoURL;
        // const name = new Date().toISOString();
        // const a = document.createElement("a");
        // a.style.display = "none";
        // a.download = `${name}.mp4`;
        // a.href = url;
        // document.body.appendChild(a);
        // a.click();
        // console.log("释放 Blob");
        // window.URL.revokeObjectURL(videoURL);
        chunks = []
        count++
      }
    }
  }
}
</script>

<style scoped>
.upload-demo /deep/ .el-upload--picture-card {
  height: 100px;
  width: 100px;
  line-height: 100px;
}
.upload-demo /deep/ .el-upload-list__item {
  height: 100px;
  width: 100px;
  line-height: 100px;
}
</style>
