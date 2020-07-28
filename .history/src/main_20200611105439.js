import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'babel-polyfill'
import './registerServiceWorker'
import './plugins/element.js'
// import md5 from 'js-md5'
import VueCron from 'vue-cron';
Vue.use(VueCron);
Vue.prototype.openLoading = function() {
  const loading = this.$loading({           // 声明一个loading对象
    // lock: true,                             // 是否锁屏
    text: '请稍等...',                     // 加载动画的文字
    // spinner: 'el-icon-loading',             // 引入的loading图标
    // background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
    target: '#setUp',                    // 需要遮罩的区域
    body: false,                              
    customClass: 'mask'                     // 遮罩层新增类名
  })
  // Vue.prototype.openLoading = function() {
  //   const loading = this.$loading({           // 声明一个loading对象
  //     lock: true,                             // 是否锁屏
  //     text: '请稍等...',                     // 加载动画的文字
  //     // spinner: 'el-icon-loading',             // 引入的loading图标
  //     // background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
  //     target: '.sub-main',                    // 需要遮罩的区域
  //     body: true,                              
  //     customClass: 'mask'                     // 遮罩层新增类名
  //   })
  setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close();                        // 关闭遮罩层
  }, 15000)
  return loading;
}
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
  } 
// let Base64 = require('js-base64').Base64
// Vue.prototype.$md5 = md5
Vue.config.productionTip = false
new Vue({
  router,
  store,
  Date,
  // Base64,
  render: h => h(App)
}).$mount('#app')
