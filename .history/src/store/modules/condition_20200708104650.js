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
    // 1.老师添加
    // addTeacher ({ state, commit }, teacher) {
    //   state.teachers.push(teacher)
    //   console.log(teacher)
    // },
    //
    // addClass_ ({ state, commit }, class_) {
    //   console.log(Array.isArray(state.classData))
    //   state.classData.push(class_)
    //   console.log(class_)
    // },
    // 2.学生删除
    // deleteClass_ ({ state, commit }, class_) {
    //   console.log('deleteClass_')
    //   console.log(class_)
    //   state.classData = state.classData.filter(v => {
    //     return !class_.join(',').includes(v.cid)
    //   })
    //   console.log(state.classData)
    // },
    // 3.学生信息修改
    // updateClass_ ({ state, commit }, class_) {
    //   console.log('updateClass_')
    //   console.log(class_)
    //   let index = class_.cid - 1
    //   state.classData[index] = class_
    //   state.classData.splice(index, 1, class_)
    // }
  }
}
export default condition
