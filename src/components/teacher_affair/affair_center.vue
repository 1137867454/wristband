<template>
    <div id="affair_center">
        <el-dialog :modal="false" fullScreen
          title="值日安排" width="600px"
          :visible.sync="cleanVisible" top="8vh"
          style="position:absolute;z-index:3333;"
          center :inline="true">
      <el-form style="width:90%;margin:0 auto;"
       ref="dutyForm" :model="dutyList" :rules="rules"
        label-width="90px" label-position="center">
          <p v-for="v in weeknum" :key="v">
            <el-form-item label="" style="display:inline-block;width:220px;">
              <el-select clearable size="small" 
              v-model="week[v - 1]" 
              placeholder="请选择星期" disabled>
                <el-option label="星期一" :key="1" :value="1"></el-option>
                <el-option label="星期二" :key="2" :value="2"></el-option>
                <el-option label="星期三" :key="3" :value="3"></el-option>
                <el-option label="星期四" :key="4" :value="4"></el-option>
                <el-option label="星期五" :key="5" :value="5"></el-option>
                <el-option label="星期六" :key="6" :value="6"></el-option>
                <el-option label="星期日" :key="7" :value="7"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="值日组长" prop="leader" style="display:inline-block;width:220px;">
              <el-select clearable size="small" 
              v-model="dutyList.leader[v - 1]" 
              placeholder="请选择负责人">
                <el-option label="李秋水" value="李秋水"></el-option>
                <el-option label="曲兴凌" value="曲兴凌"></el-option>
                <el-option label="王焕之" value="王焕之"></el-option>
                <el-option label="孙晶晶" value="孙晶晶"></el-option>
                <el-option label="赵倩" value="赵倩"></el-option>
              </el-select>
            </el-form-item>
          </p>
          <p class="btn_weeknum">
            <el-button v-if="weeknum < 7" size="mini"
           type="success" class="animated fadeIn" icon="el-icon-circle-plus"
           @click="weeknumChange"
           circle></el-button>
          <el-button v-if="weeknum > 5" size="mini"
           type="danger" class="animated fadeInLeft" icon="el-icon-remove-outline"
           @click="weeknumSubtract"
           circle></el-button>
          </p>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="onSubmit('dutyForm', dutyList)">确定</el-button>
          <el-button size="medium" round @click="cleanVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!-- 班干部 -->
    <el-dialog :modal="false"
      title="班干部" width="500px"
      :visible.sync="classLeaderVisible"
      style="position:absolute;z-index:3333;"
      center>
      <el-form style="width:80%;margin:0 auto;padding:10px;"
       ref="cleassLeader" :model="classLeader" :rules="rules"
        label-width="80px" label-position="left">

          <el-form-item label="职位" prop="job" style="display:inline-block;">
            <el-select clearable filterable allow-create
            size="small" class="input_220" default-first-option
             v-model="classLeader.job" placeholder="请选择班干部名称">
              <el-option v-for="(v,i) in classJob" :key="i"
               :label="v.value" :value="v.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生姓名" prop="stuName" style="display:inline-block;">
            <el-select clearable filterable allow-create
            size="small" class="input_220" default-first-option
             v-model="classLeader.stuName" placeholder="请选择学生名">
              <el-option label="张三" value="张三"></el-option>
                <el-option label="曲兴凌" value="李四"></el-option>
                <el-option label="曲兴凌" value="李四"></el-option>
                <el-option label="王焕之" value="王二麻子"></el-option>
                <el-option label="王焕之" value="王二麻子"></el-option>
                <el-option label="王焕之" value="王二麻子"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="classLeaderSubmit('cleassLeader', classLeader)">确定</el-button>
          <el-button size="medium" round @click="classLeaderVisible = false">取消</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 添加班级任课老师 -->
     <el-dialog :modal="false" fullScreen
          title="添加任课老师" width="600px"
          :visible.sync="classTeacherVisible" top="8vh"
          style="position:absolute;z-index:3333;"
          center :inline="true">
      <el-form style="width:90%;margin:0 auto;"
       ref="classTeacher" :rules="rules"
       v-model="course_teacher"
        label-width="90px" label-position="center">
          <p v-for="v in courseNum" :key="v">
            <el-form-item prop="teacherList" label="学科" style="display:inline-block;width:220px;">
              <el-select clearable size="small" 
              v-model="course_teacher.teacherList[v - 1]" value-key="id" 
              placeholder="请选择学科">
                <el-option v-for="(c, i) in get_CourseList"
                  :key="i"
                  :label="c.name"  :value="c"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任课老师" prop="teachers" style="display:inline-block;width:220px;">
              <el-select clearable size="small" value-key="id"
              v-model="course_teacher.teachers[v - 1]" @change="courseChange"
              placeholder="请选择任课老师">
                <el-option v-for="(v, i) in getTeachers" :key="i" :label="v.name" :value="v"></el-option>
              </el-select>
            </el-form-item>
          </p>
          <p class="btn_weeknum">
            <el-button size="mini"
           type="success" class="animated fadeIn" icon="el-icon-circle-plus"
           @click="courseNumChange"
           circle></el-button>
          <el-button v-if="courseNum > 1" size="mini"
           type="danger" class="animated fadeInLeft" icon="el-icon-remove-outline"
           @click="courseNumSubtract"
           circle></el-button>
          </p>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="addTeacher('classTeacher', course_teacher)">确定</el-button>
          <el-button size="medium" round @click="classTeacherVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 班级荣誉添加 -->
    <el-dialog title="荣誉添加" :visible.sync="honorVisible" :modal="false" width="500px">
      
      <el-form label-width="80px" style="padding-left:26px;" label-position="left" ref="honour" :model="honour" :rules="rules" >
        <el-form-item prop="title" label="荣誉名称">
          <el-input size="small" class="input_260" v-model="honour.title"></el-input>
        </el-form-item>
        <el-form-item prop="honourDesc" label="描述">
          <el-input size="small" class="input_260" v-model="honour.honourDesc"></el-input>
        </el-form-item>
        <el-form-item prop="uploadFile" label="图片">
          <input id="uploadhonour" size="small" class="input_260"
          type="file" accept="image/*" multiple
           @change="uploadHonourChange"
           >
        </el-form-item>

        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="addHonour('honour', honour)">确定</el-button>
          <el-button size="medium" round @click="honorVisible = false">取消</el-button>
          
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 班级相册添加 -->
    <el-dialog title="班级相册" :visible.sync="albumVisible" :modal="false" width="500px">
      <el-form label-width="40px"
       style="padding-left:26px;" 
       label-position="left" ref="album" 
       :model="album" :rules="rules" >
        <!-- <el-form-item prop="title" label="荣誉名称">
          <el-input size="small" class="input_260" v-model="honour.title"></el-input>
        </el-form-item>
        <el-form-item prop="honourDesc" label="描述">
          <el-input size="small" class="input_260" v-model="honour.honourDesc"></el-input>
        </el-form-item> -->
        <!-- {{albumList}} -->
        <el-form-item label="">
          <el-upload ref="uploadAlbum"
            class="upload-demo"
            action="" style="width:336px;"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :limit="6"
            multiple :auto-upload="false"
            :http-request="set_request"
            list-type="picture">
            <el-button size="small" type="primary">图片上传</el-button>
            <div slot="tip" class="el-upload__tip" style="position:absolute;top:-6px;right:60px; ">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item prop="uploadFile" label="图片">
          <input id="uploadhonour" size="small" class="input_260"
          type="file" accept="image/*" multiple
           @change="uploadHonourChange"
           >
        </el-form-item> -->

        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="uploadAlbum('album', album)">确定</el-button>
          <el-button size="medium" round @click="albumVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 班级作品添加 -->
    <el-dialog title="作品添加" :visible.sync="workVisible" :modal="false" width="500px">
      
      <el-form label-width="60px" style="width:340px;margin:0 auto;" label-position="left" ref="work" :model="work" :rules="rules" >
        <el-form-item prop="author" label="作者">
          <el-input size="small" class="input_260" v-model="work.author"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input size="small" class="input_260" v-model="work.narrate"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <input id="uploadWork" size="small" class="input_260"
          type="file" accept="image/*" 
           >
           <!-- @change="uploadWorkChange" -->
        </el-form-item>

        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="addWork('work', work)">确定</el-button>
          <el-button size="medium" round @click="workVisible = false">取消</el-button>
          
        </el-form-item>
      </el-form>
    </el-dialog>
        <p class="underline" style="color:#909399;">班级管理</p>
        <div class="selfInfoWrapper">
          <div
            class="selfCard" :modal="false"
            style="background:rgb(243,114,118);"
          >
            <router-link to="dutyList"
              class="cardLeft"
              style=""
            >值日安排</router-link>
            <span class="cardRight" @click="cleanVisible=true;"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <div
            class="selfCard" 
            style="background:rgb(255,170,61)"
          >
            <router-link to="leader" class="cardLeft">班干部</router-link>
            <span class="cardRight" @click="classLeaderVisible = true;"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <!-- <div @click="teacherVisible = true"
            class="selfCard"
            style="background:rgb(37,203,183);"
          >
            <span class="cardLeft">优秀教师</span>
            <span class="cardRight"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div> -->
          <div
            class="selfCard"
            style="background:#39f;"
          >
            <router-link to="classTeacher" class="cardLeft">任课老师</router-link>
            <span class="cardRight"  @click="classTeacherVisible = true"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <div class="selfCard"></div>
        </div>
        <p class="underline" style="color:#909399;">班级风采</p>
        <div class="selfInfoWrapper">
          <div class="selfCard"
            style="background-image:linear-gradient(to right, #DA4453, #89216B);"
          >
            <router-link to="classHonor"
              class="cardLeft"
              style=""
            >班级荣誉</router-link>
            <span class="cardRight"  @click="honorVisible=true;"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <!-- <div
            class="selfCard" @click="classLeaderVisible = true;"
            style="background:rgb(255,170,61)"
          >
            <span class="cardLeft">班级风采</span>
            <span class="cardRight"><i
              class="el-icon-message-solid"
              style="font-size:20px;color:#fff;"
            /></span>
          </div> -->
          <div
            class="selfCard"
            style="background-image:linear-gradient(to right, #FF0099, #493240);"
          >
            <router-link to="classPictures" class="cardLeft">班级相册</router-link>
            <span @click="albumVisible = true" class="cardRight"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <div
            class="selfCard"
            style="background-image:linear-gradient(to right, #8E2DE2, #4A00E0);"
          >
            <router-link to="classWorks" class="cardLeft">班级作品</router-link>
            <span class="cardRight"  @click="workVisible = true"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <div class="selfCard"></div>
        </div> 
          <!-- {{getUser}} -->
    </div>
