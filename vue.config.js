/*
 * @Author: your name
 * @Date: 2021-04-27 15:36:11
 * @LastEditTime: 2021-05-09 21:32:04
 * @LastEditors: Libra
 * @Description: In User Settings Edit
 * @FilePath: /interview-vue/vue.config.js
 */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// const port = process.env.port || process.env.npm_config_port || 9527 // dev port
module.exports = {
  chainWebpack: config => {
    /* ... */

    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
      }
    }
  },
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
      // new MonacoEditorLocalesPlugin({
      //   languages: ['zh-cn', 'en-us'],
      //   defaultLanguages: 'zh-cn',
      //   logUnmatched: false,
      //   mapLanguages: {}
      // })
    ]
  }
}
