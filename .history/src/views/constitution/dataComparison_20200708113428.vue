<template>
  <div
    id="classAttendance"
    class="wrapper border" style="background:#f0f0f0;"
  >
    <div class="top">
      <!-- <span class="part">日统计</span>
      <span class="part">月统计</span> -->
      <div style="padding-bottom:10px;border-bottom:solid 1px #ddd;">
        <label style="margin: 0 10px;">日期</label>
        <el-date-picker @change="dateChange"
          v-model="rule.date"
          style="width:160px"
          type="date" value-format="yyyy-MM-dd"
          size="mini" format="yyyy-MM-dd"
          placeholder="选择日期"
        />
        <label style="margin: 0 10px;">年级
          <el-select v-model="gradeInfo"
          @change="gradeChange" value-key="id"
          style="padding-left:6px;width:160px"
           clearable size="mini">
            <el-option v-for="(v, i) in getGrade" :key="i"
              :label="v.gradeName" :value="v">

            </el-option>
          </el-select>
        </label>
        <label style="margin-left:4px;">
        班级
        <el-select v-model="classInfo" clearable
         style="width:160px;padding-left:6px;"
           placeholder="请选择班级" size="mini"
           @change="classChange"  value-key="id"
            no-data-text="请先确定年级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.className"
              :value="item">
            </el-option>
          </el-select>
      </label>
        
      </div>
      <ul class="studentCard">
        <li v-for="(s, i) in get_class_student" :key="i">
          {{s.studentName}}
        </li>
      </ul>
    </div>
      <!-- {{getGrade}} -->
      
      {{get_class_student}}
    <!-- 考勤图表 -->
  </div>
</template>
<script>
import tableDemo from '../../components/table'
export default {
  components: { tableDemo },
  data () {
    return {
      showOptions: false,
      height: '90%',
      rule: {
          classroom:'',
          date: new Date().Format('yyyy-MM-dd')
        },
      expands: [], //展开行,
      getRowKey(row) {
        return row.id;
      },
      rowKey: '',
      chartData: {
        // boundery
        dimensions: {
          name: 'attendance',
          data: ['早退 40', '迟到30', '缺勤 30', '出勤', '迟到&早退\n 20']
        },
        measures: [{
          name: '详情',
          data: [40, 30, 30, 40, 10, 20]
        }],
        // boundaryGap: true
      },
      // 折线图
      lineData: {
        dimensions: {
          name: 'Week',
          data: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fir.']
        },
        measures: [{
          name: '出勤率%',
          data: [60, 90, 78, 96, 90]
        }]
      },
      // 环形图
      chartSettings: {
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '18',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        avoidLabelOverlap: false
      },
      role: { 
        name: '考勤',
        // typeName: '上课考勤',
        startTime: '开始时间',
        endTime: '结束时间',
        dateInfo: '日期'
      },
      classList: [],
      classInfo: {},
      gradeInfo: {},
      classId: '',
      gradeName: ''
    }
  },
  computed: {
    // getOptions() {
    //   return this.$store.getters.getOptions;
    // },
    sdata() {
      let data = this.$store.getters.get_AttendenceList_ByDate;
      console.log(data)
      return data;
    },
    getGrade() {
      return this.$store.getters.getGrade;
    },
    get_ClassroomAttendence() {
      let data = this.$store.getters.get_ClassroomAttendence;
      // data.className = this.gradeName + this.className;
      return data;
    },
    get_class_student() {
      return this.$store.getters.get_class_student;
    }
  },
  methods: {
    handleChange(e) {
      console.log(e)
    },
    dblclick(row, cloumn, event) {
      console.log(row)
      if (this.expands.includes(row.id)) {
        this.expands = this.expands.filter(val => val !== row.id);
      } else {
        this.expands.splice(0,1,row.id)
        // this.expands.pop();
        // this.expands.push(row.id);
      }
    },
    dateChange(date) {
      this.$store.dispatch('getAttendenceListByDate', this.rule.date);
    },
    gradeChange(v) {
      console.log(v)
      if(v.id) {
        this.gradeName = v.gradeName;
        this.classId = '';
        this.classInfo = {};
        this.$store.dispatch('getClassListByGradeId', v.id)
        .then(res => {
          this.classList = res;
          console.log(res);
        })
      }else{
        this.classInfo = {};
        this.classId = '';
      }
    },
    classChange(v) {
      this.className = v.className;
      this.classId = v.id;
      this.$store.dispatch('getClassStudent_', v.id)
      console.log(v)
    },
    attendenceOverView(id) {
      console.log(this.classId);
      console.log(id);
      let classId = this.classId;
      if(classId) {
        this.$store.dispatch('getClassClockInOverview', {id, classId})
        .then((res) => {
          res.className = this.gradeName + this.className;
          this.chartData.dimensions.data = [
            '出勤' + res.appearedNum,
            '迟到' + res.lateStudentList.length,
            '缺勤' + res.disappearedNum,
            '请假' + res.leaveNum
          ];
          this.chartData.measures[0].data = [
            res.appearedNum, res.lateStudentList.length,
            res.disappearedNum,res.leaveNum
          ]
        })
      }else{
        this.$message.error("请先选择年级和班级")
      }
    }
  },
  beforeMount() {
  this.$store.dispatch('getAttendenceListByDate', this.rule.date)
  .then(res => {
    console.log('...................');
    console.log(res);
    let clockInId = res[0].id;
  })
  }
}
</script>
<style lang="scss" scoped>
  #classAttendance{
    // background: #f2f2f2;
    // border:solid 4px #fff;
    overflow:hidden;
    .nameList{
      color:#909399;
      margin:8px 10px;
      display: flex;
      flex-wrap: wrap;
      &>li{
        box-shadow: 0 0 10px #aaa;
        padding:8px;
        .Misbehavior{
          padding-right:6px;
        }
      }
    }
    .attendenceOverview{
      box-sizing: border-box;
      margin:8px 10px;
      display: flex;
      flex-wrap: wrap;
      &>li{
        box-shadow: 0 0 10px #aaa;
        padding:12px;
        margin-bottom:6px;
        margin-right:10px;
      }
    }
    .top{
      background:#fff;
      height:calc(100% - 10px);
      margin:4px;
    }
    .title{
      text-align:center;
      font-size: 14px;
      color:#666;
      position:relative;
      top:10px;
    }
    .el-main {
      padding:0;
    }
    .studentCard{
      display: flex;
      flex-wrap: wrap;
      li{
        padding:10px;
        margin:10px;
        text-align:center;
        width:90px;
        background:#fff;
        box-shadow: inset 0 0 2px #aaa;
        transition: all 0.8s linear;
        cursor: pointer;
        &:hover{
          box-shadow: 0 0 4px #39f;
          color:#0c6;
        }
      }
    }
  }
</style>
