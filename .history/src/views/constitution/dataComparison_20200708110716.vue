<template>
  <div
    id="dataComparison"
    class="wrapper"
  >
    <ul id="gradeChoose">
      <li class="block">
        <!-- <span class="demonstration">选择年级班级</span> -->
        <el-cascader v-if="showOptions"
          v-model="value"
          size="mini"
          :options="getOptions"
          placeholder="请选择班级"
          :props="{expandTrigger: 'hover'}"
          @change="handleChange"
        />
      </li>
    </ul>
    <el-tabs
      v-model="activeName"
      class="cardHeader refuseCopy"
      @tab-click="handleClick"
    >
      <!-- <el-tab-pane
        label="班级详情信息"
        name="first"
      >
        班级详情信息
      </el-tab-pane> -->
      <el-tab-pane
        label="班级整体信息"
        name="second"
        style=""
      >
            <labelTop
            :label-info="labelInfo"
            @sizeChange="sizeChange"
            @currentChange="currentChange"
          />
            <!-- @sizeChange="sizeChange"
            @currentChange="currentChange" -->
            <el-table style="background:rgba(243,249,248,0.8);"
            class="animated fadeInUp"
            size="mini" height="100%"
            row-class-name="table"
            header-cell-class-name="tableHeader"
            :data="sdata"
            :border="true"
          >
      <el-tab-pane
        label="班级课后报告"
        name="third"
      >
        <!-- 班级信息 -->
        <ul class="columns">
          <li class="colChild">
            班级课程信息
            <ul>
              <li>
                <el-row>
                  <el-col :span="12">
                    班级名称：三年级三班
                  </el-col>
                  <el-col :span="12">
                    课程名称：体育课
                  </el-col>
                </el-row>
              </li>
              <li>
                <el-row>
                  <el-col :span="12">
                    任课老师：江浪
                  </el-col>
                  <el-col :span="12">
                    课程类型：活动
                  </el-col>
                </el-row>
              </li>
              <li>
                <el-row>
                  <el-col :span="12">
                    上课时间：2019-1/2 11：04
                  </el-col>
                  <el-col :span="12">
                    实到/应到： 36/40
                  </el-col>
                </el-row>
              </li>
            </ul>
          </li>
          <li
            class="colChild"
            style="margin-left:4px;"
          >
            班级个人信息
            <ul>
              <li>
                <el-row>
                  <el-col :span="12">
                    最高心率：柳如是<i class="fa fa-heartbeat red" /> 142
                  </el-col>
                  <el-col :span="12">
                    平均心率最高：姜洋<i class="fa fa-heartbeat red" /> 99
                  </el-col>
                </el-row>
              </li>
              <li>
                <el-row>
                  <el-col :span="12">
                    计步最高：杨柳<i class="fa fa-flag red" />9999
                  </el-col>
                  <el-col :span="12">
                    计步最低：张凌<i class="fa fa-flag gray " />0
                  </el-col>
                </el-row>
              </li>
              <li>
                <el-row>
                  <el-col :span="12">
                    上课时间：<i class="el-icon-time " />2019-1/2 11:04
                  </el-col>
                  <el-col :span="12">
                    实到/应到：<i
                      class="fa fa-street-view fa-lg"
                      style="color:orange"
                    />36/40
                  </el-col>
                </el-row>
              </li>
            </ul>
          </li>
        </ul>
        <!-- 班级信息chart -->
        <ul
          class="columns"
          style="margin-top:4px;"
        >
          <li class="colChild2">
            <ve-line-chart
              :data="chartData"
              :height="300"
              :title="{text: '心率'}"
              :settings="chartSettings"
            />
          </li>
          <li
            class="colChild2"
            style="margin-left:4px;"
          >
            <ve-bar-chart
              :height="300"
              :data="infoData"
              :title="{text: '运动强度'}"
              :settings="infoSettings"
            />
          </li>
        </ul>
        <!-- 班级详细信息 -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import labelTop from '../../components/label'
