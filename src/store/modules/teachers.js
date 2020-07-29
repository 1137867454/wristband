import fx from '../../util/fx'
import { getItem } from '../../util/localStorage'
import api_ from '../../util/api_'
import { Notification } from 'element-ui';
const teachers = {
  state: {
    ordinaryTeachers: [],   //普通老师列表（不含优秀教师）
    goodTeachers: [],       //优秀教师列表
    classTeachers: [],      //班级任课老师列表
    dutyList: [],           //值日生列表
    classLeader: [],         //班干部列表
    classPictures: [],       //班级相册
    classHonors: [],         //班级荣誉
    classWorks: [],           //班级作品
    classId: ''
  },
  getters: {
    getGoodTeachers: state => state.goodTeachers,
    getOrdinaryTeachers: state => state.ordinaryTeachers,
    get_ClassTeachers: state => state.classTeachers,
    get_dutyList: state => state.dutyList,
    get_classLeader: state => state.classLeader,
    get_ClassPictures: state => state.classPictures,
    get_ClassHonors: state => state.classHonors, 
    get_ClassWorks: state => state.classWorks 
  },
  mutations: {
    set_OrdinaryTeachers: (state, data) => state.ordinaryTeachers = data,
    set_GoodTeachers: (state, data) => state.goodTeachers = data,
    set_ClassTeachers: (state, data) => state.classTeachers = data,
    set_dutyList: (state, data) => state.dutyList = data,
    set_ClassLeader: (state, data) => state.classLeader = data,
    set_ClassPictures: (state, data) => state.classPictures = data,
    set_ClassHonors: (state, data) => state.classHonors = data,
    set_ClassWorks: (state, data) => state.classWorks = data
  },
  actions: {
    //获取未评定教师列表
    searchTeachers({state, rootState, commit}) {
      api_.get('/brand/getTeacherList')
      .then(res => {
        // console.log(res.data.data)
        if(res.data.data){
          commit('set_OrdinaryTeachers', res.data.data)
        }
      })
    },
    // 添加优秀教师 post /teacher/excellentTeacher
    addGoodTeacher({state, dispatch}, data){
      return new Promise((resolve, reject) => {
        let url = `/teacher/excellentTeacher`;
        let methods = 'post'
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          // dispatch('searchTeachers');
          dispatch('getGoodTeacherList');
          resolve()
        }).catch(err => {
          reject()
        })
      })
    },
    // 获取优秀教师列表 get /teacher/excellentTeacher/list
    getGoodTeacherList({state, rootState, commit, dispatch}){
      let url = `/teacher/excellentTeacher/list`;
      fx.setConnect({state}, {url})
      .then(res => {
        console.log('...........................')
        commit('set_GoodTeachers', res.data.data)
      })
      // api_.get('/brand/getTeacherList?cpuId=123')
      // .then(res => {
      //   commit('set_GoodTeachers', res.data.data)
      //   // dispatch('searchTeachers');
      //   // dispatch('getGoodTeacherList');
      // })
    },
    // 删除优秀教师 delete /teacher/excellentTeacher/{teacherId}
      deleteGoodTeacher({state, rootState, dispatch}, id){
        console.log(id)
        let methods = 'delete';
        let url = `/teacher/excellentTeacher/${id}?teacherId=${id}`
        fx.setConnect({state}, {url, methods})
        .then(res => {
          dispatch('searchTeachers');
          dispatch('getGoodTeacherList');
        }).catch(err => {

        })
        // api_({
        //   url: '/brand/setExcellent',
        //   method: 'post',
        //   data: id
        // })
        // .then(res => {
        //   dispatch('searchTeachers');
        //   dispatch('getGoodTeacherList');
        // }).catch(err => {
        //   console.log(err)
        // })
      },
      //值日安排
      setDutyList({state, rootState, dispatch}, onDutyList){
        api_({
          url: '/brand/setOnDuty',
          method: 'post',
          data: onDutyList
        })
        .then(res => {
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取值日生
      getDutyList({state, rootState, commit, getters}){
        // console.log(rootState.classId);
        // console.log(rootState.addRouter.user.classId)
        let classId = rootState.classId;
          // if(!classId) {
          //   classId = '1266270271577264130';
          // }
        if(classId) {
          api_.get(`/brand/getOnDutyListById?classId=${classId}`)
          .then(res => {
            console.log(res)
            commit('set_dutyList', res.data.data)
          }).catch(err => {
            console.log(err)
          })
        }else{
          // Notification.error({
          //   title: '错误',
          //   message: '您不是班主任'
          // })
        }
      },
      delOnDutyListById({state, rootState, dispatch}, id) {
        return new Promise((resolve, reject) => {
          api_({
            url: `/brand/delOnDutyListById?id=${id}`,
            method: 'post',
            // data: teachers
          })
          .then(res => {
            console.log(res);
            dispatch('getDutyList');
          }).catch(err => {
            console.log(err)
          })
        })
      },
      //添加班干部
      addClassLeader({state, rootState, dispatch}, classLeader) {
        // console.log(rootState.addRouter.user.classId);
        api_({
          url: '/brand/addClassLeader',
          method: 'post',
          data: classLeader
        })
        .then(res => {
          dispatch('getClassLeader');
        }).catch(err => {
          console.log(err)
        })
      },
      // 删除班干部
      delClassLeader({state, rootState, dispatch}, id) {
        return new Promise((resolve, reject) => {
          api_({
            url: `/brand/delClassLeader?id=${id}`,
            method: 'post',
            // data: teachers
          })
          .then(res => {
            console.log(res);
            dispatch('getClassLeader');
          }).catch(err => {
            console.log(err)
          })
        })
      },
      // 获取班干部列表
      getClassLeader({state, rootState, commit}) {
        return new Promise((resolve, reject) => {
          console.log('班干部列表')
          let classId = rootState.classId; 
          // if(!classId) {
          //   classId = '1266270271577264130';
          // }
          api_.get(`/brand/getClassLeaderLists?classId=${classId}`)
          .then(res => {
            console.log(res)
            commit('set_ClassLeader', res.data.data)
          }).catch(err => {
            console.log(err);
          })
        })
      },
      //添加任课老师
      addClassTeacher({state, rootState, dispatch}, classTeacher) {
        return new Promise((resolve, reject) => {
          api_({
            url: '/brand/addClassTeachers',
            method: 'post',
            data: classTeacher
          })
          .then(res => {
            resolve(res);
            dispatch('getClassTeachers');
          }).catch(err => {
            reject(err)
            console.log(err)
          })
        })
      },
      // 删除任课老师
      delClassTeacher({state, rootState, dispatch}, id) {
        return new Promise((resolve, reject) => {
          api_({
            url: `/brand/delClassTeachers?id=${id}`,
            method: 'post',
            // data: teachers
          })
          .then(res => {
            console.log(res);
            dispatch('getClassTeachers');
          }).catch(err => {
            console.log(err)
          })
        })
      },
      // 获取任课老师列表
      getClassTeachers({state, rootState, commit},id) {
        return new Promise((resolve, reject) => {
          let classId = rootState.classId; 
          // if(!classId) {
          //   classId = '1266270271577264130';
          // }
          api_.get(`/brand/getClassTeachers?id=${classId}`)
          .then(res => {
            console.log(res)
            commit('set_ClassTeachers', res.data.data)
          }).catch(err => {
            console.log(err);
          })
        })
      },
      // 添加班级相册
      uploadAlbum({state, rootState, commit}, uploadFile) {
        return new Promise((resolve, reject) => {
          console.log('ksjlkfjlkj')
          let classId = rootState.classId; 
          // if(!classId) {
          //   classId = '1266270271577264130';
          // }
          api_({
            url: `/brand/setClassPicture/${classId}`,
            method: 'post',
            data: uploadFile
          }).then(res =>{
            resolve(res);
            console.log(res)
          }).catch(err => {
            console.log(err);
          })
        })
      },
      // 查询班级相册
      getClassPictures({state, rootState, commit}, id) {
        return new Promise((resolve, reject) => {
          let classId = rootState.classId; 
          // if(!classId) {
          //   classId = '1266270271577264130';
          // }
          api_.get(`/brand/getClassPictures?classId=${classId}`)
          .then(res => {
            console.log(res)
            commit('set_ClassPictures', res.data.data)
          }).catch(err => {
            console.log(err);
          })
        })
      },
      // 班级相册删除 /delClassInfoPicture
      delClassPictureByIds({state, rootState, commit, dispatch}, id) {
        return new Promise((resolve, reject) => {
          api_({
            url: `/brand/delClassPictureByIds`,
            method: 'post',
            data: id
          })
          .then(res => {
            console.log(res);
            dispatch('getClassPictures');
          }).catch(err => {
            console.log(err)
          })
        })
      },
      // 班级相册清空 /delClassInfoPicture
      delClassPictures({state, rootState, commit, dispatch}, id) {
        return new Promise((resolve, reject) => {
          api_({
            url: `/brand/delClassInfoPicture?id=${id}`,
            method: 'post',
            // data: teachers
          })
          .then(res => {
            console.log(res);
            dispatch('getClassPictures');
          }).catch(err => {
            console.log(err)
          })
        })
      },
      //添加班级荣誉
      addClassHonor({state, rootState, dispatch}, honour) {
      return new Promise((resolve, reject) => {
        let url_ = '/brand/addHonor';
        api_({
          url: url_,
          method: 'post',
          data: honour
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
          console.log(err);
        })
      })
    },
    //添加班级荣誉图片
      addClassHonorPic({state, rootState, dispatch}, uploadFile) {
        return new Promise((resolve, reject) => {
          api_({
            url: '/brand/addHonorPic',
            method: 'post',
            data: uploadFile
          }).then(res => {
            // dispatch('getHonor')
            resolve(1);
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        })
      },
      // // 班级荣誉添加
      // addClassHonor({state, rootState, commit, dispatch}, honour) {
      //   return new Promise((resolve, reject) => {
      //     api_.get('/brand/addHonor?classId=1266270271577264130')
      //     .then(res => {
      //       console.log('...............')
      //       console.log(res.data.data)
      //       let data = res.data.data;
      //       // data.forEach(v => v.showClose = false);
      //       commit('set_ClassHonors', res.data.data)
      //     }).catch(err => {
      //       console.log(err);
      //     })
      //   })
      // },
      // 查询班级荣誉
      getClassHonors({state, rootState, commit}, id) {
        return new Promise((resolve, reject) => {
          let classId = rootState.classId;
          // if(!classId) {
          //   classId = '1266270271577264130';
          // }
          console.log('classId:  ' + classId)
          api_.get(`/brand/getClassHonorList?classId=${classId}`)
          .then(res => {
            // console.log('...............')
            // console.log(res)
            let data = res.data.data;
            data.forEach(v => v.showClose = false);
            commit('set_ClassHonors', res.data.data)
          }).catch(err => {
            console.log(err);
          })
        })
      },
      // 班级荣誉删除 /delClassInfoPicture
      // deleteHonor({state, dispatch, rootState}, id) {
      //   return new Promise((resolve, reject) => {
      //     api_({
      //       url: `/brand/delHonorById?id=${id}`,
      //       method: 'get',
      //     }).then(res => {
      //       // .then(resp => {
      //       //   resolve(resp);
      //       // }).catch(error => {
      //       //   console.log(error)
      //       // })
      //     }).catch(err => {
      //       console.log(err)
      //     })
      //   })
      // },
      delClassHonorByIds({state, rootState, commit, dispatch}, id) {
        return new Promise((resolve, reject) => {
          api_({
            url: `/brand/delHonorById?id=${id}`,
            method: 'post',
            // data: id
          })
          .then(res => {
            console.log(res);
            dispatch('getClassHonors');
          }).catch(err => {
            console.log(err)
          })
        })
      },
      // // 班级荣誉清空 /delClassInfoPicture
      // delClassPictures({state, rootState, commit, dispatch}, id) {
      //   return new Promise((resolve, reject) => {
      //     api_({
      //       url: `/brand/delClassInfoPicture?id=${id}`,
      //       method: 'post',
      //       // data: teachers
      //     })
      //     .then(res => {
      //       console.log(res);
      //       dispatch('getClassPictures');
      //     }).catch(err => {
      //       console.log(err)
      //     })
      //   })
      // },
      // 添加班级作品 /setClassAuthorPic
      addClassWorks( {state, rootState, commit, dispatch}, classAuthor ) {
        return new Promise((resolve, reject) => {
          
          classAuthor.classId = rootState.classId;
          api_({
            url: '/brand/setClassAuthor',
            method: 'post',
            data: classAuthor
          })
          .then(res => {
            console.log(res)
            // let data = res.data.data;
            // data.forEach(v => v.showClose = false);
            dispatch('getClassWorks')
            resolve(1);
          }).catch(err => {
            console.log(err);
          })
        });
      },
      addWorkPictures( {state, rootState, commit, dispatch}, formData ) {
        return new Promise((resolve, reject) => {
          api_({
            url: '/brand/setClassAuthorPic',
            method: 'post',
            data: formData
          })
          .then(res => {
            console.log(res)
            // let data = res.data.data;
            dispatch('getClassWorks');
            resolve(res.data.data);
          }).catch(err => {
            console.log(err);
          })
        })
      },
      // 查询班级作品
      getClassWorks({state, rootState, commit}, id) {
        console.log('查询班级作品')
        return new Promise((resolve, reject) => {
          let classId = rootState.classId; 
          // if(!classId) {
          //   classId = '1266270271577264130';
          // }
          api_.get(`/brand/getClassAuthorById?classId=${classId}`)
          .then(res => {
            let data = res.data.data;
            data.forEach(v => v.showClose = false);
            commit('set_ClassWorks', data)
          }).catch(err => {
            console.log(err);
          })
        })
      },
      // 班级作品删除 /delClassAuthor
      delClassWorks({state, rootState, commit, dispatch}, id) {
        return new Promise((resolve, reject) => {
          api_({
            url: `/brand/delClassAuthor?id=${id}`,
          })
          .then(res => {
            console.log(res);
            dispatch('getClassWorks');
          }).catch(err => {
            console.log(err)
          })
        })
      },
  }
}
export default teachers
