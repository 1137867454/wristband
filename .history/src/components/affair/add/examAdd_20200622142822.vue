<template>
  <div class="mainIn">
      <p class="underline">
          <span class="highLight">公告添加</span>
      </p>
      <el-form style="width:80%;margin:0 auto;padding:10px;"
       ref="exam" :model="examination" :rules="rules"
        label-width="80px" label-position="center">

          <el-form-item label="考试科目" prop="subjects" style="display:inline-block;">
            <el-select clearable size="small" class="input_260"
             v-model="examination.subjects" placeholder="请选择考试科目">
              <el-option v-for="(v,i) in get_CourseList" :key="i"
               :label="v.name" :value="v.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="范围"  style="display:inline-block;">
          <el-input clearable size="small" class="input_260" v-model="examination.scope"></el-input>
        </el-form-item>
          <el-form-item label="年级" prop="gradeId" style="display:inline-block;">
            <el-select class="input_260" @change="gradeChange" size="small" v-model="examination.gradeId" placeholder="请选择年级">
              <el-option v-for="(v,i) in getGrade" :key="i"
               :label="v.gradeName" :value="v.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 时间 -->
          <el-form-item label="期限" prop="time"  style="display:inline-block;">
          <el-date-picker clearable :picker-options="pickerOptions"
          v-model="examination.time" value-format="yyyy-MM-dd HH:mm"
          size="small" format="yyyy-MM-dd HH:mm"
          type="datetimerange" style="width:300px;"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="exameDateChange">
        </el-date-picker>
        </el-form-item>
        <p class="animated fadeIn" v-for=" (ex, i) in classArr" :key="i+'.'" >
          
          <el-form-item label="班级" prop="" style="display:inline-block;">
            <el-select class="input_260" disabled
             v-model="examNotification[i].classId" 
             placeholder="请选择班级"
             style="font-size:12px !important;" 
             size="small" >
              <el-option v-for="(v,idx) in classArr" :key="idx"
               :label="v.className" :value="v.classId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="监考老师" prop="" style="display:inline-block;">
            <el-select class="input_260" v-model="examNotification[i].invigilatorArr" multiple
                filterable allow-create size="small"
                default-first-option
                placeholder="请选择监考老师">
                <el-option
                  v-for="item in getTeachers"
                  :key="item.name"
                  :label="item.label"
                  :value="item.name">
                </el-option>
              </el-select>
          </el-form-item>
        </p>
            
        <el-form-item label="备注" style="width:80%;">
          <el-input type="textarea" class="input_260" rows="2" 
           v-model="examination.remark"></el-input>
        </el-form-item>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="examSubmit('exam', examination)">确定</el-button>
          <el-button size="medium" round @click="examinationVisible = false">取消</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'mainIn',
    data() {
        return {
            examinationVisible: false,  //公告添加,
            rules: {
                gradeId: {required: true, message: '请输入年级', trigger: 'blur'},
                level: { required: true, message: '请输入通知等级', trigger: 'blur' },       //通知等级 /普通/紧急/倒计时
                startTime: {required: true, message: '请输入开始时间', trigger: 'blur'},      //开始时间
                subject: { required: true, message: '请输入考试科目', trigger: 'blur'},      //学科
                title: { required: true, message: '请输入标题', trigger: 'blur'},      //学科
                time: { required: true, message: '请输入起始&结束时间', trigger: 'blur'},      //学科
                id: { required: true, message: '请至少选择一位老师', trigger: 'blur' },
                uploadFile: { required: true, message: '请选择微课视频', trigger: 'blur' },
                name: { required: true, message: '请填写微课名称', trigger: 'blur' },
                subjects: { required: true, message: '请填写考试科目', trigger: 'blur'}
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
            classArr: [],
            examNotification: [],
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
        getGrade() {
            return this.$store.getters.getGrade;
        },
        get_CourseList() {
            return this.$store.getters.get_CourseList;
        },
        getTeachers() {
            return this.$store.getters.getTeachers;
        }
    },
    methods: {
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
        gradeChange(id){ //年级改变引出对应班级
            console.log('gradeChange:  ' + id)
            if(id) {  
                let that = this;
                this.$store.dispatch('getClassListByGradeId', id)
                .then(res => {
                console.log(res)
                if(!res.length) {
                    this.$message.error('当前年级下未添加班级');
                    this.examination.gradeId = '';
                }
                res.forEach(v => {
                    v.classId = v.id;
                    delete v.id;
                })
                this.examNotification = res;
                console.log(this.examNotification)
                this.classArr = res.concat([]);
                })
            }else{
                this.examNotification = [];
            }
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
                    delete v.classTeacherId;
                    delete v.internalClassId;
                    delete v.invigilatorArr;
                    delete v.time;
                    // delete v.gradeName;
                    // delete v.className;
                })
                console.log(this.examNotification);
                // axios({
                //   url:'http://192.168.1.238:8777/brand/setExamNotification',
                //   method: 'post',
                //   data: this.examNotification
                // })
                this.$store.dispatch('addExamination', this.examNotification)
                .then(res => {
                    console.log(res);
                    this.examinationVisible = false;
                    // this.$message.success('添加成功');

                }).catch(err => {
                    console.log(err);
                })
            }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mainIn{
    height:100%;
    overflow-y:auto;
    .underline{
        width:90%;
        margin: 0 10px;
        padding:0;
        color:#1296db;
        .highLight{
            display: inline-block;
            border-bottom:solid 2px #1296db;
            padding-bottom:6px;
            // border:solid 1px;
        }
    }
    #uploadForm{
        width:80%;
        margin: 0px 70px 20px;
    }
}

</style>