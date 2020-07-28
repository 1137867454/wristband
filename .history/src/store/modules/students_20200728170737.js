import fx from '../../util/fx'
import api_ from '../../util/api_'
import axios from 'axios'
const students = {
  state: {
    s_key: true,
    studentData: [
    ],
    classStudent: [],
    gradeStudent: []
  },
  getters: {
    getStudents: state => state.studentData,
    get_class_student: state => state.classStudent,
    get_grade_student: state => state.gradeStudent
  },
  mutations: {
    setData ({ state }, i, student) {
      state.studentData[i] = student
    }
  },
  actions: {
    // 1.学生添加
    // I)图片上传 /media/uploadImage
    uploadImage ({ state, rootState, dispatch}, file) {
      return new Promise((resolve, reject) => {
        // let url = "/media/uploadImage"
        // let methods = 'post'
        let Authorization = rootState.Authorization;
        // let data = file;
        // fx.setConnect({state}, {url, methods, data, Authorization })
        axios({
          url: 'http://120.24.253.177:8777/media/uploadImage',
          method: 'post',
          headers: {
            'Authorization': Authorization
          },
          data: file
        }).then( res => {
          console.log(res);
          resolve(res.data.data);
        })
        .catch( error => {
          console.log(error);
        })
      })
    },
    addStudent ({ state, rootState, dispatch}, student) {
      return new Promise((resolve, reject) => {
        let url = "/student/add"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = student;
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
          student.id = res.data.data;
          dispatch('getStudentData');
          resolve(1);
          // state.studentData.push(student);
          console.log(res);
        }).catch( error => {
          console.log(error);
        })
      })
    },
    // 2.学生删除
    deleteStudent ({ state, rootState, dispatch }, studentId) {
      let url = "/student/" + studentId + "?studentId=" + studentId;
      let methods = 'delete';
      let data = {studentId};
      console.log(data);
      let Authorization = rootState.Authorization;
      fx.setConnect({state}, {url, methods, data, Authorization })
      .then( res => {
        // student.id = res.data.data;
        dispatch('getStudentData');
        console.log(res);
      }).catch( error => {
        console.log(error);
      })
    },
    // 3./student/{studentId} 更新学生部分信息

    updateStudent ({ state, commit, rootState, dispatch }, data) {
      return new Promise((resolve, reject) => {
        console.log(data);
        let studentId = data.id;
        let url = `/student/${studentId}?studentId=${studentId}`
        let methods = 'patch';
        let Authorization = rootState.Authorization;
        fx.setConnect({state}, { url, data, methods, Authorization})
        .then(res => {
          resolve(res);
          dispatch('getStudentData');
        }).catch(err => {
          resolve(res)
        })
        // api_({
        //   url: '/brand/updateStudent',
        //   method: 'post',
        //   data: student
        // }).then(res => {
        //   console.log(res);
        //   resolve(res)
        // }).catch(err => {
        //   console.log(err)
        // })
      })
    },
    // 4. 查询学生信息：
    getStudentData({state, rootState}) {
      return new Promise( (resolve, reject) => {
        let url = '/student/getStudentList'
        // let Authorization = rootState.Authorization;
        fx.setConnect({ state }, { url, Authorization })
        .then( res => {
          let arr = res.data.data;
          state.studentData = arr;
          resolve(arr);
        }).catch(err => {
          console.log(err)
        })
      })
      },
      //5.上传学生列表
      uploadStudentFile({state, rootState}, file) {
        return new Promise((resolve,reject) => {
          let url = '/student/importByFile';
          let methods = 'post';
          let data = file;
          // let Authorization = rootState.Authorization;
          fx.uploadConnect({state}, {url, methods, data, Authorization})
          .then(res => {
            console.log(res.data.data);
            resolve(1);
          }).catch(err => {
            console.log(err);
          })
        })
        
      },
      //6.获取某一年级学生列表/student/getStudentListByGradeId
      getGradeStudent_({state, rootState}, gradeId) {
        return new Promise((resolve,reject) => {
          let url = '/student/getStudentListByGradeId?gradeId=' + gradeId;
          let Authorization = rootState.Authorization;
          fx.setConnect({ state }, { url, Authorization })
          .then( res => {
            // let arr = res.data.data;
            state.gradeStudent = res.data.data;
            // arr.forEach((v,i) => {
            //   state.studentData.push(v)
            // })
            console.log(res.data);
            resolve(res.data.data);
          }).catch(err => {
            console.log(err)
          })
          })
        },
        //7.获取某班学生列表/student/getStudentListByClassId
        getClassStudent_({state, rootState},classId) {
          return new Promise((resolve, reject) => {
            if(!classId) {
              classId = rootState.classId;
            }
            let url = '/student/getStudentListByClassId?classId=' + classId;
            let Authorization = rootState.Authorization;
            fx.setConnect({ state }, { url, Authorization })
            .then( res => {
              state.classStudent = res.data.data;
              console.log(res.data);
              resolve(res.data.data);
            }).catch(err => {
              console.log(err)
            })
          })  
        }
        
  }
}
export default students
