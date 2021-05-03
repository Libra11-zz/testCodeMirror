<template>
  <div class="myEditor">
    <div class="flex-row space-col">
      <span>语言</span>
      <div class="space-row" />
      <select v-model="langIdSelected" @change="langChanged">
        <option
          v-for="lang in langList"
          :key="lang.languageId"
          :value="lang.languageId"
        >
          {{ `${capitalize(lang.language)} (${lang.sdk})` }}
        </option>
      </select>
      <div class="space-row" />
      <button @click="submit()">提交</button>
    </div>
    <div id="container" ref="container" />
    <div class="flex-row">
      <div class="flex-column">
        <div class="code-in-out-title">
          <div>输入</div>
          <div>
            <input id="vehicle1" type="checkbox" name="vehicle1" value="Bike">
            <label for="vehicle1">自定义用例</label>
          </div>
          <div />
        </div>
        <div>
          <textarea
            id=""
            v-model="stdin"
            name=""
            class="code-in-out"
            cols="30"
            rows="10"
          />
        </div>
      </div>
      <div class="flex-column">
        <div class="code-in-out-title">
          <div>输出</div>
        </div>
        <div>
          <textarea
            id=""
            v-model="stdout"
            name=""
            class="code-in-out"
            cols="30"
            rows="10"
          />
        </div>
      </div>
    </div>
    <div class="flex-row">状态</div>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution'
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import LangList from '../lang'
const axios = require('axios')

export default {
  props: {
    config: {
      type: Array,
      default: function() {
        return null
      }
    }
  },
  data() {
    return {
      theme: 'vs-dark',
      codesCopy: null, // 内容备份
      langList: LangList,
      stdin: '',
      stdout: '',
      token: '',
      langIdSelected: LangList[0].languageId,
      monacoEditor: null,
      currentLang: LangList[0],
      editorOptions: {
        foldingStrategy: 'indentation', // 代码可分小段折叠
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false, // 只读
        cursorStyle: 'line', // 光标样式
        automaticLayout: false, // 自动布局
        glyphMargin: true, // 字形边缘
        useTabStops: false,
        fontSize: 28, // 字体大小
        tabSize: 2, // tab 缩进长度
        autoIndent: true // 自动布局
      }
    }
  },
  mounted() {
    if (this.config) {
      this.loadConfig()
    }
    this.initEditor()
    //    var modesIds = monaco.languages.getLanguages().map(function(lang) { return lang.id; });
    // console.log(modesIds);
  },
  methods: {
    loadConfig() {
      var list = []
      for (const i in this.config) {
        const lang = this.langList.filter(e => e.languageId == this.config[i].languageId)
        if (this.config[i].template) {
          lang[0].template = this.config[i].template
        }
        list.push(lang[0])
      }
      if (list.length > 0) {
        this.langList = list
        this.currentLang = this.langList[0]
        this.langIdSelected = this.currentLang.languageId
      }
    },
    initEditor() {
      this.$refs.container.innerHTML = ''
      this.monacoEditor = monaco.editor.create(this.$refs.container, {
        value: this.currentLang.template,
        language: this.currentLang.language,
        theme: this.theme,
        editorOptions: this.editorOptions
      })
      // this.$emit("onMounted", this.monacoEditor);
      // this.monacoEditor.onDidChangeModelContent((event) => {
      //   this.codesCopy = this.monacoEditor.getValue();
      //   this.$emit("onCodeChange", this.monacoEditor.getValue(), event);
      // });
    },
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    async submit() {
      console.log(this.langIdSelected)
      const url =
        'http://39.100.119.27:3000/submissions?wait=true&base64_encoded=false'
      const code = {
        source_code: this.monacoEditor.getValue(),
        language_id: this.langIdSelected,
        stdin: this.stdin
      }
      const resp = await axios.post(url, code)
      console.log(resp.data)
      this.stdout = `status: ${resp.data.token} - ${resp.data.status.id} - ${resp.data.status.description} \n`
      this.stdout += `compile_output: ${resp.data.compile_output} \n`
      this.stdout += `stdout: ${resp.data.stdout} \n`
      this.stdout += `stderr: ${resp.data.stderr} \n`
      this.stdout += `memory: ${resp.data.memory} \n`
      this.stdout += `time: ${resp.data.time} \n`
      this.stdout += `message: ${resp.data.message} \n`
      this.$emit('codeExcuted', resp.data)
    },
    langChanged() {
      const monacoEditor = this.monacoEditor
      this.langList.forEach((l) => {
        if (l.languageId == this.langIdSelected) {
          monacoEditor.setValue(l.template)
          monaco.editor.setModelLanguage(monacoEditor.getModel(), l.language)
        }
      })
    }
  }
}
</script>
<style scoped>
#container {
  height: 400px;
  text-align: left;
}
.flex-row {
  display: flex;
}
.flex-column {
  flex: 1;
  flex-direction: column;
}
.code-in-out-title {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.code-in-out {
  width: 100%;
}
.space-row {
  width: 10px;
}
.space-col {
  margin-bottom: 10px;
}
</style>
