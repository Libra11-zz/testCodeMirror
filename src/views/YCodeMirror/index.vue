<!--
 * @Author: Libra
 * @Date: 2021-10-20 17:41:35
 * @LastEditTime: 2021-10-21 15:16:40
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /testCodeMirror/src/views/YCodeMirror/index.vue
-->
<template>
  <div id="codeMirror" />
</template>

<script>
import CodeMirror from 'codemirror'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { CodemirrorBinding } from 'y-codemirror'
import 'codemirror/mode/javascript/javascript.js'
// import './style.css'
export default {
  mounted() {
    const roomName = this.$route.query.name
    const ydoc = new Y.Doc()
    const provider = new WebrtcProvider(roomName, ydoc)

    const yText = ydoc.getText('codemirror')
    const editorContainer = document.querySelector('#codeMirror')

    const editor = CodeMirror(editorContainer, {
      mode: 'javascript',
      lineNumbers: true
    })

    const binding = new CodemirrorBinding(yText, editor, provider.awareness)
  }
}
</script>

<style lang="css">
.remote-caret {
  position: absolute;
  border-left: black;
  border-left-style: solid;
  border-left-width: 2px;
  height: 1em;
}
.remote-caret > div {
  position: relative;
  top: -1.05em;
  font-size: 13px;
  background-color: rgb(250, 129, 0);
  font-family: serif;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  user-select: none;
  color: white;
  padding-left: 2px;
  padding-right: 2px;
  z-index: 3;
}
</style>