export default {
  components: {
    labelTop
  },
  data () {
    return {
      date: '2019-12-24',
      activeName: 'third',
      value: [],
      labelInfo: {
        avatar: 'el-icon-user',
        level1: '用户管理',
        level2: '学生管理',
        total: 0
        // handleSizeChange:
      },
      chartData: {},
      infoData: {},
      infoSettings: {},
      currentPage: 1,
      pageSize: 10,
      options: [],
      showOptions: false,
      chartSettings: {
        label: {
          show: true,
          fontSize: '12',
          fontWeight: 'bold'
        },
        // smooth: true,
        xAxisName: '时间'
      },
    }
  },
  computed: {
    form () {
      return Object.entries(this.$data.student);
    },
    studentsData () {
      return this.$store.getters.getStudents;
    },
    sdata () {
      let data = this.$store.getters.getStudents
      var prev = (this.currentPage - 1) * this.pageSize
      data = data.slice(prev, this.pageSize + prev)
      return data;
    },
    getOptions () {
      return this.$store.getters.getOptions;
    }
  },
  mounted () {
    // this.$store.dispatch('getStudentData');
    this.$store.dispatch('getClassSelect')
    .then(res => {
      this.showOptions = true;
      // this.res = res
    })
    this.$store.dispatch('heartBeat')
    .then(res => {
      console.log(res)
    }).catch(err => {

    })
  },
  created () {
       
    this.chartData = {
      dimensions: {
        name: 'time',
        data: ['2:30', '2:40', '2:50', '3:00', '3:10', '3:15 ']
      },
      measures: [{
        name: '班级平均心率',
        data: [60, 65, 69, 61, 62, 61, 66, 66, 66, 64, 61]
      },
      {
        name: '班级最高心率',
        data: [82, 94, 64, 60, 88, 96, 98, 98, 95, 66, 62]
      }]
    }
    this.infoData = {
      dimensions: {
        name: 'Repo',
        data: [
          '9:00', '10:00', '11:00', '12:00', '14:00', '15:00',
          '16:00'
        ].reverse()
      },
      measures: [{
        name: 'Rising Star',
        data: [3000, 2780, 2250, 2200, 2190, 2200, 1770].reverse()
      }]
    }
    this.infoSettings = {
      direction: 'row'
    }
  },
  methods: {
    handleClick () {
      console.log(2)
    },
    select (selection, row) {
      console.log(selection)
      console.log(row)
    },
    selectAll (selection) {
      console.log(selection)
    },
    handleChange (v) {
      console.log(v)
    },
    sizeChange (val) {
      console.log('sizeChange ' + val)
      this.pageSize = val
    },
    currentChange (val) {
      console.log('currentChage ' + val)
      this.currentPage = val
    },
  }
}
</script>
<style lang="scss" scoped>
#dataComparison{
  background: #f0f0f0;
  overflow-y:scroll;
  position:relative;
    #gradeChoose{
      position:absolute;
      top:10px;
      right:200px;
      z-index: 9999999;
      li{
        float:left;
      }
    }
    .cardHeader{
    height:calc(100% - 10px);
    // border:solid 1px;
    position: relative;
    margin-top:4px;
    overflow-y:auto;
    }
  .el-tabs__content{

    height:calc(100% - 10px) !important;
  }
  .el-tab-pane{
    height:80%;
    padding:0 4px;
  }
  .columns{
    display:flex;justify-content:space-between;
    .colChild{
      padding:6px;height:120px;background:#fff;width:50%;
      ul{
        li{
          padding:6px;
        }
      }
    }
    .colChild2{
      padding:6px;height:300px;background:#fff;width:50%;
    }
  }
  .date{
    margin-right:10px;
    position: absolute;
    top:5px;
    right:20px;
    z-index: 9;
    }
  .pullUp{
    position:fixed;top:10px;z-index:99999;
    height:calc(100% - 30px);width:84%;
    background:#fff;margin-top:4px;
  }
}
.font{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
*::-webkit-scrollbar-track {background-color:#fff;  } /*定义滚动条轨道 内阴影+圆角*/
    *::-webkit-scrollbar-thumb {background-color:#fff; border-radius:6px;} /*定义滑块 内阴影+圆角*/
    *::-webkit-scrollbar-thumb:hover{
        background-color: #fff;
      }
</style>
