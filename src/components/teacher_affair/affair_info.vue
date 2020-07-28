<template>
  <div
    id="self"
    class="wrapper animated fadeIn"
  >

    123
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
        console.log(val)
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
  },
  mounted() {
    this.$store.dispatch('GradeList');
    this.$store.dispatch('getTeachersInfo');
    this.$store.dispatch('searchTeachers');
    this.$store.dispatch('getGoodTeacherList');
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

</style>
