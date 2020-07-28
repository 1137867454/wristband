import axios from 'axios'
import router from '../router/index'
import store from '../store/index'
// import store from '../store'
// import vue from 'vue'
import { Message, MessageBox } from 'element-ui'
axios.defaults.withCredentials = false

// 创建axios实例
let key = true;
const service = axios.create({
  // baseURL : 'http://192.168.1.222:8086',
  baseURL: 'http://120.24.253.177:8777',
  timeout: 150000
})
// request拦截器
service.interceptors.request.use(config => {
  // console.log(config);
  return config
}, error => {
  // console.error(error)
  Promise.reject(error)
})
// response拦截器：
service.interceptors.response.use(response => {
  const res = response.data;
  key = true;
  if (response.status === 200 && res.code == 1) {
    if(response.config.method != 'get') {
      console.log(res)
      Message({
        type: 'success',
        message: res.msg
      })
    }
    return response
  }
  console.log('reponse')
  console.log(response)
  Message({
    type: 'error',
    message: res.msg+ '(＠_＠;)' + res.data , //+ res.data.massage
    center: true,
    duration: 5000,
    showClose: true
  })
  return Promise.reject(res)
}, err =>{
  console.log('defeat');
  let obj = err.response;
  // console.log(err);
  // console.log(err.response);
  // console.log(err.response.data);
  // console.log(obj.data.code)
  if(key && obj.data.code === 70001){
    key = false;
    store.dispatch('removeLogin')
    Message({
        showClose : true,
        message : 'token过期无效，请重新登录',
        type : 'error',
        duration : 3000,
    })
   router.push('/admin_login') 
}
  return err;
})
export default service
