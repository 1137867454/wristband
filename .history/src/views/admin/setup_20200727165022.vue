<template>
  <div
    id="setUp"
    class="wrapper"
  >
    <div id="come" class="animated fadeIn refuseCopy" style="overflow-y:auto;">
    <!-- <p style="color:#39f;">出入管理</p> -->
      <el-container style="height:160px;">
        <el-aside width="50%" class="leftAside">
          <p class="underline"><span style="border-bottom:solid 2px #62c;color:#62c;padding:5px 0;">定时策略设置</span></p>
          <!-- websocket 设置项 -->
      <div class="corn">
        定时设置
        <el-popover v-model="cronPopover">
          <el-input slot="reference" @click="cronPopover=true" v-model="cron" placeholder="请输入定时策略" size="mini" style="width: 200px;"></el-input>
          <cron @change="changeCron" @close="cronPopover=false" ></cron>
        </el-popover>
        <el-button type="danger" size="mini">应用</el-button>
      </div>
        </el-aside>
        <el-main class="rightMain">
          <p class="underline"><span style="border-bottom:solid 2px #1296db;color:#1296db;padding:5px 0;">倒计时设置</span></p>
          <div id="rightMainIn">
            <p style="">今日日期：{{getDate}} </p>
            <!-- <div class="date"> -->
          <div>结束日期：
            <el-date-picker
            v-model="timing"
            :picker-options="pickerOptions"
            size="mini"
            type="date"
            placeholder="选择日期"
          />
          </div>
          </div>
        </el-main>
      </el-container>
      <!-- 第一列 -->
      <div class="infoUpload">
        <ul class="uploadUl">
          <li><p class="underline"><span style="border-bottom:solid 2px #0c6;color:#0c6;padding:5px 0;">教室信息导入</span></p>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
             accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :limit="3"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="warning" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2M</div>
          </el-upload>
          </li>
          <li><p class="underline">
            <span style="border-bottom:solid 2px #d81e06;color:#d81e06;padding:5px 0;">
              班级信息导入</span></p>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :limit="10" multiple
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="warning" @click="submitUpload">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2M</div>
          </el-upload></li>
          <li style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
            <p class="underline"><span style="border-bottom:solid 2px #f90;color:#f90;padding:5px 0;">教师信息导入</span></p>
          <el-upload
            class="upload-demo"
            ref="teacherInfo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :limit="1" :http-request="uploadTeacherInfo"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="warning" @click="submitUpload('teacherInfo')">上传文件</el-button>
            <router-link style="margin-left:10px;" target="_blank" to="/template/teacherInfo.xlsx">
              <el-button size="small" plain>
              模板
              </el-button>
            </router-link>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2M</div>
          </el-upload></li>
        </ul>
      </div>
      <!-- 第二列 -->
      <div class="infoUpload">
        <ul class="uploadUl">
          <li style="animated fadeInLeft"><p class="underline"><span style="border-bottom:solid 2px #1afa29;color:#1afa29;padding:5px 0;">教师图片导入</span></p>
            <form style="margin-top:-11px;" action="/oss/upload" method="post" enctype="multipart/form-data">
              <span class="upload-wrap anticon" nv-file-drop="" uploader="uploader">
                  <input @change="teacher_photo_click($event)" class="file-ele" id="File_teacher" name="uploadFile" accept="image/gif, image/jpeg" multiple="multiple" type="file" value="" />
                  <div  class="file-open"><em class="icon icon-upload"></em>&nbsp;选取文件</div>    
              </span>
              <el-button @click="teacher_photo_upload" type="success" size="small">上传文件</el-button>
            </form>
            <div style="margin:10px 11px;">
              <div style="text-overflow:ellipsis;width:230px;white-space:nowrap;overflow:hidden;height:20px;margin-top:10px;">
                <span v-if="teacherPhoto.length">共{{teacherPhoto.length}}个</span>
                <span v-for="(v, i) in teacherPhoto" :key="i">
                  {{v.name}}
                </span>
              </div>
            </div>
          </li>
          <li><p class="underline"><span style="border-bottom:solid 2px #f24;color:#f24;padding:5px 0;">学生信息导入</span></p>
          <el-upload
            class="upload-demo"
            ref="upload_student" :headers="header_"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            action="https://192.168.1.222/student/importByFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-error="handleError"
            :on-success="handSuccess"
            :limit="1"
            :file-list="fileList"
            :http-request="set_request"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('upload_student')">上传文件</el-button>
            <router-link style="margin-left:10px;" target="_blank" to="/template/studentInfo.xlsx">
              <el-button size="small" plain>
              模板
              </el-button>
            </router-link>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2M</div>
          </el-upload></li>
          <li style="overflow:hidden;">
            <p class="underline">
              <span style="border-bottom:solid 2px #d4237a;color:#d4237a;padding:5px 0;">
                学生图片导入
              </span>
            </p>
            <form id="uploadForm" style="margin-top:-11px;" action="/oss/upload" method="post" enctype="multipart/form-data">
              <!-- <input id="File1" name="uploadFile" accept="image/gif, image/jpeg" multiple="multiple" type="file" value="" /> -->
              <!-- <input id="btnImportOK" type="button" value="上传" /> -->
              <span class="upload-wrap anticon" nv-file-drop="" uploader="uploader">
                  <input @change="uploadClick($event)" class="file-ele" id="File1" name="uploadFile" accept="image/gif, image/jpeg" multiple="multiple" type="file" value="" />
                  <div  class="file-open"><em class="icon icon-upload"></em>&nbsp;选取文件</div>    
              </span>
              <el-button id="btnImportOK" @click="student_photo_upload" type="success" size="small">上传文件</el-button>
            </form>
            <div style="margin:10px 11px;">
              <el-cascader v-if="showOptions"
                v-model="classifyArr"
                size="mini" :multiple="true"
                :options="getClassList"
                clearable
                placeholder="请选择班级"
                :props="{ expandTrigger: 'hover' }"
              />
                <!-- @change="handleChange" -->
              <div style="text-overflow:ellipsis;width:230px;white-space:nowrap;overflow:hidden;height:20px;margin-top:10px;">
                <span v-if="studentPhoto.length">共{{studentPhoto.length}}个</span>
                <span v-for="(v, i) in studentPhoto" :key="i">
                  {{v.name}}
                </span>
              </div>
            </div>
          <!-- <el-upload 
            action=""
            class="upload-demo"
            ref="uploadStudentPhoto" multiple
            :limit="50"
            accept=".jpg, .png, .jpeg"
            :http-request="req_StudentPhoto"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submit_upload('uploadStudentPhoto', 'studentPhoto')">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">
              <el-cascader v-if="showOptions"
                v-model="classifyArr"
                class=""
                size="mini" :multiple="true"
                :options="getClassList"
                clearable
                placeholder="请选择班级"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
              />
            </div>
          </el-upload> -->
          </li>
        </ul>
      </div>
      <!-- 第三列 -->
      <div class="infoUpload">
        <ul class="uploadUl">
          <li style="overflow:hidden;"><p class="underline">
            <span style="border-bottom:solid 2px #42b9a0;color:#42b9a0;padding:5px 0;">课程表导入</span></p>
            <el-upload class="upload-demo" :limit="1" :on-exceed="handleExceed"
             :file-list="uploadFiles" action="alert" :auto-upload="false" multiple :on-change="loadJsonFromFile">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="danger" @click="loadJsonFromFileConfirmed">上传文件</el-button>
            <!-- <el-button size="small">模板</el-button> -->
            <div slot="tip" class="el-upload__tip">请上传JSON文件</div>
          </el-upload>
          <span slot="footer">
            <!-- <el-button size="mini" type="primary" @click="dialogVisible = false">cancel</el-button> -->
          </span>
            <!-- <el-upload
              :http-request="set_request_"
              ref="uploadSchedule" :on-change="loadJsonFile"
              action="alert"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :limit="3"
              :file-list="JsonFiles"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('uploadSchedule')">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2M</div>
            </el-upload> -->
          </li>
          <li><p class="underline"><span style="border-bottom:solid 2px rgb(1,82,137);color:rgb(1,82,137);padding:5px 0;">蓝牙信息导入</span></p>
          <el-upload
            class="upload-demo"
            ref="upload_" :headers="header_"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            action="https://192.168.1.222/student/importByFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-error="handleError"
            :on-success="handSuccess"
            :limit="1"
            :file-list="fileList"
            :http-request="set_request"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="danger" @click="submitUpload('蓝牙')">上传文件</el-button>
            <!-- <el-button size="small">模板</el-button> -->
            <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2M</div>
          </el-upload></li>
          <li style="overflow:hidden;">
            <p class="underline">
              <span style="border-bottom:solid 2px #FFC730;color:#FFC730;padding:5px 0;">
                手环一键绑定
              </span>
            </p>
          <el-upload
            action="https://192.168.1.222/band/importByFile"
            class="upload-demo"
            ref="uploadBandBinding"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-progress="handleProgress"
            :limit="1"
            :file-list="fileList"
            :http-request="set_request_bandbinding"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="danger" @click="submitUpload('uploadBandBinding')">上传文件</el-button>
            <router-link style="margin-left:10px;" target="_blank" to="/template/wristband.xlsx">
              <el-button size="small" plain>
              模板
              </el-button>
            </router-link>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2M</div>
          </el-upload></li>
        </ul>
      </div>
      <!-- 第四列 -->
      <div class="infoUpload">
        <ul class="uploadUl">
          <li><p class="underline">
            <span style="border-bottom:solid 2px #0c6;color:#0c6;padding:5px 0;">
              手环信息导入</span></p>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
             accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :limit="3"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="warning" @click="submitUpload">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2M</div>
          </el-upload></li>
          <li><p class="underline">
            <span style="border-bottom:solid 2px #d81e06;color:#d81e06;padding:5px 0;">
              教室信息导入</span></p>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :limit="10" multiple
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="warning" @click="submitUpload">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2M</div>
          </el-upload></li>
          <li>
             <p class="underline">
               <span style="border-bottom:solid 2px #f90;color:#f90;padding:5px 0;">
                 班牌样式导入
                </span>
            </p>
              <el-select style="margin-left:10px;" v-model="buttonObj.buttonId" clearable
              @change="handleChange"
              size="mini" placeholder="请选择">
                  <el-option
                    v-for="item in modelStyle"
                    :key="item.iconName"
                    :label="item.iconName"
                    :value="item.id">
                  </el-option>
                </el-select>
              <div style="margin-left:10px;" v-if="buttonObj.buttonId" id="buttonstyle">
                <span v-for="(v, i) in getButtonStyle" :key="v.id" @click="buttonClick(i, v)">
                  <img :class="v.clickStatus?'modal':''" :src="v.iconUrl">
                  <!-- {{v.pid}} -->
                </span>
                <el-button class="btnApply" @click="apply" size="mini" type="primary" round>应用</el-button>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script >
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { getItem } from '../../util/localStorage'
import { cron } from 'vue-cron';
import fx from '../../util/fx';
import axios from 'axios'
export default {
  name: 'setUp',
  components: { cron },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      formLabelWidth: '80px',
      limitNum: 3,
      form: {},
      showOptions: false, //班级是否加载
      classifyArr: [],    //班级数组 v-model
      JsonFiles: [],
      uploadFilename: null,
      uploadFiles: [],
      dialogVisible: true,
      timing:'',
      cronPopover:false,
      cron:'', // websocket 设置
      scheduleItem: [], //课程表项
      header_: {
       Authorization: this.$store.getters.getAuthorization
      },
      fileList: [],
      studentPhoto: [],  //学生照片
      stuentInfo: [],    //学生信息
      teacherPhoto: [],
      teacherInfo: [],   //教师信息
      teacherPhoto: [],  //教师照片
      pickerOptions: {
       disabledDate: (time) => {
         let nowData = new Date()
         nowData = new Date(nowData.setDate(nowData.getDate() - 1))
         return time < nowData
       }
      },
      buttonStyle: [],
      buttonObj: {
        buttonId: '1',
      },    //选中的模式 经典、史诗、传说
      buttonIdArr: [], //button多选的数组id
      modelStyle: []   //选中的模式 经典、史诗、传说
    }
  },
  computed: {
    sdata() {
      return this.$store.getters.getStudents;
    },
    getDate() {
      return fx.getDate(new Date());
    },
    getClassList() {
      return this.$store.getters.getOptions;
    },
    getButtonStyle() {
      let arr = this.buttonStyle;
      if(this.buttonObj.buttonId) {
        return arr.filter(v => v.pid == this.buttonObj.buttonId);
      }

      return arr.filter(v => v.pid == this.buttonObj.buttonId);
    }
  },
  mounted: function () {
    this.$store.dispatch('getCourseList')
    // console.log()
    // document.querySelector("#btnImportOK").click(function () {
    //         console.log('llll')
    //         let uploadFile = document.querySelector('#File1').files;
    //         console.log(uploadFile)
    //         let formData =new FormData();
    //         if(uploadFile) {
    //           uploadFile.forEach(v => {
    //             formData.append('uploadFile', v);
    //           })
    //         }
    //         // let formData = new FormData($("#uploadForm")[0]);
    //         let id = '';
    //         console.log(formData);
    //         if(!that.studentPhoto.length){
    //           that.$message.error('请先上传图片');
    //           return ;
    //         }
    //         if(that.classifyArr && that.classifyArr.length){
    //           let loading = that.openLoading();
    //           id = that.classifyArr[1];
    //           console.log(id);
    //           axios({
    //             url: `http://192.168.1.238:8777/oss/upload?id=${id}`,
    //             method: 'post',
    //             data: formData
    //           }).then(res => {
    //               that.studentPhoto = [];
    //               loading.close();
    //               that.$message.success('上传成功')
    //           }).catch(err => {
    //               loading.close();
    //               console.log(err);
    //           })
    //           // $.ajax({
    //           //     type: "post",
    //           //     data: formData,
    //           //     url: `http://192.168.1.238:8777/oss/upload?id=${id}`,
    //           //     contentType: false,
    //           //     processData: false,
    //           //     success: function(res) {
    //           //       console.log('success');
    //           //       that.studentPhoto = [];
    //           //       loading.close();
    //           //       that.$message.success('上传成功')
    //           //     },
    //           //     error: function(err){
    //           //       loading.close();
    //           //       console.log(err);
    //           //     }
    //           // })
              
    //         }else{
    //           that.$message.error('请先选择班级')
    //         }
    // })
    let that = this;
    axios.get('http://192.168.1.238:8777/button/icon',{})
    .then(res => {
      console.log(res.data.data)
      that.buttonStyle = res.data.data.slice(3);
      that.buttonStyle.map(v => {
        if(v.name == '主页'){
          v.clickStatus = true;
        }else{
          v.clickStatus = false;
        }
      });
      that.modelStyle = res.data.data.slice(0,3);
      console.log(that.buttonStyle)
    }).catch((err) => {
      console.log(err)
      console.log('defeat')
    })
    this.$store.dispatch('getClassSelect')
    .then(() => {
      this.showOptions = true;
    })     //班级表
    // this.$store.dispatch('getCourseList');       //科目表
    // this.$store.dispatch('getActivityTableList') //作息表
    // .then(data => {
    //   console.log(data)
    //   this.$store.dispatch('getActivityItemList', data[0].id)
    //         .then(res => {
    //           console.log(res);
    //           this.scheduleItem = res;
    //         })
    // })
  },
  methods: {
    handleChange(id) {
      console.log(id);
        this.buttonIdArr = [];
      if(!id) {
        return ;
      }
      this.buttonIdArr.push()
      this.buttonStyle.map(v => {
        if(v.name != '主页')
        v.clickStatus = false;
      })
      console.log(this.buttonStyle)
    },
    student_photo_upload() {
      let uploadFile = document.querySelector('#File1').files;
      console.log(uploadFile)
      let formData =new FormData();
      if(uploadFile) {
        uploadFile.forEach(v => {
          formData.append(' uploadFile', v);
        })
      }
      // let formData = new FormData($("#uploadForm")[0]);
      let id = '';
      console.log(formData);
      if(!this.studentPhoto.length){
        this.$message.error('请先上传图片');
        return ;
      }
      if(this.classifyArr && this.classifyArr.length){
        let loading = this.openLoading();
        id = this.classifyArr[1];
        console.log(id);
        axios({
          url: `http://192.168.1.238:8777/oss/upload?id=${id}`,
          method: 'post',
          data: formData
        }).then(res => {
            console.log(res);
            this.studentPhoto = [];
            loading.close();
            this.$message.success('上传成功')
        }).catch(err => {
            loading.close();
            console.log(err);
        })
      }else{
        this.$message.error('请先选择班级')
      }
    },
    teacher_photo_upload() {
      let uploadFile = document.querySelector('#File_teacher').files;
      console.log(uploadFile)
      let formData =new FormData();
      if(!this.teacherPhoto.length){
        this.$message.error('请先上传图片');
        return ;
      }
      let loading = this.openLoading();
      if(uploadFile) {
        uploadFile.forEach(v => {
          formData.append('uploadFile', v);
        })
      }
        axios({
          url: `http://192.168.1.238:8777/brand/addTeacherPictureList`,
          method: 'post',
          data: formData
        }).then(res => {
            this.teacherPhoto = [];
            loading.close();
            this.$message.success('上传成功')
        }).catch(err => {
            loading.close();
            console.log(err);
        })
    },
    //uploadTeacherInfo 老师信息上传
    uploadTeacherInfo(file, fileList) {
      console.log(file);
      let uploadFile = file.file;
      let formData = new FormData();
      let loading;
      if(uploadFile) {
        loading = this.openLoading();
        formData.append('file', uploadFile);
      }
      this.$store.dispatch('uploadTeachers', formData)
      .then(res => {
        this.fileList = [];
        loading.close();
      }).catch(err => {
        loading.close();
      })
      // axios({
      //   url: '',
      //   method: 'post',
      //   data: uploadFile
      // }).then(res => {
      //   loading.close();
      //   this.$message.success('上传成功')
      // }).catch(err => {
      //   loading.close();
      // })
    },
    buttonClick(i, v) {//班牌按钮添加
      console.log(i)
      // this.buttonStyle[i].clickStatus = !this.buttonStyle[i].clickStatus;
      i = (v.pid - 1) * 9 + i;
      let status = !this.buttonStyle[i].clickStatus;
        // 这样修改是修改不了的。
        // console.log(this.buttonStyle)
        // console.log(v.pid);
        // console.log(status)
        if(v.name != '主页'){
          this.buttonStyle[i].clickStatus = status;
          this.$set(this.buttonStyle, i, this.buttonStyle[i]);
            console.log(this.buttonStyle[i])
          if(status) {
            this.buttonIdArr.push(v.id);
          }else{
            let find = this.buttonIdArr.indexOf(v.id);
            console.log('find' + find);
            this.buttonIdArr.splice(find, 1)
          }
        }else{
          this.$message.error('主页为必选项!!!');
        }
        console.log(this.buttonIdArr)
    },
    apply() {
      let that = this;
      let homeId = this.buttonStyle.find(v => v.name == '主页' && v.pid == that.buttonObj.buttonId);
      if(homeId) {
        console.log(homeId)
        this.buttonIdArr.push(homeId.id)
        this.buttonIdArr = Array.from(new Set(this.buttonIdArr))
      }
      console.log(this.buttonIdArr)
      if(this.buttonIdArr && this.buttonIdArr.length){
        let id = this.buttonIdArr;
        axios({
          url: 'http://192.168.1.238:8777/button/setButton',
          method: 'post',
          data: id
        }).then((res) => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      }else{
        this.$message.error('请先选中所需按钮样式');
      }
    },
    loadJsonFromFile (file, fileList) {
      this.uploadFilename = file.name;
      this.uploadFiles = fileList;
    },
    loadJsonFromFileConfirmed () {
    console.log(this.uploadFiles)
    let that = this;
    if (this.uploadFiles) {
      for (let i = 0; i < this.uploadFiles.length; i++) {
      let file = this.uploadFiles[i]
      // console.log(file.raw)
      if (!file) continue
      let reader = new FileReader()
      reader.onload = async (e) => {
        try {
          let itemUpdateDTOList  = JSON.parse(e.target.result)    //获取JSON数据
          // console.log(that.$store.getters.get_CourseList)
          let courseList = that.$store.getters.get_CourseList
          itemUpdateDTOList.forEach((v, i, a) => {
            v.className = v.class;
            delete v.class;
            // console.log(v)
            // var course =  courseList.find( vc => {
            //   return vc.name == v.course;
            // })
            // if(!course){
            //   console.log(v.course)
            // }
            switch(v.course) {
              case '信息': v.course = '信息技术';break;
              case '班会': v.course = '班会课';break;
              case '音美': v.course = '音乐/美术';break;
              case '自修': v.course = '自习';break;
            }
          })
          
          // console.log(itemUpdateDTOList);
          let loading = this.openLoading();
          this.$store.dispatch('updateCourseByList', itemUpdateDTOList )
          .then(() => {
              this.uploadFiles = [];
              loading.close();
          })
        } catch (err) {
        // loading.close();
        console.log(`load JSON document from file error: ${err.message}`)
        // this.showSnackbar(`Load JSON document from file error: ${err.message}`, 4000)
        }
      }
      reader.readAsText(file.raw, 'gbk')
      }
    }
    this.dialogVisible = false
    },
    handlePreview(file, fileList) {
      console.log(file, fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleExceed() {
      this.$message.warning('请一次上传一个Excel文件');
    },
    handleProgress(event, file, fileList) {
      console.log(event);
      console.log(file);
      console.log(fileList)
    },
    handSuccess() {
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    handleError() {
      this.$message.error('上传失败');
    },
    loadJsonFile() {
      console.log('loadJsonFile')
      console.log(this.JsonFiles);
    },
    set_request_(file) {
      console.log(this.JsonFiles)
      console.log(file);
      // console.log(fx.fileHandle(file).value);
      // let f = fx.fileHandle(file);
      // let reader = new FileReader();
      // reader.readAsText(f);
      // console.log(json);
      // reader.onload = (evt) =>{
      //   console.log(evt);
      // }
    },
    set_request(file) { //学生信息上传
      console.log('...', file)
      let formData = fx.fileHandle(file);
      let loading = this.openLoading();
      this.$store.dispatch('uploadStudentFile', formData)
      .then(() => {
        loading.close();
        this.fileList.pop();
      }).catch(err => {
        loading.close();
      })
    },
    set_request_bandbinding(file) { //手环绑定
      console.log(file);
      let formData = fx.fileHandle(file);
      let loading = this.openLoading();
      this.$store.dispatch('uploadBandFile', formData)
      .then(() => {
        loading.close();
        this.fileList.pop();
      }).catch(() => {
        loading.close();
      })
    },
    req_StudentPhoto(file) {
      console.log(file)
      let formData = fx.fileHandle(file);
      console.log(formData)
      this.studentPhoto.push(formData);
    },
    // uploadStudentPhoto 学生图片上传
    submit_upload(refName, list){
      console.log(refName);
      console.log(this.studentPhoto)
      console.log(this.$refs[refName]);
        this.$refs[refName].submit();
        console.log('this.photo')
        let loading = this.openLoading();
        if(this.classifyArr && this.classifyArr.length) {
          let classId = this.classifyArr[1];
          // this.$store.dispatch('', {photoList, classId});
          console.log(axios)
          console.log(this[list]);
          console.log(classId);
          axios.post('http://192.168.1.238:8777/oss/upload', {
            data: {
              uploadFile: this[list],
              id: classId
            }
          })
          .then((res) => {
            loading.close();
            alert('res')
          })
          .catch(err => {
            loading.close();
            console.log(err)
          })
        }else{
          this.$message.error('请先选择对应班级')
        }
    },
    submitUpload(w) {
      console.log(w);
      // console.log(this.studentPhoto)
      console.log(this.$refs[w]);
        this.$refs[w].submit();
      },
    rowClick(row,s) {
      this.focusOne = row;
      console.log(row);
      console.log(s);
    },
    changeCron(val){
      this.cron=val
      console.log(this.cron)
      console.log(this.cronPopover)
    },
    removeTab (targetName) {
      console.log(targetName)
    },
    testInfo() {
      let time = this.workRest.time;
      this.workRest.startAt = time[0].toLocaleDateString().replace(/\//g, '-') + " " + time[0].toTimeString().substr(0, 8);
      this.workRest.endAt = time[1].toLocaleDateString().replace(/\//g, '-') + " " + time[1].toTimeString().substr(0, 8);
      console.log(this.workRest);
    },
    uploadClick(e) {
      this.studentPhoto = e.target.files;
      console.log(e.target.files)
    },
    teacher_photo_click(e) {
      this.teacherPhoto = e.target.files;
      console.log(e.target.files)
    }
  }
}
</script>
<style lang="scss" scoped>
#setUp{
  overflow-y: auto;
  // font-family: Hiragino Sans GB;
  font-family: "PingFang SC";
  // font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  background:rgba($color: #fff, $alpha: 0.6);
  // padding:6px;
  .upload-demo{
      padding:0px 10px 0;
      // border:solid 1px;
    }
  #come{
    // padding:8px;
    height:100%;
    box-shadow: -2px -2px 2px #aaa;
    background: rgba(235,242,253,0.8);
    
    .leftAside{
      background:#fff;margin:5px;padding:8px;
      #leftAsideIn{
        position:relative;
        margin: 40px 0;
        display:flex;
        justify-content:space-around;
        color: #777;
        font-size:13px;
        .inProgress{
          position:absolute;
          top:80px;
          margin-left:48px;
        }
      }
      #role{
        text-align:center;
        padding:20px 0;
        display:flex;
        justify-content:space-around;
        .circle{
          line-height:20px;
          width:60px;
          height:60px;
          border-radius:50%;
          margin:20px auto;
          img{
            margin-top:10px;
          }
        }
      }
    }
    
    .underline{
      border-bottom:solid 1px #ccc;
    }
    .rightMain{
      margin: 5px ;
      padding:8px;
      #rightMainIn{
        margin: 8px 0;
        // display:flex;
        ul{
          margin-left:40px;
          li{
            label{
              display:inline-block;
              width:60px;
              text-align: right;
              margin-right:20px;
            }
          }
        }
      }
    }
    li{
      padding:4px;
    }
    .infoUpload{
      .uploadUl{
        display:flex;
        justify-content:space-around;
        height:160px;
        li{
          flex:1;
          padding:8px 0 0 8px;
          background:#fff;
          flex:1;
          margin:4px;
          #buttonstyle{
            width:240px;
            height:70px;
            margin:4px 0;
            // border:solid 1px;
            position:relative;
            span{
              margin:1px;
              img{
                cursor:pointer;
                width:30px;height:30px;
                vertical-align:bottom;
                margin-right:4px;
                margin-top:4px;
                &:hover{
                  background: rgba(0,0,0,0.4);
                }
              }
              .modal{
                background: rgba(100,100,100,0.2);
                // border:solid 1px #49ee99;
                box-shadow:3px 3px #ccc;
              }
            }
            .btnApply{
              position:absolute;
              // margin-left:42px;
              bottom:0px;right:30px;
            }
          }
        }
      }
    }
  }
  .upload-wrap{
    position:relative;
      display:inline-block;
      overflow: hidden;
      top:11px;
      margin: 0 12px;
      &:hover{
        opacity: 0.8;
      }
  }
  .file-ele {
    width:80px;
  }
  .upload-wrap .file-ele {
    position:absolute;
    
    top:0;
    right:0;
    opacity:0;
    height:100%;
    // width:50%;
    cursor:pointer;
  }
  .upload-wrap .file-open{
      width:80px;
      height:31px;
      line-height:31px;
      vertical-align: middle;
      text-align:center;
      color:#fff;
      
      background:#409EFF;
      border-radius: 3px;
  }
}
.value{
  display:block;
}

</style>
