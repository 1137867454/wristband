import { asyncRouterMap } from '../../router/asyncRouterMap'
import router from '../../router/index'
import fx from '../../util/fx'
const addRouter = {
  state: {
    asyncRouterMap_: {},
    user: {
      role: '',
      type: '',
      classId: ''
    },
    activeIndex: '',
  },
  getters: {
    getRouter: state => state.asyncRouterMap_,
    getUser: state => state.user,
    get_active_index: state => state.activeIndex
  },
  mutations: {
    set_router ({ state, rootstate }) {
      // console.log('addRouter')
      // rootstate.user.loginStatus = true
      router.addRoutes(asyncRouterMap_)
    },
    set_activeIndex({ state },route) {
      state.user = 'route';
    }
  },
  actions: {
    set_router ({ state, rootState, dispatch }) {
      return new Promise( (resolve, reject) =>{
        console.log('addRouter')
        state.asyncRouterMap_ = asyncRouterMap;
        let addrouter = state.asyncRouterMap_;
        state.user.role = rootState.role;
        if(state.user.role == 'teacher' || state.user.role == 'PEteacher'){
          addrouter.forEach((v, i) => {
            if(v.menu.includes('teacher')){
              v.children = v.children.filter(vc => {
                return !vc.menu;
              })
            }
          })
        }
        // if(state.user.role == 'teacher'){
        //   dispatch('teacherType');
        //   dispatch('getClassId');
        // }
        state.user.type = localStorage.getItem('type');
        state.asyncRouterMap_ = addrouter.filter(v => {
          return v.menu.includes(rootState.role);
        })
        router.addRoutes(state.asyncRouterMap_);
        resolve(1);
      })
    },
    //获取老师具体分类 /teacher/getType
    // teacherType({state, rootState}) {
    //   let url = '/teacher/getType';
    //   let Authorization = rootState.Authorization;
    //   fx.setConnect({state}, {url, Authorization})
    //   .then(res => {
    //     if(res.data.data){
    //       state.user.type = res.data.data;
    //     }
    //   }).catch( err => {
    //     console.log(err);
    //   })
    // }
  }
}
export default addRouter
