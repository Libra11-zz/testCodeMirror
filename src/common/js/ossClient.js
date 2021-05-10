/*
 * @Author: your name
 * @Date: 2021-04-27 15:38:20
 * @LastEditTime: 2021-05-10 15:38:24
 * @LastEditors: Libra
 * @Description: In User Settings Edit
 * @FilePath: /interview-vue/src/common/js/OssClient.js
 */
import OSS from 'ali-oss'
const client = new OSS({
  region: 'oss-cn-huhehaote',
  accessKeyId: '*********',
  accessKeySecret: 'PojIx4dlPE9Lqnu0C9mRDHRNypxL9N',
  bucket: 'libra321'
})
export default client
