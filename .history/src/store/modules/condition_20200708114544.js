import fx from '../../util/fx';
const condition = {
  state: {
    students: []
  },
  getters: {
    // getTeachers: state => state.teachers,
    getCondition: state => state.students
  },
  mutations: {
  },
  actions: {
    //获取当天心率数据 /heartbeat/{studentId}

    heartBeat({state, rootState}, studentId) {
      console.log('heartBeat')
      return new Promise( (resolve, reject) => {
        let studentId = '1111461109'
        let url = `/heartbeat/${studentId}?studentId=${studentId}`;
        let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url, Authorization})
        .then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          console.log(err)
        })        
      })
    }
  }
}
export default condition
