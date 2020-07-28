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
    heartBeat() {
      console.log('heartBeat')
      return new Promise( (resolve, reject) => {
        let url = `/heatbeat/${studentId}`;
        fx.setConnect({state}, url)
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })        
      })
    }
  }
}
export default condition
