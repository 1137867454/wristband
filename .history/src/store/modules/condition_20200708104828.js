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
    hearBeat() {
      console.log(heartBeat)
    }
  }
}
export default condition
