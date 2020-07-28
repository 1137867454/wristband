import fx from '../../util/fx'
import { getItem } from '../../util/localStorage'
import api_ from '../../util/api_'

const classes = {
  state: {
    classAttendenceList: [], //班级考勤列表
    oneCourseAttendence: [], //所有班级在某节课的考勤list表
    gradeId_ClassList: [],   //一个年级的所有班级列表
    classNotice: [],         //班级通知列表
    AttendenceListByDate: [] //通过日期获取考勤列表
  },
  getters: {
    get_ClassAttendence_List: state => state.classAttendenceList,
    get_ClassList_ByGradeId: state => state.gradeId_ClassList,
    get_ClassNotice: state => state.classNotice,
    get_AttendenceList_ByDate: state => state.AttendenceListByDate
  },
  mutations: {
    setClassListByGradeId: (state, data) => state.gradeId_ClassList = data,
    setClassNotice: (state, data) => state.classNotice = data,
    set_AttendenceListByDate: (state, data) => state.AttendenceListByDate = data
  },
  actions: {
    // 获取班级考勤概览 /clockin/class-clock-in-record/getClassClockInOverview/{classId}/{clockInId}
    getOneCourseAttendence({state, rootState}, data) {
      return new Promise((resolve, reject) => {
        let url = `/clockin/class-clock-in-record/getClassClockInOverview/${data.classId}/${data.clockInId}`
        let Authorization = rootState.Authorization;
        fx.setConnect({state},{url, Authorization})
        .then(res => {
          console.log(res.data.data);
          state.oneCourseAttendence = res.data.data;
          resolve(res.data.data);
        }).catch(err => {
          console.log(err);
        })
      }) 
    },
    // 根据日期获取考勤列表 /clockin/clock-in/getClockInListByDate/{date}
    getClassAttendenceList({state, rootState}, date) {
      return new Promise((resolve, reject) => {
        let url = `/clockin/clock-in/getClockInListByDate/${date}?date=${date}`
        let Authorization = rootState.Authorization;
        fx.setConnect({state},{url, Authorization})
        .then(res => {
          console.log(res.data.data);
          state.classAttendenceList = res.data.data;
          resolve(res.data.data);
        }).catch(err => {
          console.log(err);
        })
      }) 
    },
    // 根据年级id获取某年级班级列表 /classinfo/getClassListByGradeId
    getClassListByGradeId({state, rootState, commit}, gradeId) {
      return new Promise((resolve, reject) => {
        let url = `/classinfo/getClassListByGradeId?gradeId=${gradeId}`;
        let Authorization = rootState.Authorization;
        fx.setConnect({state},{url, Authorization})
        .then(res => {
          commit('setClassListByGradeId', res.data.data);
          resolve(res.data.data);
        }).catch(err => {
          console.log(err);
        })
      }) 
    },
    //获取公告信息
    getClassNotice({state, commit, rootState}, classId){
      return new Promise((resolve, reject) => {
        console.log('获取公告信息')
        if(!classId) {
          classId = rootState.classId;
        }
        api_({
          url: `/brand/getNotificationByClassId?classId=${classId}`,
          method: 'get',
        }).then(res => {
          commit('setClassNotice', res.data.data);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    // 查询某人某天考勤列表 /clockin/student-clock-in-record/getRecordList
    getSomeoneRecords({state, commit, rootState}) {
      return new Promise((resolve, reject) => {
        console.log('获取考试信息')
        let url = '/clockin/student-clock-in-record/getRecordList';
        let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url, Authorization})
        .then(res => {
          console.log(res);
          commit('set_LeaveRecords', res.data.data);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    // 根据日期获取考勤列表 /clockin/clock-in/getClockInListByDate/{date}
    getAttendenceListByDate({state, commit, rootState}, date) {
      return new Promise((resolve, reject) => {
        console.log('获取考试信息')
        let url = `/clockin/clock-in/getClockInListByDate/${date}?date=${date}`;
        let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url, Authorization})
        .then(res => {
          console.log(res);
          commit('set_AttendenceListByDate', res.data.data);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    // 获取班级考勤概览 /clockin/class-clock-in-record/getClassClockInOverview/{classId}/{clockInId}
    getClassAttendencesOverview({state, commit, rootState}, date) {
      return new Promise((resolve, reject) => {
        // let url = `/clockin/class-clock-in-record/getClassClockInOverview/{classId}/{clockInId}`;
        // let Authorization = rootState.Authorization;
        // fx.setConnect({state}, {url, Authorization})
        // .then(res => {
        //   console.log(res);
        //   commit('set_AttendenceListByDate', res.data.data);
        //   resolve(res);
        // }).catch(err => {
        //   reject(err);
        // })
      })
  }
}
export default classes
