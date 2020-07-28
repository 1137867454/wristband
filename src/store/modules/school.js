import fx from '../../util/fx'
import { setItem, getItem } from '../../util/localStorage'

const school = {
  state: {
    // {
    //   schoolInputDTO: {
    //     address: "广东省深圳市固戍",
    //     manageEmail: "1137867444@qq.com",
    //     managePhone: "123456",
    //     name: "廉江"
    //   },
    //   schoolManagerInputDTO: {
    //     account: "lian123456",
    //     password: "123456"
    //   }
    // }
    school: [],
    teachers: [
    ],
    grades: []

  },
  getters: {
    getSchool: state => state.school
  },
  mutations: {
  },
  actions: {
    
    //学校添加**********************
    addSchool({state, rootState}, school_) {
      console.log('addSchool')
        let url = "/school/add"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = school_;
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
          // school_.id = res.data.data;
          // state.school.push(school_);
          console.log(res);
        }).catch( error => {
          console.log(error);
        })
      },
    //获取学校列表 /school/getSchoolList
    getSchoolList({state, rootState}) {
      let url = "/school/getSchoolList"
      let Authorization = rootState.Authorization;
      fx.setConnect({state}, {url, Authorization })
      .then( res => {
        state.school = res.data.data;
        console.log(res);
      }).catch( error => {
        console.log(error);
      })
      console.log('getSchool')
    },
    //添加系统管理员
    addSysManager({state, rootState}, manager) {
      let url = "/sysmanager/add"
      let methods = 'post'
      let Authorization = rootState.Authorization;
      let data = manager;
      fx.setConnect({state}, {url, methods, data, Authorization })
      .then( res => {
        console.log(res);
      }).catch( error => {
        console.log(error);
      })
    }
  }
}
export default school