</template>
<script>
import fx from '../../util/fx';
import links from '../../components/links';
import axios from 'axios';
import {mapGetters} from 'vuex';
import service from '../../util/api_'
export default {
  name: 'Self',
  components: {
    links
  },
  data () {
    return {
      teacherVisible: false,
      cleanVisible: false,
      dialogVisible: false,
      classTeacherVisible: false,
      hideUploadEdit: false,
      classLeaderVisible: false, //班干部
      honorVisible: false,  //荣誉
      albumVisible: false,  //相册
      workVisible: false,   //班级作品
      showOptions: false,
      rules: {
        gradeId: {required: true, message: '请输入年级', trigger: 'blur'},
        week: { required: true, message: '请输入通知等级', trigger: 'blur' },       //通知等级 /普通/紧急/倒计时
        startTime: {required: true, message: '请输入开始时间', trigger: 'blur'},      //开始时间
        job: { required: true, message: '请输入考试科目', trigger: 'blur'},      //学科
        title: { required: true, message: '请输入标题', trigger: 'blur'},      //学科
        time: { required: true, message: '请输入起始&结束时间', trigger: 'blur'},      //学科
        id: { required: true, message: '请至少选择一位老师', trigger: 'blur' },
        stuName: { required: true, message: '请填写微课名称', trigger: 'blur' },
        teacherList: { required: true, message: '请填写微课名称', trigger: 'blur' },
        teachers: { required: true, message: '请填写微课名称', trigger: 'blur' },
        author: { required: true, message: '请填写作者姓名', trigger: 'blur' },
        narrate: { required: true, message: '请填写作品描述', trigger: 'blur' },
        uploadFile: { required: true, message: '请选择图片', trigger: 'blur' },
        // microDesc: { required }
        // remark: '',       //备注
        // invigilatorArr: '',  //监考员
        // scope: '', 
      },
      weeknum: 5,
      week: [1,2,3,4,5,6,7],
      course_teacher: {
        teacherList: [],
        teachers: []
      },
      album: {
      },
      albumList: [],
      work: {
        // uploadFile: ''
      },
      fileList: [],
      courseNum: 1,
      dutyList: { //值日组长参数列表
      classId: '',
      leader: []
      },
      classJob: [{
        label: '班长',
        value: '班长'
      },
      {
        label: '副班长',
        value: '副班长'
      }],
      classLeader: {
        job: '',      //班干部职称
        stuName:''
      },
      honour: {
        uploadFile: '',
        title: '',
        honourDesc: ''
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
  computed: {
    getCourse (day) {
      return function (day) {
        return this.course.filter(v => {
          return v.day === day
        })
      }
    },
    ...mapGetters([
        // 'getGrade',
        'getTeachers',
        'get_CourseList',
        // 'getGoodTeachers',
        // 'getOrdinaryTeachers',
        'getUser',
        'get_ClassList_ByGradeId']),
  },
  methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      weeknumChange() {
        this.weeknum ++;
      },
      weeknumSubtract() {
        this.weeknum --;
      },
      courseNumChange() {
        this.courseNum ++;
      },
      courseNumSubtract() {
        this.courseNum --;
        this.course_teacher.teacherList.splice(this.courseNum,1);
        this.course_teacher.teachers.splice(this.courseNum,1);
        console.log(this.courseNum)
      },
      courseChange(v) {
        console.log(v);
      },
    classLeaderSubmit(form, classLeader) { //班干部
      this.$refs[form].validate(valid => {
        if(valid) {
          console.log(classLeader)
          classLeader.classId = "1248147290481410049";
          this.$store.dispatch('addClassLeader', classLeader)
          .then(() => {
            this.classLeaderVisible = false;
          }).catch(err => {
            console.log(err);
          })
        }
      })
    },
    onSubmit(form, onDutyList) { //值日添加
      this.$refs[form].validate(valid => {
        if(valid) {
          onDutyList.classId = "1248147290481410049";
          console.log(onDutyList)
            this.$store.dispatch('setDutyList', onDutyList);
        }
      })
    },
    addTeacher(form, teacher) { //添加班级任课老师
      console.log(teacher)
      let course = teacher.teacherList;
      let list = teacher.teachers;
      let clen = course.length;
      let llen = list.length;
      let classTeacher = [];
      if(clen && llen && clen == llen && this.courseNum == clen ) {
        console.log(teacher)
        course.forEach((v, i) => {
          if(v.id && list[i].id) {
            let obj = {
              subjectsId: v.id,
              subjects: v.name,
              classId: '1248147290481410049',
              teacherId: list[i].id
            }
            classTeacher.push(obj);
          }else{
            this.$message.error('请先完善信息');
            return ;
          }
        })
        console.log(classTeacher)
        this.$store.dispatch('addClassTeacher', classTeacher)
        .then(res => {
          this.classTeacherVisible = false;
          this.course_teacher.teacherList = [];
          this.course_teacher.teachers = [];
        }).catch(err => {
          
        })
      }else{
        this.$message.error('请先完善信息')
      }
    },
    uploadHonourChange(file) {
      console.log(file)
        this.honour.uploadFile = '';
      if(file) {
        this.honour.uploadFile = ' ';
      }else{
        this.honour.uploadFile = '';
      }
    },
    uploadWorkChange(file) {
      console.log(file)
      if(file) {
        this.work.uploadFile = ' ';
      }else{
        this.work.uploadFile = '';
      }
    },
    addHonour(form, honour) {
      this.$refs[form].validate(valid => {
        if(valid) {
          let uploadFile = document.querySelector('#uploadhonour').files;
          let formData = new FormData();
          if(uploadFile) {
            uploadFile.forEach(v => {
              formData.append('uploadFile', v);
            })
          }
          // console.log(formData)
          delete honour.uploadFile;
          // honour.target = 'classTeam'
          honour.classInfoId = '1248147290481410049'
          console.log(honour);
          this.$store.dispatch('addClassHonor',honour)
          .then(() => {
            this.$store.dispatch('addClassHonorPic', formData)
            .then(res => {
              this.honorVisible = false;
              this.honour = {};
              this.$store.dispatch('getClassHonors');
            }).catch({

            })
          }).catch(err => {
            console.log(err);
          })
        }
      })
    },
    addWork(form, classAuthor) {
      this.$refs[form].validate(valid => {
        if(valid) {
          console.log(classAuthor);
          let uploadFile = document.querySelector('#uploadWork').files[0];
          let formData = new FormData();
          if(uploadFile) {
              formData.append('uploadFile', uploadFile);
          }
          this.$store.dispatch('addWorkPictures', formData)
            .then(res => {
              classAuthor.url = res;
              // this.$store.dispatch('addClassWorks', classAuthor)
              this.$store.dispatch('addClassWorks', classAuthor)
              .then(response => {
                this.work = {};
                this.workVisible = false;
              }).catch(error => {
                console.log(error);
              })
            }).catch(err => {

            })
          
        }else{
          return false;
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    onExceed(file, fileList) {
      console.log(file);
      console.log(fileList);
      this.$message.error('本次上传已超出个数限制，单次最多上传8张')
    },
    beforeUpload(file,fileList) {
      if(!file) {
        this.$message.error('请先上传图片');
      }
       var testmsg=/^image\/(jpeg|png|jpg)$/.test(file.type)
            const isLt4M = file.size / 1024/1024 <=4//图片大小不超过2MB
            console.log(file)
	          if (!testmsg) {
	            this.$message.error('上传图片格式不对!');
	            return
	          }
	          if(!isLt4M) {
	            this.$message.error('上传图片大小不能超过 4M!');
	            return
	          }
	          return testmsg  && isLt4M
    },
    set_request(file, fileList) {
      console.log(file);
      // this.fileList.push(fx.fileHandle(file.file))
      // let formData = new FormData();
      // if(file) {
      //   formData.append('uploadFile', file);
      //   this.fileList.push(formData);
      // }
        this.fileList.push(file.file);
    },
    uploadAlbum(form, album) {
      console.log(album);
      console.log(this.fileList)
      this.$refs['uploadAlbum'].submit();
        if(!this.fileList.length){
          this.$message.error('请先上传图片')
          return ;
        }
      console.log(this.fileList)
      console.log(this.albumList)
      let formData = new FormData();
      this.fileList.forEach(v => {
        formData.append('uploadFile', v);
      })
      console.log(formData);
      this.$store.dispatch('uploadAlbum', formData)
      .then(res => {
        this.albumVisible = false;
        this.$store.dispatch('getClassPictures');
      })
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
    //   })$
    // },
    onExceed() { //超出图片限制的回调
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
    this.$store.dispatch('GradeList');
    
  }
}
</script>

<style lang="scss">
  #affair_center{
    background:#fff;
    padding:10px;
    height:100%;
    .selfInfoWrapper{
      // background:#fff;
      // padding:10px;
      margin:12px 0;
      margin-bottom:12px;
      display:flex;height:66px;justify-content:space-between;
      text-align:center;
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
    .btn_weeknum{
      font-size:13px;
      width:70px;
      position:absolute;
      bottom:116px;
      right:30px;
      // border:solid 1px;
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
    #uploadForm{
      width:80%;
      margin: 0px 110px 20px;
    }
  }
  .input_260{
    width:260px;
  }
</style>