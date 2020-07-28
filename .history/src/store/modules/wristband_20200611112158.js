import fx from '../../util/fx'
// import { getItem } from '../../util/localStorage'
const wristband = {
  state: {
    w_key: true,
    options: [],
    wristband: [], // 手环总表
    wristband_bindings: [], // 已绑定手环列表
    bluetooth: [],
    bindingList: []
  },
  getters: {
    getWristData: state => state.wristband,
    getBlueTooth: state => state.bluetooth,
    get_bindingList: state => state.bindingList,
    get_wristband_bindings: state => state.wristband_bindings
  },
  mutations: {
  },
  actions: {
    // 1.手环搜索
    WristbandData ({state, rootState}) {
      console.log('手环查询')
        var url = '/band/getBandList'
        var Authorization = rootState.Authorization;
        fx.setConnect({ state }, { url, Authorization })
        .then( res => {
          // let arr = res.data.data;
          state.wristband = res.data.data;
          // arr.forEach((v,i) => {
          //   state.wristband.push(v)
          // })
          console.log(res.data);
        }).catch(err => {
          console.log(err)
        })
    },
    // 2.手环添加
    wristbandAdd ({ state, rootState, dispatch}, info) {
      console.log('手环添加')
      console.log(info)
      let url = "/band/add"
      let methods = 'post'
      let Authorization = rootState.Authorization;
      let data = info;
      fx.setConnect({state}, {url, methods, data, Authorization })
      .then( res => {
        // info.id = res.data.data;
        // state.wristband.push(info);
        dispatch('WristbandData');
        console.log(res);
      }).catch( error => {
        console.log(error);
      })
    },
    //3.手环绑定
    wristBind ({state, rootState}, info) {
      console.log('手环绑定');
        console.log(info)
        let url = "/band/bind"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = info;
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
          // info.id = res.data.data;
          // state.wristband.push(info);
          console.log(res);
        }).catch( error => {
          console.log(error);
        })
    },
    // 4.手环丢失
    wristbandLose ({ state, commit }, info) {
      console.log('手环丢失')
      console.log(info)
    },
    // 获取学生手环绑定列表 /band/getStudentBandList
    getStudentBandList ({state, rootState}) {
      return new Promise((resolve, reject) => {
        var url = '/band/getStudentBandList'
        var Authorization = rootState.Authorization;
        fx.setConnect({ state }, { url, Authorization })
        .then( res => {
          state.wristband_bindings = res.data.data;
          // state.wristband = arr;
          // console.log(res.data);
          resolve(res.data.data);
        }).catch(err => {
          console.log(err)
        })
      })        
    },
    //获取蓝牙App
    bluetoothData({state, rootState}) {
        var url = '/bluetoothap/getBluetoothAPList'
        var Authorization = rootState.Authorization;
        fx.setConnect({ state }, { url, Authorization })
        .then( res => {
              state.bluetooth = res.data.data;
        }).catch(err => {
          console.log(err)
        })
    },
    //获取绑定详情列表/bluetoothap/getBindingList
    getBindingList({state, rootState}) {
      var url = '/bluetoothap/getBindingList';
        var Authorization = rootState.Authorization;
        fx.setConnect({ state }, { url, Authorization })
        .then( res => {
              state.bindingList = res.data.data;
        }).catch(err => {
          console.log(err);
        })
    },
    //通过文件绑定手环/band/importByFile
    uploadBandFile({state, rootState}, file) {
      return new Promise((resolve,reject) => {
        let url = '/band/importByFile';
        let methods = 'post';
        let data = file;
        let Authorization = rootState.Authorization;
        fx.uploadConnect({state}, {url, methods, data, Authorization})
        .then(res => {
          console.log(res.data.data);
          resolve(1);
        }).catch(err => {
          console.log(err);
        })
      })
      
    },
    //蓝牙添加
    bluetoothAdd({state, dispatch, rootState}, bluetooth) {
      return new Promise((resolve,reject) => {
        let url = "/bluetoothap/add"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = bluetooth;
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
          // info.id = res.data.data;
          dispatch('bluetoothData');
          resolve(1);
        }).catch( error => {
          console.log(error);
        })
      })
    },
    //蓝牙绑定/bluetoothap/bind
    bluetoothBind({state, dispatch, rootState}, bluetooth) {
      return new Promise((resolve,reject) => {
        let url = "/bluetoothap/bind"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = bluetooth;
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
          // info.id = res.data.data;
          dispatch('bluetoothData');
          dispatch('getBindingList');
          resolve(1);
          console.log(res);
        }).catch( error => {
          console.log(error);
        })
      })
    },
    // 删除蓝牙网关 /bluetoothap/{bluetoothAPId}
    deleteBluetooth({state, rootState, dispatch}, bluetoothAPId) {
      let url = `/bluetoothap/${bluetoothAPId}?bluetoothAPId=${bluetoothAPId}`;
      let Authorization = rootState.Authorization;
      let methods = 'delete';
      fx.setConnect({state}, {url, Authorization, methods})
      .then(res => {
        dispatch('bluetoothData');
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
export default wristband
