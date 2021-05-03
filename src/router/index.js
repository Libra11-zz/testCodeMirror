/*
 * @Author: Libra
 * @Date: 2021-04-29 14:59:31
 * @LastEditTime: 2021-04-30 16:19:45
 * @LastEditors: Libra
 * @Description:路由页面
 * @FilePath: /interview-vue/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ossUpload',
    name: 'OssUpload',
    component: () => import(/* webpackChunkName: "about" */ '../views/OssUpload')
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import(/* webpackChunkName: "about" */ '../views/Editor')
  },
  {
    path: '/monacoEditor',
    name: 'MonacoEditor',
    component: () => import(/* webpackChunkName: "about" */ '../views/MonacoEditor')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

