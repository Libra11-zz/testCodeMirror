/*
 * @Author: your name
 * @Date: 2021-04-06 17:42:57
 * @LastEditTime: 2021-04-30 14:52:22
 * @LastEditors: Libra
 * @Description: In User Settings Edit
 * @FilePath: /interview-vue/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodeMirror)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
