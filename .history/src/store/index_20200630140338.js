import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import { asyncRouterMap } from '../router/asyncRouterMap'
import addRouter from './modules/addRouter'
import students from './modules/students'
import teachers from './modules/teachers'
import school from './modules/school'
import admin from './modules/admin'
import classes from './modules/classes'
import wristband from './modules/wristband'
import condition from './modules/condition'
import { setItem, getItem, removeItem } from '../util/localStorage'
import fx from '../util/fx'
// import { webSocket } from '../util/socket'
import api from '../util/api'
// import { constantRouterMap } from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes: [],
    asyncRouterMap: asyncRouterMap,
    Authorization: '',
    role: '',
    classId: ''
  },
  getters: {
    getTest: state => {
      // console.log(router.options.routes)
      // console.log(asyncRouterMap)
      return router
    },
    getRole: state => state.role,
    getAuthorization: state => state.Authorization,
    getClassId: state => state.classId
  },
  mutations: {
    setAuthorization(state, token) { //将用户登录的token赋值给vuex;
      state.Authorization = token;
      state.role = getItem('role');
      state.classId = getItem('classId');
    }
  },
  actions: {
    // 0.request发起请求
    setConnect ({ state, rootState }, payload) {
      console.log('发送请求到:' + payload.url)
      // console.log(payload.methods);
      // console.log(payload.obj);
      return new Promise((resolve, reject) => {
        api({
          url: payload.url,
          method: payload.methods ? 'post' : 'get',
          // headers:{
          //   Authorization: rootState.visitor.Authorization
          // },
          data: payload.data
        }).then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    //1. login 登录
    login ({ state, rootState, dispatch }, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        var url = '';
        switch(data.role) {
          case 'student': url = '/student/login';break;
          case 'teacher': url = '/teacher/login';break;
          case 'schoolManager': url = '/schoolmanger/login';break;
          case 'sysmanager': url = '/sysmanager/login';break;
        }
        var methods = 'post'
        dispatch('setConnect', { url, data, methods })
          .then(res => {
            let v = res.data.data;
            console.log(v)
            rootState.addRouter.user = {};
            console.log(rootState.addRouter.user)
            if(v.role == 'teacher'){
              dispatch('getClassId');
              dispatch('teacherType');
            }
            setItem('token', v.accessToken);
            setItem('role', v.role);
            state.Authorization = v.accessToken;
            state.role = v.role;
            resolve(1)
          }).catch(err => {
            // setItem('token', err)
          reject(err);
          })
      })
    },
    //获取老师具体分类 /teacher/getType
    teacherType({state, rootState}) {
      let url = '/teacher/getType';
      let Authorization = rootState.Authorization;
      fx.setConnect({state}, {url, Authorization})
      .then(res => {
        if(res.data.data){
          state.user.type = res.data.data;
          console.log(res.data.data)
        }
      }).catch( err => {
        console.log(err);
      })
    },
     // 获取班主任所管班级ID列表 /classinfo/getManagedClassIdList
     getClassId({state, rootState}) {
      let url = "/classinfo/getManagedClassIdList";
      let Authorization = rootState.Authorization;
      // console.log(rootState);
      fx.setConnect({state}, {url, Authorization})
      .then(res => {
        console.log(res.data.data);
        if(res.data.data.length){
          let data = res.data.data[0];
          state.classId = data;
          setItem('classId', data);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    setClassId({state}, classId) {
      state.classId = classId;
      setItem('classId', classId);
    },
    // 2.获取信息，是否登录。
    // getInfo ({ state }) {
    //   return new Promise(resolve => {
    //     var r = state.asyncRouterMap
    //     router.addRoutes(r)
    //     state.user.loginStatus = true
    //     resolve(1)
    //   })
    // },
    // 3.remove清除用户信息
    removeLogin () {
      console.log('remove')
      removeItem('token')
      removeItem('role');
      removeItem('classId');
      // window.location.reload();
    }
  },
  modules: {
    addRouter,
    students,
    wristband,
    condition,
    teachers,
    classes,
    school,
    admin
  }
})