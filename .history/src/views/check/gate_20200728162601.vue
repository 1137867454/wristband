<template>
  <div
    id="PEAttendance"
    class="wrapper animated fadeIn" 
  >
    <div style="position:absolute;top:20px;right:20px;z-index:100;">
      <label style="margin-right:10px;">姓名
        <el-input v-model="leaveRule.byName"
         size="mini" style="width:140px;"
        placeholder="按姓名搜寻"></el-input>
      </label>
      <label style="margin-right:10px;">日期
        <el-date-picker
        v-model="leaveRule.byDate"
        style="width:140px;"
        type="date"
        size="mini" value-format="yyyy-MM-dd"
        placeholder="选择日期"
      /></label>
      <label>时间段
        <el-select size="mini" style="width:140px;;"
        v-model="leaveRule.byTime"
         clearable placeholder="选择时间段">
          <el-option
            v-for="item in timeLimit"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </label>
      <el-button @click="resetLeaveRule" class="resetButton tealButton" size="mini">重置</el-button>
    </div>
    <el-tabs
      v-model="activeName"
      class="refuseCopy"
      @tab-click="handleClick"
    >
      <el-tab-pane
        class="person clearfix"
        label="离校查询"
        name="second"
      >
        <el-radio-group size="mini" v-model="leaveRule.gate" style="margin: 10px;">
          <el-radio-button label="大门"></el-radio-button>
          <el-radio-button label="西门"></el-radio-button>
          <el-radio-button label="">总览</el-radio-button>
        </el-radio-group>
      <div style="" class="clearfix flexCard">
        <!-- <p
          v-for="(s,i) in pick"
          :key="i"
          class="card"
        >
          <span :class="getStatus(s.status)">{{ s.status }}</span>
          <span :class="getBg(s.status)">{{ s.name }}
            <div>{{ s.tel }}</div>
          </span>
        </p> -->
        <p
          v-for="(s,i) in get_leaveRecords"
          :key="i + ' '"
          class="card"
        >
          <span :class="getStatus(s.status)" style="background:#39f;">{{ s.scenario }}</span>
          <span :class="getBgByTime(s.leaveTime)">{{ s.studentName }}
            <div>{{ s.leaveTime.slice(s.leaveTime.length - 8) }}</div></span>
        </p>
        <p
          v-for="(s,i) in get_leaveRecords"
          :key="i + ' '"
          class="card"
        >
          <span class="bgblue spanleft" style="background:#39f;">{{ s.scenario }}</span>
          <span class="bgblue spanright">{{ s.studentName }}
            <div>{{ s.leaveTime.slice(s.leaveTime.length - 8) }}</div></span>
        </p>

        <i class="icard"></i>
        <i class="icard"></i>
        <i class="icard"></i>
        <i class="icard"></i>
        <i class="icard"></i>
        <i class="icard"></i>
        <i class="icard"></i>
      </div>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>
