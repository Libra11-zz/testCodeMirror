<!--
 * @Author: Libra
 * @Date: 2021-05-06 15:04:06
 * @LastEditTime: 2021-05-07 15:41:47
 * @LastEditors: Libra
 * @Description:Home
 * @FilePath: /interview-vue/src/views/Home/index.vue
-->
<template>
  <div class="container">
    <div class="box">
      <router-link to="/editor">editor</router-link>
      <router-link to="/playOssVideo">PlayOssVideo</router-link>
      <router-link to="/ossUpload">oss</router-link>
      <router-link to="/monacoEditor">monacoEditor</router-link>
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
  }
  .box{
    width: 640px;
    height: 483px;
    background-color: #000;
    color: white;
  }
</style>
