<template>
  <div
    id="dailyInfo"
    class="wrapper animated fadeIn"
  >
    <div class="top" style="height:calc(100% - 320px);">
      <div class="cardHeader clearfix center font_666">
        <span class="left">快速暴走小组</span>
        <span>2020年1月7日</span>
        <span class="right font_909399">截至时间:2020年1月20日</span>
      </div>
      <div style="height:calc(100% - 30px); overflow:hidden;position:relative;">
        <el-table
          size="mini"
          :data="studentData"
          height="100%"
          style="margin:4px auto;width:94%; position:absolute; top:-20px;left:3%;"
        >
          <!-- <el-table-column :resizable="true" v-for="(v,i) in form" align="center" :prop="v[0]" :label="v[1]" v-bind:key="i"></el-table-column> -->
          <el-table-column
            type="index"
            width="50"
          />
          <el-table-column
            align="center"
            label=""
          >
            <template slot-scope="scope">
              <img
                class="avatar"
                :src="scope.row.avatar"
                alt=""
                srcset=""
              >
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="sid"
            label=""
          />
          <el-table-column
            align="center"
            prop="name"
            label=""
          >
            <template slot-scope="scope">
              {{ scope.row.name }}-<i :class="scope.row.sex === 'male' ? 'el-icon-male blueMale ' : 'el-icon-female redFemale'" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="sex"
            label=""
          />
          <el-table-column
            align="center"
            prop="target"
            label=""
          />
          <el-table-column
            align="center"
            label=""
            width="160"
          >
            <template slot-scope="scope">
              <span>完成度</span><span style="margin-left:4px;width:100px;display:inline-block;"><el-progress
                :color="getColor(scope.row.percentage)"
                :stroke-width="12"
                :text-inside="true"
                :percentage="scope.row.percentage"
              /></span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="classroom"
            label=""
          />
          <!-- <el-table-column align="center" prop="date" label=""></el-table-column> -->
          <el-table-column
            align="center"
            label=""
            width="200"
          >
            <el-button
              size="mini"
              type="primary"
            >
              编辑
            </el-button> <el-button size="mini">
              详情
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <div class="middle">
      <div class="cardHeader">
        异常提醒
      </div>
      <ul class="ulmiddle">
        <li>
          <ul class="inlineul clearfix">
            <li class="left label">
              未检测到数据
            </li>
            <li class="left">
              李沐雪
            </li>
            <li class="left">
              李沐雪
            </li>
            <li class="left">
              李沐雪
            </li>
            <li class="left">
              李沐雪
            </li>
          </ul>
        </li>
        <li>
          <ul class="inlineul clearfix">
            <li class="left label">
              完成率过低
            </li>
            <li class="left">
              李沐雪
            </li>
            <li class="left">
              李沐雪
            </li>
            <li class="left">
              李沐雪
            </li>
            <li class="left">
              李沐雪
            </li>
          </ul>
        </li>
      </ul>
    </div> -->
    <div class="bottoming groupWrapper">
      <div class="cardHeader ">
        小组人员数据
      </div>
      <el-row >
        <el-col :span="16">
          <ve-bar-chart
            :data="chartData"
            :series="{type: 'bar', barWidth: '40%'}"
            :height="280"
            :title="{subtext: '一天步数'}"
            style="width:90%;margin:0 auto;"
          />
        </el-col>
        <el-col :span="8">
          <div class="finish">
            <div style="margin-top:20px;">
              完成率
            </div>
            <ul class="groupInfo">
              <li>人均计步：2200</li>
              <li>小组人数：5</li>
              <li>达标人数：4</li>
              <li>男生完成：3</li>
              <li>女生完成：1</li>
            </ul>
          </div>
          <ve-liquidfill-chart
            :height="300"
            :data="groupProgress"
            style="margin:20px 0 0 30px;"
          />
        </el-col>
      </el-row>
      <!-- <ve-bar-chart :data="chartData" :title="{subtext:'一天步数'}" style="width:80%;margin:0 auto;" />
      <ve-liquidfill-chart style="flex:1"  :height="220" :width="200" :data="groupProgress"  /> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      students: {
        sid: '',
        name: '',
        sex: '男',
        age: '',
        grade: '',
        classroom: '',
        address: '',
        date: ''
      },
      student: { // 学生对象 >> 属性
        sid: '学号',
        name: '姓名',
        sex: '性别',
        grade: '年级',
        age: '班级',
        classroomroom: '入学时间',
        address: '位置',
        date: '入学日期'
      },
      studentData: [{
        sid: '1',
        name: 'liu',
        age: '24',
        sex: 'male',
        grade: '4',
        classroom: '21',
        date: '2019-8-19',
        percentage: 50,
        target: '12000步',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },
      {
        sid: '2',
        name: 'shen',
        age: '24',
        sex: 'female',
        grade: '4',
        classroom: '21',
        date: '2019-8-19',
        percentage: 90,
        target: '12000步',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },
      {
        sid: '3',
        name: 'liang',
        age: '24',
        grade: '4',
        sex: 'male',
        classroom: '21',
        date: '2019-8-19',
        percentage: 60,
        target: '12000步',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },
      {
        sid: '4',
        name: 'chen',
        age: '24',
        sex: 'male',
        grade: '4',
        classroom: '21',
        date: '2019-8-19',
        percentage: 70,
        target: '12000步',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }],
      date: '2019-12-24',
      chartData: {
        dimensions: {
          name: 'Week',
          data: ['李慕雪', '李沐雪', '李牧吷', '李木雪', '李目雪', '李暮雪', '李幕雪']
        },
        measures: [{
          name: '步数',
          data: [2560, 7670, 13560, 2087, 8030, 5820, 4320]
        }]
      },
      group: {
      },
      participate: [{
        name: '李沐雪',
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤'
      },
      {
        name: '李沐雪',
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤'
      }]
    }
  },
  computed: {
    // getColor (percentage) {
    //   console.log('...')
    //   console.log(percentage)
    //   return function(){
    //     if(percentage <= 25) {
    //       return 'warning'
    //     } else if (percentage <= 50) {
    //       return 'danger';
    //     } else if (percentage <=75) {
    //       return ;
    //     }
    //     return 'success';
    //   }
    // }
  },
  created () {
    this.groupProgress = {
      measures: [{
        name: 'Sam',
        value: 0.65
      }]
    }
    this.settings = {
      color: ['red', '#0f0', 'rgb(0, 0, 255)'],
      itemStyle: {
        opacity: 0.6
      },
      emphasis: {
        itemStyle: {
          opacity: 0.9
        }
      }
    }
  },
  methods: {
    getColor (percentage) {
      // console.log(percentage)
      if (percentage <= 25) {
        return '#222'
      } else if (percentage <= 50) {
        return '#f44'
      } else if (percentage <= 75) {
        return
      }
      return '#67c23a'
    }
  }
}
</script>
<style lang="scss" scoped>
.table{
      color:#ff0;
      background-color: #000 !important;
    }
  .tableHeader{
    background-color: #000 !important;
    color:#ff0;
  }
