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
    heartBeat({state, rootState}) {
      console.log('heartBeat')
      return new Promise( (resolve, reject) => {
        let url = `/heatbeat/${studentId}`;
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
