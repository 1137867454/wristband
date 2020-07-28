<template>
  <div
    id="self"
    class="wrapper animated fadeIn"
  >
    <el-dialog :modal="false"
      title="公告添加" :fullscreen="true"
      :visible.sync="noticeVisible"
      style="position:absolute;z-index:3333;"
      center>
      <el-form style="background:#f5f5f5;width:80%;margin:0 auto;padding:10px;box-shadow:-2px 4px 6px #aaa;"
       ref="noticeForm" :model="notification" :rules="rules"
        label-width="110px">
        <el-form-item label="标题" prop="title" style="display:inline-block;">
          <el-input clearable size="small" style="width:400px;" v-model="notification.title"></el-input>
        </el-form-item>
        <el-form-item label="导语"  style="display:inline-block;">
          <el-input clearable size="small" style="width:400px;" v-model="notification.explains"></el-input>
        </el-form-item>
        <p>
          <el-form-item label="年级" prop="gradeId" style="display:inline-block;">
            <el-select clearable size="small" style="font-size:12px !important;" v-model="notification.gradeId" placeholder="请选择活动区域">
              <el-option v-for="(v,i) in getGrade" :key="i"
               :label="v.gradeName" :value="v.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优先等级" prop="level" style="display:inline-block;">
            <el-select clearable size="small" 
            v-model="notification.level" 
            placeholder="请选择活动区域">
              <!-- <el-option label="考试" value="4"></el-option> -->
              <el-option label="倒计时" value="2"></el-option>
              <el-option label="考试" value="4"></el-option>
              <el-option label="普通" value="3"></el-option>
              <el-option label="紧急" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期限" prop="time"  style="display:inline-block;">
          <el-date-picker clearable :picker-options="pickerOptions"
          v-model="notification.time" value-format="yyyy-MM-dd HH:mm"
          size="small" style="width:340px;" format="yyyy-MM-dd HH:mm"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateChange">
        </el-date-picker>
        </el-form-item>
        </p>
            <!-- :on-preview="handlePreview"
            :on-remove="handleRemove" -->
                <!-- :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove" -->
        <form id="uploadForm" action="http://192.168.1.238:8777/brand/setNotificationPicture" method="post" enctype="multipart/form-data">
          <input id="File1" name="uploadFile" accept="image/gif, image/jpeg" multiple="multiple" type="file" value="" />
          <!-- <input id="btnImportOK" type="button" value="上传"  /> -->
          <!-- <el-button @click="btnUpload" size="medium">上传</el-button> -->
          <!-- <input type="hidden" value="1248147290481410049" id="ids" > -->
        </form>
           <!--<el-form-item v-model="notification">
            <el-upload ref="uploadphoto" id="addPhotos"  :class="{hide:hideUploadEdit}"
                :on-change="addPhoto"
                :on-exceed="onExceed"
                :on-remove="onRemove"
                action=""
                :http-request="set_request"
                list-type="picture-card"
                :limit="5" accept="image/gif, image/jpeg"
                 multiple="multiple" :auto-upload="false">
                <i class="el-icon-plus"></i>
              </el-upload> -->
              <!-- <el-dialog :visible.sync="dialogVisible" :modal="false">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog> 
          </el-form-item>-->
        <el-form-item label="内容" style="width:90%;">
          <el-input type="textarea" rows="20" 
           v-model="notification.content"></el-input>
        </el-form-item>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="onSubmit('noticeForm', notification)">确定</el-button>
          <el-button size="medium" round @click="noticeVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :modal="false"
      title="考试通知" :fullscreen="true"
      :visible.sync="examinationVisible"
      style="position:absolute;z-index:3333;"
      center>
      <el-form  :rules="rules" style="background:#f5f5f5;width:80%;margin:0 auto;padding:10px;box-shadow:-2px 4px 6px #aaa;"
       ref="ExamNotice" :model="notification"
        label-width="110px">
        <el-form-item prop="subject"
         label="科目" style="display:inline-block">
         <el-select size="small" style="width:400px;"
            v-model="examination.subject"
            filterable placeholder="请选择考试科目">
            <el-option
              v-for="item in get_CourseList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <!-- <el-input  clearable size="small" style="width:400px;" v-model="examination.subject"></el-input> -->
        </el-form-item>
        <el-form-item label="期限" prop="time"  style="display:inline-block;">
          <el-date-picker  clearable :picker-options="pickerOptions"
            v-model="examination.time" value-format="yyyy-MM-dd HH:mm"
            size="medium" style="width:400px;" format="yyyy-MM-dd HH:mm"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="范围" style="display:inline-block;">
          <el-input  clearable size="small" style="width:400px;" v-model="examination.scope"></el-input>
        </el-form-item>
        <el-form-item prop="gradeId" label="年级"  style="display:inline-block;">
            <el-select  clearable size="small" style="width:400px;"
             v-model="examination.gradeId" 
             placeholder="请选择活动区域"
             @change="gradeChange">
              <el-option v-for="(v,i) in getGrade" :key="i"
               :label="v.gradeName" :value="v.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- {{examination.examNotification}} -->
        <p v-for="(v,i) in get_ClassList_ByGradeId" :key="i">
          <!-- {{v}} -->
          {{examination.examNotification[i].classId}}
          <el-form-item label="班级"  style="display:inline-block;">
            <el-select  clearable size="small" style="width:400px;"
            v-model="examination.examNotification[i].classId" placeholder="请选择活动区域">
              <el-option v-for="(c, idx) in get_ClassList_ByGradeId" :key="idx"
               :label="v.className" :value="c.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="监考老师"  style="display:inline-block;">
          <el-select size="medium" style="width:400px;"
            v-model="notification.examination.invigilator"
            multiple clearable
            filterable
            allow-create
            default-first-option
            placeholder="请选择监考老师">
            <el-option
              v-for="item in getTeachers"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        </p>
        <el-form-item label="备注" style="max-width:1020px;width:80%;">
          <el-input type="textarea" rows="2" clearable resize="none" 
           v-model="examination.remark"></el-input>
        </el-form-item>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="ExamSubmit('ExamNotice', examination)">确定</el-button>
          <el-button size="medium" round @click="examinationVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 个人中心 -->
    <div class="selfInfoWrapper">
      <div @click="noticeVisible=true;"
        class="selfCard" :modal="false"
        style="background:rgb(243,114,118);"
      >
        <span
          class="cardLeft"
          style=""
        >公告添加</span>
        <span class="cardRight"><i
          class="el-icon-edit"
          style="font-size:20px;color:#fff;"
        /></span>
      </div>
      <div
        class="selfCard" @click="examinationVisible = true;"
        style="background:rgb(255,170,61)"
      >
        <span class="cardLeft">考试通知</span>
        <span class="cardRight"><i
          class="el-icon-edit"
          style="font-size:20px;color:#fff;"
        /></span>
      </div>
      <div
        class="selfCard"
        style="background:rgb(37,203,183);"
      >
        <span class="cardLeft">5门课程 有待答疑</span>
        <span class="cardRight"><i
          class="el-icon-edit"
          style="font-size:20px;color:#fff;"
        /></span>
      </div>
      <div
        class="selfCard"
        style="background:#39f;"
      >
        <span class="cardLeft">2个班级有待测试</span>
        <span class="cardRight"><i
          class="el-icon-edit"
          style="font-size:20px;color:#fff;"
        /></span>
      </div>
    </div>
    <el-container style="margin-top:10px;">
      <el-aside
        class="myself"
        width="200px"
      >
        <div class="top" />
        <div class="middle">
          <img
            class="site"
            src="../../assets/img/cat.png"
            alt=""
          >
        </div>
        <div class="bottom">
          <ul>
            <li>姓名：李廉江</li>
            <li>年龄：24</li>
            <li>性别：男</li>
            <li>工号：1100011</li>
            <li>职务：物理老师</li>
            <li>年级：3年级</li>
            <li id="button">
              <el-button
                type="info"
                style="background:rgb(70, 76, 91);padding:6px;"
                size="mini"
                @click="setInfo = true"
              >
                信息设置
              </el-button>
              <el-button
                type="warning"
                style="padding:6px;"
                size="mini"
                @click="resetPwd = true;"
              >
                密码修改
              </el-button>
            </li>
          </ul>
        </div>
      </el-aside>
      <!-- 信息设置框 -->
      <el-dialog
        :modal="false"
        :modal-append-to-body="false"
        title="提示"
        :visible.sync="setInfo"
        width="40%"
        center
      >
        <el-form 
          class="form refuseCopy"
          size="small"
          :model="self"
          label-width="100px"
        >
          <el-form-item label="学校">
            <el-input
              v-model="self.school"
              style="width:240px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              v-model="self.name"
              style="width:240px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio
              v-model="self.sex"
              label="男"
            >
              男
            </el-radio>
            <el-radio
              v-model="self.sex"
              label="女"
            >
              女
            </el-radio>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input
              v-model="self.age"
              style="width:120px;"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="年级">
            <el-input
              v-model="self.grade"
              style="width:120px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="班级">
            <el-input
              v-model="self.classroom"
              style="width:120px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="入学日期">
            <el-date-picker
              v-model="self.date"
              align="right"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button @click="setInfo = false">
              取 消
            </el-button>
            <el-button
              type="primary"
              @click="setInfo = false"
            >
              确 定
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 密码修改框 -->
      <el-dialog
        title="密码重置"
        :close-on-click-modal="false"
        :visible.sync="resetPwd"
        :modal="false"
        width="40%"
        center
      >
        <el-form
          class="form refuseCopy"
          size="small"
          :model="self"
          label-width="100px"
        >
          <el-form-item label="原始密码">
            <el-input
              v-model="self.pre_pwd"
              style="width:240px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="原始密码">
            <el-input
              v-model="self.new_pwd"
              style="width:240px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="原始密码">
            <el-input
              v-model="self.confirm_pwd"
              style="width:240px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button @click="resetPwd = false">
              取 消
            </el-button>
            <el-button
              type="primary"
              @click="resetPwd = false"
            >
              确 定
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-main style="margin-left:10px;overflow-y:auto !important;height:292px;">
        <div style="border-bottom:solid 1px #f0f0f0;padding:6px;">
          <span
            class="bottom"
            style="border-bottom:solid 2px #39f;padding-bottom:6px;"
          ><i class="el-icon-user" />通知公告</span>
        </div>
        <ul id="notice">
          <li>[置顶]关于任课教师交流平台的通知</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>3</li>
          <li>3</li>
          <li>3</li>
        </ul>
      </el-main>
    </el-container>
    <el-container id="containerEl">
      <el-aside
        class="asideEl"
        width="calc(100% - 410px)"
      >
        <div style="border-bottom:solid 1px #f0f0f0;padding:6px;">
          <span
            class="bottom"
            style="border-bottom:solid 2px #42b9a0;padding-bottom:6px;"
          >
            <i class="el-icon-user" />课程表</span>
        </div>
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>时间</th>
              <th
                v-for="day in courseDatas.courseInfo"
                :key="day[0]"
              >
                {{ day['courseTime'] }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="v in courseDatas.weeks"
              :key="v"
            >
              <th>周{{ getWeek(v - 1) }}</th>
              <th
                v-for="(va,i) in courseDatas.courseInfo"
                :key="i"
              >
                {{ va[getWeek2(i)] }}
              </th>
              <!-- {{va[getWeek2(v - 1)]}} -->
            </tr>
          </tbody>
          <!-- <tbody>
                <tr v-for="(v,i) in courseDatas.courseInfo" :key="i">
                  <th v-for="(va, key,index) in v" :key="index">
                    <p style="margin-bottom:4px;" v-if="index < 1 ">第{{i+1}}节</p>
                    {{va}}
                  </th>
                </tr>
              </tbody> -->
        </table>
      </el-aside>
      <el-main
        class="mainEl"
        style="max-width:400px;"
      >
        <div style="border-bottom:solid 1px #f0f0f0;">
          <span
            class="bottom"
            style="border-bottom:solid 2px #e01212;padding-bottom:6px;"
          >
            <i class="el-icon-user" />快速链接</span>
        </div>
        <!-- <div class="link">
              <span class="linkTop"></span>
            </div> -->
        <links :link-info="'#f44'">
          <template v-slot:header>
            NO.1
          </template>
          <template v-slot:main>
            学校官网
          </template>
          <!-- <main>#fff</main> -->
        </links>
        <links
          :link-info="'#f60'"
          style="margin:2% 13px"
        >
          <template v-slot:header>
            NO.2
          </template>
          <template v-slot:main>
            教务处网
          </template>
        </links>
        <links :link-info="'#f90'">
          <template v-slot:header>
            NO.3
          </template>
          <template v-slot:main>
            学校资源
          </template>
        </links>
        <links :link-info="'#1296db'">
          <template v-slot:header>
            NO.4
          </template>
          <template v-slot:main>
            课程观摩
          </template>
        </links>
        <links
          :link-info="'#39f'"
          style="margin:0 13px"
        >
          <template v-slot:header>
            NO.5
          </template>
          <template v-slot:main>
            开课申请
          </template>
        </links>
        <links :link-info="'#0c6'">
          <template v-slot:header>
            NO.6
          </template>
          <template v-slot:main>
            个人资源
          </template>
        </links>
      </el-main>
    </el-container>
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
      setInfo: false,
      resetPwd: false,
      noticeVisible: false,
      dialogVisible: false,
      hideUploadEdit: false,
      examinationVisible: false,
      rules: {
        gradeId: {required: true, message: '请输入年级', trigger: 'blur'},
        level: { required: true, message: '请输入通知等级', trigger: 'blur' },       //通知等级 /普通/紧急/倒计时
        startTime: {required: true, message: '请输入开始时间', trigger: 'blur'},      //开始时间
        subject: { required: true, message: '请输入考试科目', trigger: 'blur'},      //学科
        title: { required: true, message: '请输入标题', trigger: 'blur'},      //学科
        time: { required: true, message: '请输入起始&结束日期', trigger: 'blur'},      //学科
        // remark: '',       //备注
        // invigilator: '',  //监考员
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
        subject: '',      //学科
        remark: '',       //备注
        invigilator: '',  //监考员
        scope: '',        //范围
        examNotification: []
      },
      dialogImageUrl:'',
      pickerOptions: {
       disabledDate: (time) => {
         let nowData = new Date()
         nowData = new Date(nowData.setDate(nowData.getDate() - 1))
         return time < nowData;
       }
      },
      self: {
      },
      courseDatas: {
        
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
    // ...mapGetters({
    //   getGrade: 'getGrade',
    //   getCourseList: 'get_CourseList',
    //   getTeachers: 'getTeachers',
    //   get_ClassList_ByGradeId: ''
    // })
    // getGrade() {
    //   return this.$store.getters.getGrade;
    // },
    // getCourseList() {
    //   return this.$store.getters.get_CourseList;
    // }
  },
  methods: {
    // btnUpload() {
    //     var formData = new FormData($("#uploadForm")[0]);
    //     $.ajax({
    //         type: "POST",
    //         data: formData,
    //         url: "http://192.168.1.238:8777/brand/setNotificationPicture",
    //         contentType: false,
    //         processData: false,
    //         success: function (res) {
    //           console.log(res)
    //         }
    //     })
    // },
    convocationNotice() {
      
    },
    ExamSubmit(form, examination) {
      this.$refs[form].validate(invlid => {
        if(valid) {
          console.log(examination)
        }
      })
    },
    gradeChange(id){
      if(id) {  
        let that = this;
        this.$store.dispatch('getClassListByGradeId', id)
        .then(res => {
          console.log('resssssssssss');
          console.log(res)
          // this.notification.examNotification.push()
          if(res && res.length) {
            console.log('innnnnnnnnnnnnnnnnn')
            console.log(res)
            res.forEach(v => {
              that.examination.examNotification.push(v)
            })
              // console.log(this.examination.)
          }
        })
      }
    },
    onSubmit(form, notice) {
      console.log('......................')
      console.log(notice);
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
    dateChange(dateArr) {
      if(dateArr) {
        this.notification.startTime = dateArr[0];
        this.notification.endTime = dateArr[1];
      }else{
        this.notification.startTime = '';
        this.notification.endTime = '';
      }
    },
    set_request(file) {
      console.log(1)
      console.log(file);
      this.notification.uploadFile.push(fx.fileHandle(file))
    },
    addPhoto(file, fileList) { //添加图片的回调
      // console.log(typeof file);
      console.log(file);
       let vm = this
        vm.hideUploadEdit = fileList.length > 4;
        // console.log(this.hideUploadEdit)
      let formData = fx.fileHandle(file);
      console.log('formData')
      console.log(formData);
      this.notification.uploadFile.push(formData)
      console.log(this.notification.uploadFile)
      // this.$refs['uploadphoto'].submit();
      // console.log(this.notification);
      // let formData = new FormData();
      // formData.append('file', file);
      // console.log(formData)
      // console.log(fileList);
      // console.log($('#addPotos'))
      $.ajax({
        url: 'http://192.168.1.238:8777/brand/setNotificationPicture',
        method: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(res) {
          console.log(res)
        }
      })
    },
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
    },
    getWeek (day) {
      let chars = ['一', '二', '三', '四', '五', '六', '七']
      return chars[day]
    },
    getWeek2 (day) {
      let chars = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      return chars[day]
    }
  },
  mounted() {
    this.$store.dispatch('GradeList');
    this.$store.dispatch('getTeachersInfo');
  }
}
</script>

