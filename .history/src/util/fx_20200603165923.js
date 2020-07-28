import api from './api'
import axios from 'axios';
import {Message, MessageBox} from 'element-ui'
const fx = {
  getDate (d) {
    console.log('getDate....')
    if (typeof d === 'string') {
      d = new Date(d)
    }
    let day = d.getDate()/10 < 1 ? '0' + d.getDate() : d.getDate();
    d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + day;
    // d = '' + d.getFullYear() + (d.getMonth() + 1) + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
    return d 
  },
  setConnect ({ state, rootState }, payload) {
    console.log('发送请求到:' + payload.url)
    return new Promise((resolve, reject) => {
      api({
        url: payload.url,
        method: payload.methods ? payload.methods : 'get',
        headers: {
          Authorization: payload.Authorization
        },
        data: payload.data
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  uploadConnect({ state, rootState }, payload) {
    console.log('发送请求到:' + payload.url)
    return new Promise((resolve, reject) => {
      api({
        url: payload.url,
        method: payload.methods ? 'post' : 'get',
        headers: {
          Authorization: payload.Authorization
        },
        data: payload.data
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  number_Chinese(number) {
    let arr = [0,1,2,3,4,5,6,7];
    let brr = ['日', '一', '二', '三', '四', '五', '六', '天']
    return brr[arr.indexOf(number)];
  },
  getWeather(that) {
    axios.get("https://free-api.heweather.com/v5/weather?key=5a08956dc52c43eca4ee75d77db964c8&city=zhanjiang")
    .then( res => {
      console.log(res);
      that.weather = res.data.HeWeather5[0];
      console.log(that.weather)
    }).catch( err => {
      console.log(err);
    })
  },
  classSelect(state) {
    let list = [];
    let flag = false;
      state.classData.filter((o,i) =>{
        if(state.selects.length){
            state.selects.forEach(a => {
          list.push(a.value);
          
        })
        list = Array.from(new Set(list))
        // console.log('list');
        // console.log(list)
          var len = state.selects.length;
            if(list.includes(o.gradeId)){
              // console.log('班级添加');
              var index = list.indexOf(o.gradeId);
              flag = state.selects[index].children.find(v => {
                return v.value == o.id;
              })
              if(!flag){
                state.selects[index].children.push({
                  value: o.id,
                  label: o.className
              })
              }
            }else{
              // console.log('年级添加')
              state.selects[len] = {
                label: o.gradeName,
                value: o.gradeId,
                children: [{
                  value: o.id,
                  label: o.className
                }]
              }
            }
        }else{
          state.selects[i] = {
              label: o.gradeName,
              value: o.gradeId,
              children: [{
                value: o.id,
                label: o.className
              }]
          }
        }
      })
  },
  classSelect_Name(state) {
    let list = [];
    let flag = false;
      state.classData.filter((o,i) =>{
        if(state.selects.length){
            state.selects.forEach(a => {
          list.push(a.value);
          
        })
        list = Array.from(new Set(list))
        // console.log('list');
        // console.log(list)
          var len = state.selects.length;
            if(list.includes(o.gradeId)){
              // console.log('班级添加');
              var index = list.indexOf(o.gradeId);
              flag = state.selects[index].children.find(v => {
                return v.value == o.id;
              })
              if(!flag){
                state.selects[index].children.push({
                  value: o.id,
                  label: o.className
              })
              }
            }else{
              // console.log('年级添加')
              state.selects[len] = {
                label: o.gradeName,
                value: o.gradeId,
                children: [{
                  value: o.id,
                  label: o.className
                }]
              }
            }
        }else{
          state.selects[i] = {
              label: o.gradeName,
              value: o.gradeId,
              children: [{
                value: o.id,
                label: o.className
              }]
          }
        }
      })
  },
  fileHandle(file) {
    const formData = new FormData();
    let upload_file = file.file;
    formData.append('file', upload_file);
    return formData;
  },
  deleteOne () {
    return new Promise((resolve) => {
      MessageBox.confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
          resolve(true)
      }).catch(() =>{

      })
    })
  },
  deleteWarning(item) {
      return new Promise((resolve, reject) => {
        if(item && item.length){
          MessageBox.confirm('此操作将批量删除信息，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
          }).then(() => {
            resolve(1);
          }).catch(() => {
    
          })
        }else{
          Message({
            message: '请选中至少一条数据',
            type: 'error',
            duration: 1500
          })
        }
      })
  }
}
export default fx
