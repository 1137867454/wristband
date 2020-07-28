<template>
  <div
    id="self"
    class="wrapper animated fadeIn"
  >
    <!-- 个人中心 -->
      <article class="height_100">
        <el-row class="tac height_100">
        <el-col :span="4" style="height:100%;border-right:solid 1px #eee;">
          <el-menu style="font-size:12px;" :router="true"
            :default-active="activeIndex" text-color="#909399"
            active-text-color="#42b8a0"
            class="" :unique-opened ="true"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item class="liactive" index="/classManager/teacher_Affair/affair_center">
              <i class="el-icon-menu"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <!-- <el-menu-item index="classHonor">
              <i class="el-icon-star-on"></i>
              <span slot="title">班级荣誉</span>
            </el-menu-item> -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span style="font-size:13px;"> 班级信息</span>
              </template>
                <el-menu-item index="/classManager/teacher_Affair/classTeacher">任课老师</el-menu-item>
                <!-- <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-3">选项3</el-menu-item> -->
                <el-menu-item index="/classManager/teacher_Affair/leader">班干委员</el-menu-item>
                <el-menu-item index="/classManager/teacher_Affair/dutyList">值日信息</el-menu-item>
                <!-- <el-menu-item index="/schoolAffair/AffairManage/video">微课管理</el-menu-item> -->
              <!-- <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu> -->
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-aim"></i>
                <span style="font-size:13px;">班级风采</span>
              </template>
                <!-- <el-menu-item index="/classManager/teacher_Affair/classHonor">
                  <i class="el-icon-s-flag"></i>
                  <span slot="title">班级风采</span>
                </el-menu-item> -->
                <el-menu-item index="/classManager/teacher_Affair/classPictures">
                  <i class="el-icon-picture"></i>
                  <span slot="title">班级相册</span>
                </el-menu-item>
                <el-menu-item index="/classManager/teacher_Affair/classHonor">
                  <i class="el-icon-star-on"></i>
                  <span slot="title">班级荣誉</span>
                </el-menu-item>
                <el-menu-item index="/classManager/teacher_Affair/classWorks">
                  <i class="el-icon-brush"></i>
                  <span slot="title">班级作品</span>
                  </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="20" style="height:100%;">
          <router-view />
        </el-col>
      </el-row>
      </article>
  </div>
