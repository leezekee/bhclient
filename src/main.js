import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './index.css'
import '@/assets/iconfont/iconfont.css'
// import cors from 'cors'

// const cors = require('cors')

Vue.use(ElementUI)
// Vue.use(cors({
//   origin:['http://39.106.127.16:7001'],  // 要设置白名单的 地址
//   methods:['GET','POST'],  // 请求方式
//   alloweHeaders:['Conten-Type', 'Authorization']
// }))
// Vue.use(cors({}
// ))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
