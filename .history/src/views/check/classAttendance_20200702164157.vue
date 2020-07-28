<template>
  <div
    id="classAttendance"
    class="wrapper border" style="background:#f0f0f0;"
  >
    <div class="top ">
      <!-- <span class="part">日统计</span>
      <span class="part">月统计</span> -->
      <div style="display:inline-block;">
        <label style="margin: 0 10px;">日期</label>
        <el-date-picker @change="dateChange"
          v-model="rule.date"
          style="width:160px"
          type="date" value-format="yyyy-MM-dd"
          size="mini" format="yyyy-MM-dd"
          placeholder="选择日期"
        />
        <!-- <label v-if="showOptions" style="margin-left:16px;">
          班级
          <el-cascader
            v-model="rule.classroom"
            style="width:180px;"
            size="mini"
            :options="getOptions"
            clearable
            placeholder="请选择班级"
            :props="{expandTrigger: 'hover'}"
            @change="handleChange"
          />
        </label> -->
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
    </div>
    <el-container style="background:#f0f0f0 ;">
      <el-aside width="38%" style="height:250px;overflow:hidden;background:#fff;margin:2px 4px;border-radius:6px;">
        <div class="title">
                  出勤详情
                </div>
                <ve-donut-chart
                  style="margin-left:-60px;"
                  :data="chartData"
                  :settings="chartSettings"
                  :legend="{icon: 'circle', selected: {'早退': true},
                            textStyle: {color: '#aaa'} ,y: 'center',
                            right: '10', top: '46',width: '0'}"
                  legend-position="top-center"
                  :height="250"
                />
      </el-aside>
      <el-main style="margin:2px 4px;border-radius:6px;height:250px;">
        <div class="animated fadeIn" v-if="get_ClassroomAttendence.clockInName">
          <ul class="attendenceOverview">
            <li>日期：<span style="color:#409eff;">{{get_ClassroomAttendence.clockInDate}}</span></li>
            <li><span style="color:#f68">{{get_ClassroomAttendence.className}}</span></li>
            <li>班级人数：<span style="color:#f90">{{get_ClassroomAttendence.memberNum}}</span></li>
            <li><span style="color:#399">{{get_ClassroomAttendence.clockInName.slice(get_ClassroomAttendence.clockInName.lastIndexOf('第'))}}</span></li>
            <li>应到：<span style="color:#f66;">{{get_ClassroomAttendence.expectNum}}</span></li>
            <li>实到：<span style="color:#00f">{{get_ClassroomAttendence.appearedNum}}</span></li>
            <li>缺勤：<span style="color:#f00;">{{get_ClassroomAttendence.disappearedNum}}</span></li>
            <li>请假：<span style="color:#0c6;">{{get_ClassroomAttendence.leaveNum}}</span></li>
            <li>迟到：<span style="color:#E6A23C;">{{get_ClassroomAttendence.lateStudentList.length}}</span></li>
          </ul>
          <ul class="nameList">
            <li style="flex:1;min-height:130px;">
              迟到人员名单：
              <div style="color:#776;">
                <span class="Misbehavior" v-for="(s, i) in get_ClassroomAttendence.lateStudentList" :key="i">
                  {{s.studentName}}
                </span>
                <!-- {{get_ClassroomAttendence.lateStudentList}} -->
              </div>
            </li>
            <li style="flex:1;min-height:130px;margin-left:10px;">
              缺勤人员名单：
              <!-- <span v-for="(s, i) in get_ClassroomAttendence.lateStudentList" :key="i">
                  {{s}}
              </span> -->
              <div style="color:#E6A23C;">
                <span class="Misbehavior" v-for="(ls, li) in get_ClassroomAttendence.disappearedStudentList" :key="li">
                    {{ls.studentName}}
                </span>
              </div>
              </li>
          </ul>
        </div>
        <!-- <ve-line-chart
              :data="lineData"
              :title="{subtext: '出勤记录%'}"
              :settings="{areaStyle: {}}"
              style="width:80%;margin:6px auto 0;"
              :height="250"
            /> -->
      </el-main>
      <!-- {{getGrade}} -->
    </el-container>
    <!-- 考勤图表 -->
    <div class="bottom bottoming ">
      <p style="padding:6px;color:#666;">
        考勤详情
      </p>
    <!-- {{get_ClassroomAttendence }} -->

      <!-- <ul v-if="get_ClassroomAttendence.clockInName" class="attendenceOverview">
        <li>日期：<span style="color:#409eff;">{{get_ClassroomAttendence.clockInDate}}</span></li>
        <li><span style="color:#f68">{{get_ClassroomAttendence.className}}</span></li>
        <li>总人数：<span style="color:#f90">{{get_ClassroomAttendence.memberNum}}</span></li>
        <li><span style="color:#399">{{get_ClassroomAttendence.clockInName.slice(get_ClassroomAttendence.clockInName.lastIndexOf('第'))}}</span></li>
        <li>应到：<span style="color:#f66;">{{get_ClassroomAttendence.expectNum}}</span></li>
        <li>实到：<span style="color:#00f">{{get_ClassroomAttendence.appearedNum}}</span></li>
        <li>缺勤：<span style="color:#f00;">{{get_ClassroomAttendence.disappearedNum}}</span></li>
        <li>请假：<span style="color:#0c6;">{{get_ClassroomAttendence.leaveNum}}</span></li>
        <li>迟到：<span style="color:#E6A23C;">{{get_ClassroomAttendence.lateStudentList.length}}</span></li>
      </ul> -->
      <el-table style="background:rgba(243,249,248,0.8)"
        size="mini" height="calc(100% - 30px)"
        row-class-name="table"
        header-cell-class-name="tableHeader"
        class="animated fadeIn"
        :data="sdata"
        :border="true"
        :row-key="getRowKey"
        :expand-row-keys="expands"
        @row-dblclick="dblclick"
      >
        <el-table-column label="序号" width="50"
          :resizable="true"
          align="center"
          type="index"
        />
        <el-table-column type="expand" width="24">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.name }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
        <el-table-column
          v-for="(v,k,i) in role"
          :key="i"
          :resizable="true"
          align="center"
          :prop="k"
          :label="v"
        />
        <el-table-column
          align="center"
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              round>
            </el-button> -->
            
            <!-- <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle>
            </el-button> -->
            <el-button
              size="mini"
              type="primary"
              @click="attendenceOverView(scope.row.id)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
        // 学生对象 >> 属性
        // appearedNum: '实到人数',
        // className: '班级名称',
        // clockInName:'考勤名称',
        // clockInTime:'考勤时间',
        // disappearedNum:'缺席人数',
        // disappearedStudentList:	'缺席学生列表',
        // expectNum:'应到人数',
        // lateStudentList: '缺席学生列表',
        // leaveNum:'请假人数',
        // memberNum:'班级人数',       
        name: '考勤',
        // typeName: '上课考勤',
        startTime: '开始时间',
        endTime: '结束时间',
        dateInfo: '日期'
        // time: '时间',
        // number: '人数',
        // absence: '缺勤',
        // leaveEarly: '早退',
        // beLate: '迟到',
        // late_leave: '迟到&早退',
        // percentage: '出勤率'
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
    // if(this.rule.date) {
    //     this.$store.dispatch('getClassAttendenceList', this.rule.date)
    // }
  
  // console.log(this.$store.getters.getClasses)
  this.$store.dispatch('getAttendenceListByDate', this.rule.date)
  .then(res => {
    // console.log(this.$store.getters.getClasses[1].id)
    // console.log(res[0].id);
    console.log('...................');
    console.log(res);
    let clockInId = res[0].id;
    // this.$store.dispatch('getClassSelect')
    // .then(resp => {
    //   console.log(resp)
    //   let defaultClass = resp[1];
    //   this.classId = defaultClass.id;
    //   this.attendenceOverView(clockInId);
    //   this.className = defaultClass.className;
    //   this.gradeName = defaultClass.gradeName;
    //   // this.gradeInfo = {
    //   //   id: defaultClass.gradeId,
    //   //   gradeName: defaultClass.gradeName
    //   // }
    //   // this.gradeChange(this.gradeInfo);
    //   // this.classInfo = defaultClass;
    // })
  })
  }
}
</script>
<style lang="scss" scoped>
  #classAttendance{
    // background: #f2f2f2;
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
        // margin-bottom:6px;
        // margin-right:10px;
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
    .bottoming{
      padding:4px;background: #fff;
    }
    .top{
      background:#fff;
      margin:4px;
    }
    .title{
      text-align:center;
      font-size: 14px;
      color:#666;
      position:relative;
      top:10px;
    }
    .bottom{
      height:calc(100% - 306px);
      overflow: hidden;
    }
    .el-main {
      padding:0;
    }
  }
</style>