</template>
<script>
import fx from '../../util/fx';
import links from '../../components/links';
import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
  name: 'Self',
  components: {
    links
  },
  data () {
    return {
      activeIndex: '',
      teacherVisible: false,
      noticeVisible: false,
      dialogVisible: false,
      hideUploadEdit: false,
      examinationVisible: false,
      showOptions: false,
      rules: {
        gradeId: {required: true, message: '请输入年级', trigger: 'blur'},
        level: { required: true, message: '请输入通知等级', trigger: 'blur' },       //通知等级 /普通/紧急/倒计时
        startTime: {required: true, message: '请输入开始时间', trigger: 'blur'},      //开始时间
        subject: { required: true, message: '请输入考试科目', trigger: 'blur'},      //学科
        title: { required: true, message: '请输入标题', trigger: 'blur'},      //学科
        time: { required: true, message: '请输入起始&结束时间', trigger: 'blur'},      //学科
        id: { required: true, message: '请至少选择一位老师', trigger: 'blur' }
        // remark: '',       //备注
        // invigilatorArr: '',  //监考员
        // scope: '', 
      },
      notification: {
        schoolId: '',
        gradeId: '',
        title: '',      //标题
        level: '',      //通知等级 /普通/紧急/倒计时
        startTime: '',  //开始时间
        endTime: '',    //结束时间
        content: '',    //内容
        // picpath: '',    //照片路径
        explains: '',    //小标题；导语
        uploadFile: []
      },
      examination: {
        gradeId: '',
        level: '4',       //通知等级 /普通/紧急/倒计时
        startTime: '',      //开始时间
        endTime: '',
        subjects: '',      //学科
        remark: '',       //备注
        // invigilatorArr: '',  //监考员
        scope: '',        //范围
        time: ''
      },
      examNotification: [],
      classArr: [],
      teachers: [],
      goodTeacher: {
      },
      dialogImageUrl:'',
      pickerOptions: {
       disabledDate: (time) => {
         let nowData = new Date()
         nowData = new Date(nowData.setDate(nowData.getDate() - 1))
         return time < nowData;
       }
      }
    }
  },
  watch: {
    $route: {
      handler (val, oldVal) {
        this.activeIndex = val.path;
        console.log('watch')
        console.log(oldVal.path)
        console.log(this.activeIndex)
      }
    }
  },
  computed: {
    getCourse (day) {
      return function (day) {
        return this.course.filter(v => {
          return v.day === day
        })
      }
    },
    ...mapGetters([
        'getGrade',
        'getClassId',
        'get_CourseList',
        'getTeachers',
        'get_ClassList_ByGradeId']),
  },
  methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    examSubmit(form, examination) { //考试通知
      console.log(examination)
      console.log(this.examNotification)
      this.$refs[form].validate(valid => {
        if(valid) {
          console.log(examination)
          this.examNotification.map(v => {
            for(let key in examination){
              v[key] = examination[key]
            }
            if(v.invigilatorArr){
              v.invigilator = v.invigilatorArr.join(',');
            }
          })
          console.log(this.examNotification);
          axios({
            url:'http://192.168.1.238:8777/brand/setExamNotification',
            method: 'post',
            data: this.examNotification
          }).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        }
      })
    },
    gradeChange(id){ //年级改变引出对应班级
      console.log(id)
      if(id) {  
        let that = this;
        this.$store.dispatch('getClassListByGradeId', id)
        .then(res => {
          console.log(res)
          res.forEach(v => {
            v.classId = v.id;
            delete v.id;
          })
          this.examNotification = res;
          console.log(this.examNotification)
          this.classArr = res.concat([]);
          this.showOptions = true;
        })
      }else{
        this.showOptions = true;
        this.examNotification = [];
      }
    },
    onSubmit(form, notice) { //公告添加
      this.$refs[form].validate(valid => {
        if(valid) {
          let loading = this.openLoading();
          axios({
            url:'http://192.168.1.238:8777/brand/setNotification',
            method: 'post',
            data: notice
          }).then(res => {
            let formData = new FormData($("#uploadForm")[0]);
            $.ajax({
                type: "POST",
                data: formData,
                url: "http://192.168.1.238:8777/brand/setNotificationPicture",
                contentType: false,
                processData: false,
                success: function (res) {
                  console.log(res);
                  
                  loading.close();
                }
            })
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        }
      })
    },
    addTeacher(form, teacher) {
      console.log(form)
      console.log(teacher)
      this.$refs[form].validate(valid => {
        axios({
          url: 'http://192.168.1.238:8777/brand/addExTeacher',
          method: 'post',
          data: teacher.id
        }).then(res => {
          console.log(res);
          this.teacherVisible = false;
        }).catch(err => {
          console.log(err);
        })
      })
    },
    dateChange(dateArr) {
      if(dateArr) {
        this.notification.startTime = dateArr[0];
        this.notification.endTime = dateArr[1];
      }else{
        this.notification.startTime = '';
        this.notification.endTime = '';
      }
    },
    exameDateChange(dateArr) {
      if(dateArr) {
        this.examination.startTime = dateArr[0];
        this.examination.endTime = dateArr[1];
      }else{
        this.examination.startTime = '';
        this.examination.endTime = '';
      }
    },
    set_request(file) {
      console.log(1)
      console.log(file);
      this.notification.uploadFile.push(fx.fileHandle(file))
    },
    // addPhoto(file, fileList) { //添加图片的回调
    //   // console.log(typeof file);
    //   console.log(file);
    //    let vm = this
    //     vm.hideUploadEdit = fileList.length > 4;
    //     // console.log(this.hideUploadEdit)
    //   let formData = fx.fileHandle(file);
    //   console.log('formData')
    //   console.log(formData);
    //   this.notification.uploadFile.push(formData)
    //   console.log(this.notification.uploadFile)
    //   $.ajax({
    //     url: 'http://192.168.1.238:8777/brand/setNotificationPicture',
    //     method: 'post',
    //     data: formData,
    //     contentType: false,
    //     processData: false,
    //     success: function(res) {
    //       console.log(res)
    //     }
    //   })
    // },
    onExceed() { //超出图片限制的回调
      // alert(111)
      // this.dialogVisible = true;
      this.$message.error('照片超出数量限制');
    },
    onRemove(file, fileList){ //图片移除时的回调
      console.log(file);
      console.log(fileList);
      if(fileList.length < 5) {
        this.hideUploadEdit = false;
      }
      this.notification.uploadFile = fileList;
    }
  },
  mounted() {
    this.activeIndex = window.location.pathname;
    // this.$store.dispatch('GradeList');
    this.$store.dispatch('getTeachersInfo');
    this.$store.dispatch('searchTeachers');
    this.$store.dispatch('getClassTeachers');
    // this.$store.dispatch('getDutyList');
    this.$store.dispatch('getClassLeader');
    this.$store.dispatch('getClassPictures');
    this.$store.dispatch('getClassHonors');
    this.$store.dispatch('getClassWorks');
  }
}
</script>

<style lang="scss" scoped>
  #self{
    background:#fff;
    padding:10px;
    .selfInfoWrapper{
      // background:#fff;
      display:flex;height:66px;justify-content:space-between;text-align:center;
        .selfCard{
          // max-width:324px;
          height:66px;width:24%;
        .cardLeft{
          line-height:54px;
          // border:solid 1px;
          width:calc(100% - 80px);
          // float:left;
          color:#fff;
          padding:6px;display:inline-block;
        }
        .cardRight{
          height:54px;width:54px;
          line-height:60px;
          padding:6px;
          float:right;
          background:rgba(120,120,120,0.6);
        }
      }
    }
    .form{
      padding: 0 8%;
      font-size: 18px !important;
      // text-align: center;
    }
    .el-dialog__header{
      // background:#1296db;
      background-image: linear-gradient(to right, #2980b9, #6dd5fa, #fff);
      .el-dialog__title{
        color:#fff !important;
      }
    }
    .el-dialog__body{
      // background:#efefef;
      // background-image: linear-gradient(to right, #C6FFDD, #FBD786, #f7797d);

    }
    #uploadForm{
      width:80%;
      margin: 0px 110px 20px;
    }
  }
  .el-upload-list{
    li{
      float:left;
    }
  }
  .hide .el-upload--picture-card{
    display:none;
  }
  .input_400{
    width:400px;
  }
  .aside-menu{
      font-size:13px;
      height:100%;
    }
  .el-menu-item{
  width:100%;font-size:13px;
  min-width:auto;
}
.el-submenu__title{
      font-size:13px !important;
    }
  .el-menu-item{
    height:50px;
  }
  li{
    .is-active{
      // background:rgb(236, 245, 255);
      background:rgba(198, 255, 221,0.6);
    }
  }
  .liactive.is-active{
      background:rgba(198, 255, 221,0.6);
  }
  .el-menu-item.is-active::after{
    content:'';
    position:absolute;
    width: 2px;
    height:50px;
    right:0;
    background:#42b9a0;
  }
  // .el-submenu__title:hover,.el-menu-item:hover{
  //   background:rgba(198, 255, 221,0.4) !important;
  // }
  .is-opened::after{
    width:0 !important;
  }
</style>