<script>
import fx from '../../util/fx'
export default {
  data () {
    return {
      showOptions: false,
      activeName: 'second',
      // date: '2019-12-24',
      plain: true,
      gate: '',
      err:'',
      leaveRule: {
        byName: '',
        byDate: new Date().Format('yyyy-MM-dd'),
        byTime: '',
        gate: ''
      },
      timeLimit: [{
        value: '11:45 - 12:25',
      },{
        value: '17:15 - 17:45'
      },{
        value: '21:20 - 21:50'
      },
      {
        value: '22:10 - 22:50'
      }],
      rule: {
        grade: '',
        classroom: '',
        date: '',
        pick: function () {
          let pickArr = []
          // this.date = new Date();
          // this.date = fx.getDate(this.date);
          // console.log(this.date)
          for (let i in this) {
            if (this[i] !== '' && this[i] !== null) {
              // if(i == 'date'){
              //   this[i] = fx.getDate(this[i]);
              //   }
              // console.log(i)
              pickArr.push(i)
            }
          }
          pickArr.pop()
          return pickArr
        }
      },
      studentData: [],
      studentBackup: [],
    }
  },
  computed: {
    // pick () {
    //   let rule = this.rule.pick();
    //   let rule_ = JSON.parse(JSON.stringify(this.rule));
    //   let data = this.students;
    //   if (rule_.date !== '' && rule_.date !== null) {
    //     rule_.date = fx.getDate(rule_.date)
    //   }
    //   rule.forEach(e => {
    //     data = data.filter(v => {
    //       return v[e].includes(rule_[e])
    //     })
    //   })
    //   // console.log(data);
    //   return data.sclie(0,200);
    // },
    getStatus (status) {
      return function (status) {
        var className = ''
        switch (status) {
          case '正常': className = 'blue'; break // attendance = '正常';
          case '迟到': className = 'black'; break // attendance = '迟到';
          case '早退': className = 'orange'; break // attendance = '早退';
          case '缺勤': className = 'f44'; break // attendance = '缺勤';
          case '迟到&早退': className = 'green'; break // attendance = '迟到&早退';
          case '请假': className = 'blue'; break // attendance = '请假';
        }
        className += ' spanleft'
        return className
      }
    },
    getBg (status) {
      return function (status) {
        var className = ''
        switch (status) {
          case '正常': className = 'bgBlue'; break // attendance = '正常';
          case '迟到': className = 'bgBlack'; break // attendance = '迟到';
          case '早退': className = 'bgYello'; break // attendance = '早退';
          case '缺勤': className = 'bgRed'; break // attendance = '缺勤';
          case '迟到&早退': className = 'bgGreen'; break // attendance = '迟到&早退';
          case '请假': className = 'bgBlue'; break // attendance = '请假';
        }
        className += ' spanright'
        return className
      }
    },
      getBgByTime(t) {
        return function(t){
          t = new Date(t).getHours();
          let className = '';
          if(t < 13) {
            className = 'bgBlue'
          }else if(t < 18){
            className = 'bgYello'
          }
          // else if(t<21){
          //   className = 'bgBlack'
          // }
          className += ' spanright'
          return className;
        }
     },
    getOptions() {
      return this.$store.getters.getOptions;
    },
    getClassList() {
      let gradeId = this.rule.grade;
      let data = this.$store.getters.getOptions;
      data = data.filter(v => {
        return v.value == gradeId;
      });
      data = data[0]
      return data;
    },
    get_leaveRecords() { //筛选条件
      let records = this.$store.getters.get_leaveRecords
      let rule = this.leaveRule;
      if(rule.byDate) {
        if(rule.byTime) {
          let start = rule.byDate + " " + rule.byTime.slice(0,5);
          let end = rule.byDate + " " + rule.byTime.slice(8);
          start = new Date(start).getTime();
          end = new Date(end).getTime();
          records = records.filter(v => {
            let timeNum = new Date(v.leaveTime).getTime();
            return timeNum >= start && timeNum <= end;
          })
        }else{
          records = records.filter(v => {
            return v.leaveTime.slice(0, 10) == rule.byDate;
          })
        }
      }
      if(rule.byName) {
        records = records.filter(v => {
          return v.studentName.includes(rule.byName);
        })
      }
      if(rule.gate) {
        records = records.filter(v => {
          return v.scenario.includes(rule.gate);
        })
      }
      // console.log(records)
      return records;
    }
  },
  mounted () {
    // console.log(fx.getDate(this.rule.date))
    console.log(this.$store.getters.getGrade)
    this.$store.dispatch('getStudentData')
    .then(res => {
      this.studentData = res.slice(0,500);
      // this.studentBackup = res;
    })
    this.$store.dispatch('getLeaveRecords');
    this.$store.dispatch('getClassSelect')
    .then(() => {
      this.showOptions = true;
    })
    // console.log(this.leaveRule.byDate)
    
  },
  methods: {
    handleClick (a) {
      console.log('1111')
      console.log(a);
    },
    clickbtn() {
      console.log('clickbtn');
      // this.$refs.btn.plain = false;
      this.plain = !this.plain;
      console.log(console.log(this.$refs.btn.plain))
    },
    resetLeaveRule() {
      this.leaveRule = {}
    },
    tabFocus_1(e) {
      console.log(e)
      if(e){
        this.$store.dispatch('getGradeStudent_', e)
        .then(res => {
          this.studentData = res;
        })
      }else{
        this.studentData = this.studentBackup;
      }
      console.log(this.studentData);
    },
    tabFocus_2(e) {
      console.log(e)
      this.$store.dispatch('getClassStudent_', e)
      .then(res => {
        this.studentData = res;
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  #PEAttendance{
    position:relative;
    border:solid 5px #fff;
    background:#fff;
    // background: rgba(240,240,240,0.9);
    overflow-y:auto;
    .grade{
      margin:10px;
    }
    .classroom{
      margin: 10px ;
    }
    .space{
      margin-left:18px;
      margin-top:10px;
    }
    .person{
      // border:solid 1px #f5f5f5;
      .flexCard{
        flex-wrap:wrap;display:flex;justify-content:space-around;
        .icard{
          width:160px;
          margin:12px 0 0 12px ;
        }
        .card{
          width:160px;
          height:80px;
          // float:left;
          margin:12px 0 0 12px ;
          .spanleft{
            box-sizing: border-box;
            color:#fff;
            float: left;
            padding: 8px;
            width:30px;
            height:80px;
            font-size:12px;
          }
          .line_h_30{
            line-height:30px;
          }
          .spanright{
            box-sizing: border-box;
            float:left;
            height:80px;
            width:130px;
            padding:16px;
            line-height: 24px;
            background: #f1f1f1;
            font-size:13px;
          }
          .bgRed{
            background: rgba($color: #f56c6c, $alpha: 0.2);
            color: #f44;
          }
          .bgBlue{
            background: rgba($color: #39f, $alpha: 0.2);
            color: #39f;
          }
          .bgYello{
            background: rgba($color: #f90, $alpha: 0.2);
            color: #f90;
          }
          .bgGreen{
            background: rgba($color: #67c23a, $alpha: 0.2);
            color: #67c23a;
          }
          .bgBlack{
            background: rgba($color: #464c5b, $alpha: 0.2);
            color: #464c5b;
          }
        }
      }
    }
    .resetButton{
      padding:8px 16px;border:none;
      margin-left:10px;
    }
    .tealButton{
      background:teal;color:#fff;
      &:hover{
        background:rgba($color: teal, $alpha: 0.7);
        color:#fff;
      }
    }
  }
</style>
