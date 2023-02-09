const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '/api': { 
  //       target: 'http://39.106.127.16:7001', 
  //       // target: 'https://www.vue-js.com/api',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // },
  // assetsDir: 'static',
  // parallel: false,
  // publicPath: './',
})
