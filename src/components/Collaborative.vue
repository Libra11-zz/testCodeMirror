<!--
 * @Author: Libra
 * @Date: 2021-05-10 10:16:40
 * @LastEditTime: 2021-05-10 11:02:46
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /interview-vue/src/components/Collaborative.vue
-->
<template>
  <div class="container">
    <nav class="nav">
      <a v-for="(file,index) in files" :key="index" class="nav-link" href="#" :class="{active: index==active}" @click="openFile(index)">
        {{ file.name }}
      </a>
    </nav>
    <section id="editor">
      <textarea id="code" />
    </section>
  </div>
</template>

<script>
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/3024-night.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/gfm/gfm.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/mode/shell/shell.js'
import 'codemirror/mode/jsx/jsx.js'

export default {
  props: ['files', 'active', 'mode', 'refresh', 'theme'],
  data() {
    return {
      editor: null,
      echo: true
    }
  },
  watch: {
    active() {
      const cursorPosition = this.editor.getCursor()
      this.editor.setValue(this.files[this.active].content)
      this.editor.setCursor(cursorPosition)
    },
    mode() {
      this.editor.setOption('mode', this.mode)
    },
    files() {
      this.echo = false
      const cursorPosition = this.editor.getCursor()
      this.editor.setValue(this.files[this.active].content)
      this.editor.setCursor(cursorPosition)
    },
    refresh() {
      this.editor.refresh()
      this.editor.focus()
    },
    theme() {
      this.editor.setOption('theme', this.theme)
    }
  },
  mounted() {
    const textarea = document.querySelector('#code')

    this.editor = CodeMirror.fromTextArea(textarea, {
      // mode: 'text/x-c++src',
      mode: 'javascript',
      // theme: this.theme,
      theme: '3024-night',
      tabSize: 2,
      lineNumbers: true,
      indentWithTabs: true
    })
    this.editor.on('change', (e) => {
      this.$emit('cursor', this.editor.getCursor())
      if (this.echo) {
        this.$emit('edit', this.editor.getValue())
      }
      this.echo = true
    })
  },
  methods: {
    openFile(index) {
      this.$emit('openFile', index)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