#dailyInfo{
  background: #f0f0f0;
  padding:2px;
  .top{
    background: #fff;
    position: relative;
    height:320px;
    border:solid 3px #f0f0f0;
    overflow:hidden;
    padding:0;
  }
  .middle{
    background: #fff;
    position: relative;
    height:110px;
    border:solid 3px #f0f0f0;
    .ulmiddle>li{
      .inlineul{
      padding:10px 0 0 10px;
        .label{
          width:100px;
          // border:solid 1px;
          // text-align:right;
        }
        li{
          margin-right:10px;
        }
      }
    }
  }
  .cardHeader{
      border-bottom:solid 2px #f0f0f0;
      padding:8px;
      font-size:13px;
    }
    // 小组活动详情卡片
  .groupWrapper{
    background:#fff;
    height:320px;
    overflow:hidden;
    width:100%;
    .finish{
      position:absolute;
      // top:20px;
      // border:solid 1px;
      width:33%;
      height:calc(100% - 40px);
      text-align: center;
      font-size:20px;
      color:#1296db;
      .groupInfo{
      color:#515a6e;
      position: absolute;
      top:50%;
      font-size:14px;
      text-align:left;
      transform: translateY(-50px);
      li{
        padding:6px 0;
      }
    }
    }
  }
*::-webkit-scrollbar-track {background-color:#fff;  } /*定义滚动条轨道 内阴影+圆角*/
  *::-webkit-scrollbar-thumb {background-color:#fff; border-radius:12px;} /*定义滑块 内阴影+圆角*/
  *::-webkit-scrollbar-thumb:hover{
      background-color: #73abb1;
  }
}
</style>
