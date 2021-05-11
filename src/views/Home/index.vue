<!--
 * @Author: Libra
 * @Date: 2021-05-06 15:04:06
 * @LastEditTime: 2021-05-11 13:52:58
 * @LastEditors: Libra
 * @Description:Home
 * @FilePath: /interview-vue/src/views/Home/index.vue
-->
<template>
  <div class="container">
    <div class="box">
      <router-link class="link" to="/editor">editor</router-link>
      <router-link class="link" to="/playOssVideo">PlayOssVideo</router-link>
      <router-link class="link" to="/ossUpload">oss</router-link>
      <router-link class="link" to="/monacoEditor">monacoEditor</router-link>
      <router-link class="link" to="/collaborative">collaborative</router-link>
      <router-link class="link" to="/occupyScreen">occupyScreen</router-link>
      <router-link class="link" to="/broswerFullscreen">BroswerFullscreen</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .container{
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
  .link{
    display: block;
  }
</style>
