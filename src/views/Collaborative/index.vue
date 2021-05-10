<!--
 * @Author: Libra
 * @Date: 2021-05-08 16:32:52
 * @LastEditTime: 2021-05-10 11:06:27
 * @LastEditors: Libra
 * @Description:collaborative-code-editor
 * @FilePath: /interview-vue/src/views/Collaborative/index.vue
-->
<template>
  <div>
    <collaborative :files="files" :active="active" :mode="mode" :refresh="refresh" :theme="theme" @openFile="openFile" @edit="edit" @cursor="setCursor" />
  </div>
</template>

<script>
import io from 'socket.io-client'
import collaborative from '../../components/Collaborative'
export default {
  components: {
    collaborative
  },
  data() {
    return {
      socket: null,
      files: [{ name: 'main.cpp', content: '' }],
      active: 0,
      mode: 'text/x-c++src',
      //
      mirror: false,
      cursor: { ch: 0, line: 0 },
      theme: 'material-darker',
      //
      refresh: false
    }
  },
  /* SOCKET */
  created() {
    this.socket = io.connect('http://82.156.19.83:3001', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'my-custom-header'
      }
    })

    this.socket.on('connect', () => {
      console.log('connect socket id' + this.socket.id)
    })

    this.socket.on('disconnect', () => {
      console.log('disconnect socket id' + this.socket.id)
    })

    this.socket.on('broadcast', (arg) => {
      arg = JSON.parse(JSON.stringify(arg))
      if (this.mirror) {
        this.active = arg.active
        this.mode = arg.mode
      }
      this.files = [...arg.files]
      console.log(this.files)
    })
  },

  mounted() {
    this.setMode()
  },

  methods: {
    addFile({ name, content }) {
      this.files = [...this.files, { name: name, content: content }]
      /* SOCKET */
      this.emit()
    },

    removeFile(payload) {
      this.files.splice(payload, 1)
      /* SOCKET */
      this.emit()
    },

    openFile(payload) {
      this.active = payload
      this.setMode()
      /* SOCKET */
      this.emit()
    },

    edit(payload) {
      this.files[this.active].content = payload
      /* SOCKET */
      this.emit()
    },

    setMode() {
      let filename = this.files[this.active].name
      if (filename.includes('.')) {
        filename = this.files[this.active].name.split('.')
        if (filename.length >= 2) {
          const ext = filename.pop()
          switch (ext) {
            case 'c':
            case 'cpp':
            case 'java':
              this.mode = 'text/x-c++src'
              break

            case 'py':
              this.mode = 'python'
              break

            case 'md':
              this.mode = 'markdown'
              break

            case 'sql':
              this.mode = 'sql'
              break

            case 'sh':
              this.mode = 'shell'
              break

            case 'jsx':
              this.mode = 'jsx'
              break

            case 'html':
            case 'htm':
              this.mode = 'htmlmixed'
              break

            case 'xml':
              this.mode = 'xml'
              break

            case 'js':
              this.mode = 'javascript'
              break

            case 'php':
              this.mode = 'php'
              break

            default:
              this.mode = ''
              break
          }
        }
      }
    },

    setCursor(payload) {
      this.cursor = { ...payload }
    },

    emit() {
      this.socket.emit('emit', {
        files: this.files,
        active: this.active,
        mode: this.mode,
        cursor: this.cursor
      })
    },

    setFont() {
      this.refresh = !this.refresh
    },

    setTheme(payload) {
      this.theme = payload
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
