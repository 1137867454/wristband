import fx from '../../util/fx'
import api_ from '../../util/api_'
import { getItem } from '../../util/localStorage'

const admin = {
  state: {
    teachers: [],    //教师表,
    classroom: [],
    classData: [    //班级表格
    ],
    selects: [],    //班级筛选表
    grades: [],     //年级表
    typeList: [],   //考勤类型列表
    clockInList: [], //考勤表
    schedule: [],    //作息表,
    courseList: [],  //课程项目表,
    courseTable: [],  //课程表
    notice: [],       //公告消息表
    video: [],        //微课列表
    schoolHonor: [],  //学校荣誉
    examination: [],  //考试通知
    leaveRecords: []  //离校记录
  },
  getters: {
    getTeachers: state => state.teachers,
    getClasses: state => state.classData,
    getGrade: state => state.grades,
    getOptions: state => state.selects,
    get_ClockList: state => state.clockInList, //考勤列表
    get_TypeList: state => state.typeList, //考勤类型列表
    get_ClassroomList: state => state.classroom,
    get_schedule: state => state.schedule,
    get_CourseList: state => state.courseList, //获取课程列表
    getCourseTable: state => state.courseTable,
    get_notice: state => state.notice,
    get_video: state => state.video,
    get_schoolHonor: state => state.schoolHonor,
    get_examination: state => state.examination,
    get_leaveRecords: state => state.leaveRecords
  },
  mutations: {
    set_class_select(state) {
      fx.classSelect(state);
    },
    setNotice(state, data) {
      state.notice = data;
    },
    setVideo(state, data) {
      state.video = data;
    },
    setSchoolHonor(state, data) {
      state.schoolHonor = data;
    },
    setExamination(state, data) {
      state.examination = data;  
    },
    set_LeaveRecords(state, data) { //设置离校记录
      state.leaveRecords = data;
    },
    set_teachers(state, data) {
      state.teachers = data;
    }
  },
  actions: {
    //年级管理*********************
    // 1.获取年级信息
    GradeList({state,rootState}, commands) {
        var url = '/grade/getGradeList'
        var Authorization = rootState.Authorization;
      fx.setConnect({ state }, { url, Authorization })
      .then( res => {
        let arr = res.data.data;
        console.log(arr.length)
        state.grades = arr;
        }).catch(err => {
          console.log(err)
        })
    },
    //添加年级:
    addGrade({state, rootState,dispatch}, grade) {
      let url = "/grade/add"
      let methods = 'post'
      let Authorization = rootState.Authorization;
      let data = grade;
      console.log(grade)
      fx.setConnect({state}, {url, methods, data, Authorization })
      .then( res => {
        dispatch('GradeList', 'add')
      }).catch( error => {
        console.log(error);
      })
    },
    //添加教室/place/add
    addClassroom({ state, rootState, dispatch }, classroom) {
      console.log(classroom)
      let url = "/place/add"
      let methods = 'post'
      let Authorization = rootState.Authorization;
      let data = classroom;
      // console.log(classroom)
      fx.setConnect({state}, {url, methods, data, Authorization })
      .then( res => {
        dispatch('getClassroomList');
      }).catch( error => {
        console.log(error);
      })
    },
    // 删除地点/place/{placeId}
    deletePlace({state, rootState, dispatch}, placeId) {
      let url = `place/${placeId}?placeId=${placeId}`;
      let methods = 'delete';
      let Authorization = rootState.Authorization;
      fx.setConnect({state}, {url, methods, Authorization})
      .then(res => {
        dispatch('getClassroomList');
      }).catch(err => {
        console.log(err);
      })
    },
    //获取教室列表/place/list
    getClassroomList( {state, rootState} ) {
      return new Promise((resolve, reject) => {
        let url = '/place/list'
        let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url, Authorization})
        .then( res => {
          // console.log(res.data.data);
          let arr = res.data.data;
          state.classroom = arr;
          // fx.classSelect(state);
          resolve(res);
          // console.log(state.selects)
        }).catch(error => {
          // console.log(error);
        })
      })
  },
    //添加班级********************
    addClass_ ({ state, rootState, dispatch }, class_) {
      console.log(class_)
      return new Promise((resolve, reject) => {
        let url = "/classinfo/add"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = class_;
        // console.log(class_)
        console.log(state.classData)
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
          dispatch('getClassSelect');
          resolve(1);
        }).catch( error => {
          console.log(error);
        })
      })
    },
    
    //添加班主任，如果已存在则更新 /classinfo/addClassTeacher
    addHeadMaster({state, rootState, dispatch}, data) {
      return new Promise((resolve, reject) => {
        let url = '/classinfo/addClassTeacher';
        let methods = 'patch';
        let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url, methods, data, Authorization})
        .then(res => {
          console.log(res);
          resolve(1);
          dispatch('getClassSelect')
        }).catch(err => {
          console.log(err);
        })
      })
    },
    // 班级升年级 /classinfo/upgrade/{classId}
    upgrade({state, dispatch}, classId) {
      let url = `/classinfo/upgrade/${classId}?classId=${classId}`;
      let methods = 'patch';
      fx.setConnect({state}, {url, methods})
      .then(res => {
        dispatch('getClassSelect')
      })
    },
    //获取班级信息
    getClassSelect( {state,rootState, commit }, byName) {
        return new Promise((resolve, reject) => {
          let url = '/classinfo/getClassList'
          let Authorization = rootState.Authorization;
          fx.setConnect({state}, {url, Authorization})
          .then( res => {
            // console.log(res.data.data);
            let arr = res.data.data;
            state.classData = arr;
            // if(byName) {
            //   fx.classSelect_Name(state);
            // }
            resolve(res.data.data);
            fx.classSelect(state);
            console.log(state.selects)
            // commit('set_class_select');
          }).catch(error => {
            console.log(error);
          })
        })
    },
    // 1.老师添加**********************
    addTeacher ({ state, rootState, dispatch }, teacher) {
      // state.teachers.push(teacher)
      console.log(teacher)
      // state.t_key = true;
      return new Promise((resolve, reject) => {
        var methods = 'post';
      var url = '/teacher/add';
      var data = teacher;
      var Authorization = rootState.Authorization;
      fx.setConnect({state},{url,methods,data,Authorization})
      .then(res => {
        console.log(res);
        resolve(1)
        // state.teachers.push(teacher);
        dispatch('getTeachersInfo');
        // state.teachers.push(res.data.data);
      }).catch(err => {
        console.log(err);
      })
      })
    },
    // 删除教师信息 /teacher/{teacherId}
    deleteTeacher({state, dispatch}, teacherId){
      return new Promise( (resolve, reject) => {
        let url = `/teacher/${teacherId}?teacherId=${teacherId}`;
        let methods ='delete'
        fx.setConnect({state}, {url, methods})
      }).then(res => {
        dispatch('getTeachersInfo');
        console.log('lsjfksjfks')
        // resolve(1);
        }).catch(err => {
          console.log(err);
        })
    },
    // 修改老师信息
    updateTeacher( {state, rootState,dispatch}, teacher ) {
      return new Promise( (resolve, reject) => {
        api_({
          url: '/brand/updateTeacher',
          method: 'post',
          data: teacher
        }).then(res => {
          dispatch('getTeachersInfo');
          resolve(1);
        }).catch(err => {
          console.log(err);
        })
      })
    },
    // 2.获取老师信息 success;
    getTeachersInfo ({ state, commit }) {
      // state.teachers = [];
        var url = '/teacher/list'
        // var Authorization = rootState.Authorization;
      fx.setConnect({ state }, { url })
      .then( res => {
        let arr = res.data.data;
        // state.teachers = arr;
        commit('set_teachers', arr);
          console.log(res.data);
        }).catch(err => {
          console.log(err)
        })
    },
    // 3./teacher/getType 获取教师具体分类
    getTeacherType({state}) {
      // var methods = 'post';
      var url = '/teacher/getType';
      var Authorization = rootState.Authorization;
      fx.setConnect({state},{url, Authorization})
      .then(res => {
        console.log(res);
        // state.teachers.push(res.data.data);
      }).catch(err => {
        console.log(err);
      })
    },
    //获取作息表列表 /clockin/activity-schedule-table/getActivityTableList
    getActivityTableList({state, rootState}) {
      return new Promise((resolve, reject) => {
        let url = '/clockin/activity-schedule-table/getActivityTableList';
        let Authorization = rootState.Authorization;
        fx.setConnect({state},{url, Authorization})
        .then(res => {
          console.log(res.data.data);
          state.schedule = res.data.data;
          // state.teachers.push(res.data.data);
          resolve(res.data.data);
        }).catch(err => {
          console.log(err);
        })
      })
    },
    // 添加作息表/clockin/activity-schedule-table/add
    workRestAdd({state, rootState, dispatch}, table) {
      return new Promise((resolve,reject) => {
        let url = "/clockin/activity-schedule-table/add";
        let Authorization = rootState.Authorization;
        let methods = 'post';
        let data = table;
        fx.setConnect({state}, {url, Authorization, methods, data})
        .then(res => {
          dispatch('getActivityTableList');
          resolve(res);
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 删除作息表 /clockin/activity-schedule-table/{id}
    deleteWorkRest({state, rootState, dispatch}, id) {
      let url = `/clockin/activity-schedule-table/${id}?id=${id}`;
      let methods = 'delete';
      let Authorization = rootState.Authorization;
      fx.setConnect({state}, {url, methods, Authorization})
      .then(res => {
        dispatch('getActivityTableList');
      }).catch(err => {
        console.log(err);
      })
    },
    //更新作息表 /clockin/activity-schedule-table/update
    updateWorkRest({state, rootState, dispatch}, table) {
      return new Promise((resolve,reject) => {
        let url = "/clockin/activity-schedule-table/update";
        let Authorization = rootState.Authorization;
        let methods = 'patch';
        let data = table;
        console.log(data)
        fx.setConnect({state}, {url, Authorization, methods, data})
        .then(res => {
          dispatch('getActivityTableList');
          resolve(res);
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 获取作息表项列表/clockin/activity-item/getActivityItemList/{tableId}
    getActivityItemList({state, rootState}, tableId) {
      return new Promise((resolve, reject) => {
        let url = `/clockin/activity-item/getActivityItemList/${tableId}?tableId=${tableId}`;
        let Authorization = rootState.Authorization;
        fx.setConnect({state},{url, Authorization})
        .then(res => {
          // console.log(res.data.data);
          // state.schedule = res.data.data;
          // state.teachers.push(res.data.data);
          resolve(res.data.data);
        }).catch(err => {
          console.log(err);
        })
      })
    },
    // 删除作息表项 /clockin/activity-item/{id}
    deleteItem({state, rootState, dispatch}, id) {
      return new Promise( (resolve, reject) => {
        let url = `/clockin/activity-item/${id}?id=${id}`;
        let methods = 'delete';
        let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url, methods, Authorization})
        .then(res => {
          resolve(1);
          // dispatch('getActivityTableList');
        }).catch(err => {
          console.log(err);
        })
      })
    },
    //添加作息表项 /clockin/activity-schedule-table/addItem
    workRestItemAdd({state, rootState, dispatch}, table) {
      return new Promise((resolve,reject) => {
        let url = "/clockin/activity-schedule-table/addItem";
        let Authorization = rootState.Authorization;
        let methods = 'post';
        let data = table;
        console.log(data);
        fx.setConnect({state}, {url, Authorization, methods, data})
        .then(res => {
          resolve(res);
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 更新作息表项 /clockin/activity-item/update
    updateItemList({state, rootState, dispatch}, table) {
      return new Promise((resolve,reject) => {
        let url = "/clockin/activity-item/update";
        let Authorization = rootState.Authorization;
        let methods = 'patch';
        let data = table;
        console.log(data)
        fx.setConnect({state}, {url, Authorization, methods, data})
        .then(res => {
          dispatch('getActivityItemList', table.tableId)
          .then(d => {
            resolve(d);
          })
        }).catch(err => {
          console.log(err)
        })
      })
    },
    //获取课程列表 /course/getCourseList
    getCourseList({state, rootState}) {
      return new Promise((resolve, reject) => {
        let url = '/course/getCourseList';
        let Authorization = rootState.Authorization;
        fx.setConnect({state},{url, Authorization})
        .then(res => {
          console.log(res.data.data);
          state.courseList = res.data.data;
          resolve(res.data.data);
        }).catch(err => {
          console.log(err);
        })
      })
    },
    //添加课程 /course/add
    courseAdd({state, rootState, dispatch}, table) {
      return new Promise((resolve,reject) => {
        let url = "/course/add";
        let Authorization = rootState.Authorization;
        let methods = 'post';
        let data = table;
        console.log(data)
        fx.setConnect({state}, {url, Authorization, methods, data})
        .then(res => {
          dispatch('getCourseList');
          resolve(res);
        }).catch(err => {
          console.log(err)
        })
      })
    },
    //获取课程表列表 /course/course-table/getCourseTableList
    getCourseTable({state, rootState}) {
      return new Promise((resolve, reject) => {
        let url = '/course/course-table/getCourseTableList';
        let Authorization = rootState.Authorization;
        fx.setConnect({state},{url, Authorization})
        .then(res => {
          console.log(res);
          // console.log(res.data.data);
          state.courseTable = res.data.data;
          resolve(res.data.data);
        }).catch(err => {
          console.log(err);
        })
      })
    },
    //新建课程表 /course/course-table/add
    scheduleAdd({state, rootState, dispatch}, schedule ){
      return new Promise((resolve, reject) => {
        let url = "/course/course-table/add";
        let Authorization = rootState.Authorization;
        let methods = 'post';
        let data = schedule ;
        fx.setConnect({state}, {url, Authorization, methods, data})
        .then(res => {
          resolve(res);
          dispatch('getCourseList');
          console.log(res);
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 获取课程表项列表 /course/course-table/getCourseTable/{classId}
    getCourseTableItem({state, rootState}, classId) {
      return new Promise((resolve, reject) => {
        if(!classId) {
          classId = rootState.classId? rootState.classId : '1266270271577264130';
        }
        let url = `/course/course-table/getCourseTable/${classId}?classId=${classId}`;
        let Authorization = rootState.Authorization;
        fx.setConnect({state},{url, Authorization})
        .then(res => {
          console.log(res);
          console.log(res.data.data);
          // state.courseList = res.data.data;
          resolve(res.data.data);
        }).catch(err => {
          console.log(err);
        })
      })
    },
    //添加课程表项 /course/course-item/add
    scheduleItemAdd({state, rootState, dispatch}, schedules){
      let url = "/course/course-item/add";
      let Authorization = rootState.Authorization;
      let methods = 'post';
      let data = schedules;
      fx.setConnect({state}, {url, Authorization, methods, data})
      .then(res => {
        // dispatch('getClockInList');
        console.log(res);
      }).catch(err => {
        console.log(err)
      })
    },
    // 更新课程表项 /course/course-item/update
    updateCourseItem({state, rootState}, data) {
      return new Promise((resolve,reject) => {
        let url = "/course/course-item/update";
        let Authorization = rootState.Authorization;
        let methods = 'patch';
        console.log(data)
        fx.setConnect({state}, {url, Authorization, methods, data})
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
    // 通过列表更新课程表项 /course/course-item/updateByList
    updateCourseByList({state, rootState}, data) {
      // console.log(data)
      return new Promise((resolve,reject) => {
        let url = "/course/course-item/updateByList";
        let Authorization = rootState.Authorization;
        let methods = 'patch';
        // console.log(data)
        fx.setConnect({state}, {url, Authorization, methods, data})
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
    // 通过文件导入教师/teacher/importByFile
    uploadTeachers({state, rootState}, data) {
      return new Promise((resolve,reject) => {
        let url = "/teacher/importByFile";
        let Authorization = rootState.Authorization;
        let methods = 'post';
        console.log(data)
        fx.setConnect({state}, {url, Authorization, methods, data})
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
    //添加考勤类型：/clockin/clock-in/add
    clockListAdd({state, rootState, dispatch}, attendence){
      return new Promise((resolve, reject) => {
        let url = "/clockin/clock-in/add";
      let Authorization = rootState.Authorization;
      let methods = 'post';
      let data = attendence;
      fx.setConnect({state}, {url, Authorization, methods, data})
      .then(res => {
        dispatch('getClockInList');
        resolve(1);
      }).catch(err => {
        console.log(err)
      })
      })
    },
    //获取考勤列表：/clockin/clock-in/getClockInList
    getClockInList({state, rootState}) {
      let url = "/clockin/clock-in/getClockInList";
      let Authorization = rootState.Authorization;
      fx.setConnect({state}, {url, Authorization})
      .then(res => {
        state.clockInList = res.data.data;
        // console.log(res);
      }).catch(err => {
        console.log(err)
      })
    },
    //获取考勤类型列表 /clockin/clock-in-type/getClockInTypeList
    getClockInTypeList({state, rootState}) {
      let url = "/clockin/clock-in-type/getClockInTypeList";
      let Authorization = rootState.Authorization;
      fx.setConnect({state}, {url, Authorization})
      .then(res => {
        state.typeList = res.data.data;
        // console.log(res);
      }).catch(err => {
        console.log(err)
      })
    },
    //  获取离校记录/leaveschool/list
    getLeaveRecords({state, commit, rootState}) {
      return new Promise((resolve, reject) => {
        console.log('获取考试信息')
        let url = '/leaveschool/list';
        let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url, Authorization})
        .then(res => {
          console.log(res);
          commit('set_LeaveRecords', res.data.data);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
        // api_({
        //   url: '/leaveschool/list',
        //   method: 'get',
        // }).then(res => {
        //   console.log(res);
        //   commit('set_LeaveRecords', res.data.data);
        //   resolve(res);
        // }).catch(err => {
        //   reject(err);
        // })
      })
    },
    // 添加公告
    addNotice({state, dispatch, rootState}, notice){
      return new Promise((resolve,reject) => {
        api_({
          url:'/brand/setNotification',
          method: 'post',
          data: notice
        }).then(res => {
          dispatch('getNotice');
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //获取公告信息
    getNotice({state, commit, rootState}){
      return new Promise((resolve, reject) => {
        console.log('获取公告信息')
        api_({
          url: '/brand/getNotificationList',
          method: 'get',
        }).then(res => {
          commit('setNotice', res.data.data);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //删除公告消息
    deleteNotice({state, rootState,dispatch}, id) {
      return new Promise((resolve, reject) => {
        api_({
          url: `/brand/delNotificationById?id=${id}`,
          method: 'post',
        }).then(res => {
          dispatch('getNotice').then(resp => {
            resolve(resp);
          }).catch(error => {
            console.log(error)
          })
        }).catch(err => {
          console.log(err)
        })
      })
    },
    //添加考试通知
    addExamination({state, commit, dispatch, rootState}, examNotification){
      return new Promise((resolve,reject) => {
        api_({
          url:'/brand/setExamNotification',
          method: 'post',
          data: examNotification
        }).then(res => {
          resolve(res);
          dispatch('getExamination');
        }).catch(err => {
          reject(err);
        })
      })
    },
    //获取考试通知
    getExamination({state, commit, dispatch, rootState}) {
      return new Promise((resolve, reject) => {
        console.log('获取考试信息')
        api_({
          url: '/brand/getExamNotifications',
          method: 'get',
        }).then(res => {
          console.log(res);
          commit('setExamination', res.data.data);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //删除考试通知
    delExamination({state, rootState,dispatch}, id){
      return new Promise((resolve, reject) => {
        api_({
          url: `/brand/delExamNotification?id=${id}`,
          method: 'post',
        }).then(res => {
          dispatch('getExamination').then(resp => {
            resolve(resp);
          }).catch(error => {
            console.log(error)
          })
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 获取微课列表
    getVideo({state, commit, rootState}){
      return new Promise((resolve, reject) => {
        console.log('获取视频信息')
        api_({
          url: '/brand/getMicroClassLists',
          method: 'get',
        }).then(res => {
          console.log(res);
          commit('setVideo', res.data.data);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    deleteVideo({state, rootState,dispatch}, id) {
      return new Promise((resolve, reject) => {
        api_({
          url: `/brand/delMicroClass?id=${id}`,
          method: 'post',
        }).then(res => {
          dispatch('getVideo').then(resp => {
            resolve(resp);
          }).catch(error => {
            console.log(error)
          })
        }).catch(err => {
          console.log(err)
        })
      })
    },
    //添加荣誉
    addHonour({state, rootState, dispatch}, honour) {
      return new Promise((resolve, reject) => {
        let url_ = '/brand/addHonor';
        // if(honour.target) {
        //   url_ = '/brand/addHonor';
        //   delete honour.target;
        // }
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
    //添加荣誉图片
      addHonorPic({state, rootState, dispatch}, uploadFile) {
        return new Promise((resolve, reject) => {
          api_({
            url: '/brand/addHonorPic',
            method: 'post',
            data: uploadFile
          }).then(res => {
            dispatch('getHonor')
            resolve(1);
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        })
      },
    // 获取学校荣誉/getSchoolHonorList
      getHonor({state, commit, rootState}) {
        return new Promise((resolve, reject) => {
          console.log('获取学校荣誉')
          api_({
            url: '/brand/getSchoolHonorList',
            method: 'get',
          }).then(res => {
            console.log(res);
            let data = res.data.data;
            data.forEach(v => v.showClose = false);
            commit('setSchoolHonor', res.data.data);
            resolve(res);
          }).catch(err => {
            reject(err);
          })
        })
      },
      deleteHonor({state, dispatch, rootState}, id) {
        return new Promise((resolve, reject) => {
          api_({
            url: `/brand/delHonorById?id=${id}`,
            method: 'get',
          }).then(res => {
            dispatch('getHonor')
            // .then(resp => {
            //   resolve(resp);
            // }).catch(error => {
            //   console.log(error)
            // })
          }).catch(err => {
            console.log(err)
          })
        })
      }
  }
}
export default admin
