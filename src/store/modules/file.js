import { asyncRouterMap } from '../../router/asyncRouterMap'
import router from '../../router/index'
import fx from '../../util/fx'
const file = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // 通过文件导入教师/teacher/importByFile
    uploadTeachers({state, rootState}, data) {
      return new Promise((resolve,reject) => {
        let url = "/teacher/importByFile";
        // let Authorization = rootState.Authorization;
        let methods = 'post';
        console.log(data)
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          resolve(res);
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 通过列表更新课程表项 /course/course-item/updateByList
    updateCourseByList({state, rootState}, data) {
      // console.log(data)
      return new Promise((resolve,reject) => {
        let url = "/course/course-item/updateByList";
        // let Authorization = rootState.Authorization;
        let methods = 'patch';
        // console.log(data)
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          resolve(res);
          // dispatch('getActivityItemList', table.tableId)
          // .then(d => {
          //   resolve(d);
          // })
        }).catch(err => {
          console.log(err)
        })
      })
    },
    //5.上传学生列表
    uploadStudentFile({state}, file) {
      return new Promise((resolve,reject) => {
        let url = '/student/importByFile';
        let methods = 'post';
        let data = file;
        // let Authorization = rootState.Authorization;
        fx.uploadConnect({state}, {url, methods, data})
        .then(res => {
          console.log(res.data.data);
          resolve(1);
        }).catch(err => {
          console.log(err);
        })
      })
      
    },
    //通过文件绑定手环/band/importByFile
    uploadBandFile({state, rootState}, file) {
      return new Promise((resolve,reject) => {
        let url = '/band/importByFile';
        let methods = 'post';
        let data = file;
        let Authorization = rootState.Authorization;
        fx.uploadConnect({state}, {url, methods, data, Authorization})
        .then(res => {
          console.log(res.data.data);
          resolve(1);
        }).catch(err => {
          console.log(err);
        })
      })
    },
  }
}
export default file