<style lang="scss" scoped>
  #self{
    background:#f0f0f0;
    padding:10px;
    .selfInfoWrapper{
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
          height:54px;width:54px;display:inline-block;
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
    .myself{
      position:relative;
      font-size:12px;
      // border:solid 1px;
      width:180px;
      // margin-top:20px;
      .top{
        background-image: url("../../assets/img/topic6.jpg");
        background-size: 100% 100%;
        height:130px;
        // border-bottom:solid 1px;
      }
       .middle{
          .site{
            height:50px;
            width:50px;
            border-radius:50%;
            position: absolute;
            top:100px;
            left:70px;
            border:solid 2px #eee;
          }
        }
      .bottom{
        background:#fff;
        width:100%;
        padding:20px 0 6px 10px;
        ul{
          width:90%;
          margin:0 auto;
          // border:solid 1px;
          li{
            padding-left:10px;
            margin-top:2px;
            #button{
              padding-left:0 !important;
              text-align:center;
            }
          }
        }
      }
    }
    #notice{

      overflow-y: auto !important;
      li{
        padding:8px;
        border-bottom:solid 1px #e0e0e0;
      }
    }
    #containerEl{
      margin-top:8px;height:calc(100% - 374px);
      .asideEl{
        background:#fff; padding:4px;overflow-y:auto;
        height:100%;
        table{
          margin:6px auto;
          width:86%;
          height:80%;
          border:0;
          table-layout: fixed;
          thead{
            color:#fff;background:#67a1ff;
            th{
              padding:0px 5px;height:30px;
            }
          }
          tbody{
            background: #eaf2ff;
            color:#909399;
            th,
            td {
                font-size:14px;
                width: 60px;
                // padding: 2% 0px;
                padding: 3px 0px;
                text-align: center;
                font-weight: 500;
            }
            tr th:first-child{
              color:#666;
            }
          }
        }
      }
      .mainEl{
        margin-left:10px;
      }
    }
    .el-main{
      padding:7px;
    }
    .el-dialog__header{
      // background:#1296db;
      background-image: linear-gradient(to right, #2980b9, #6dd5fa, #fff);
      .el-dialog__title{
        color:#fff !important;
      }
    }
    .el-dialog__body{
      background:#efefef;
      background-image: linear-gradient(to right, #C6FFDD, #FBD786, #f7797d);

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
</style>
