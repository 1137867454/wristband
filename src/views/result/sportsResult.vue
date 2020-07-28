<template>
  <div
    id="info"
    class="wrapper"
  >
    <div class="height_100">
      <div class="cardHeader">
        <div class="date">
          <el-date-picker
            v-model="date"
            size="mini"
            type="date"
            placeholder="选择日期"
          />
          <el-button
            style="margin-left:20px;"
            type="danger"
            size="mini"
            round
          >
            查询
          </el-button>
        </div>
        <el-tabs
          v-model="activeName"
          class="height_100 refuseCopy"
          style="background:#f0f0f0;padding-bottom:10px;"
          @tab-click="handleClick"
        >
          <el-tab-pane
            class="flex"
            label="班级整体信息"
            name="first"
          >
            <ul
              v-for="(v,i) in students"
              :key="i"
              class="cardRelative"
            >
              <li class="cardTop">
                <span class="spanleft">{{ v.name }} <i :class="v.sex === '男' ? 'el-icon-male blueMale ' : 'el-icon-female redFemale'" /> </span><span class="spanright right ">{{ v.sno }}</span>
              </li>
              <li class="cardBottom">
                <el-progress
                  class="left progress"
                  :width="60"
                  type="dashboard"
                  :percentage="30"
                />
                <ul class="info">
                  <li>
                    <i
                      class="fa fa-heartbeat fa-2x"
                      style="color:#f44"
                    />{{ v.pulse }}
                  </li>
                  <li><i class="fa fa-stethoscope fa-2x" />{{ v.capacity }}</li>
                </ul>
              </li>
            </ul>
            <i class="icard" />
            <i class="icard" />
            <i class="icard" />
            <i class="icard" />
            <i class="icard" />
            <i class="icard" />
            <i class="icard" />
            <i class="icard" />
            <i class="icard" />
            <i class="icard" />
            <i class="icard" />
          </el-tab-pane>
          <el-tab-pane
            label="班级详细信息"
            name="second"
          >
            班级详细信息
          </el-tab-pane>
          <el-tab-pane
            label="班级课后信息"
            name="third"
          >
            班级课后信息
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  <!-- table -->
</template>
<script>
export default {
  data () {
    return {
      date: '2019-12-24',
      activeName: 'first',
      group: {
      },
      students: [{
        name: '李沐雪',
        sex: '男',
        sno: 20157780127,
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲',
        pulse: 88,
        capacity: 2400
      },
      {
        name: '李沐雪',
        sex: '女',
        sno: 20157780127,
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲',
        pulse: 88,
        capacity: 2400
      },
      {
        name: '李沐雪',
        sex: '女',
        sno: 20157780127,
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲',
        pulse: 88,
        capacity: 2400
      },
      {
        name: '李沐雪',
        sex: '女',
        sno: 20157780127,
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲',
        pulse: 88,
        capacity: 2400
      },
      {
        name: '李沐雪',
        sex: '女',
        sno: 20157780127,
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲',
        pulse: 88,
        capacity: 2400
      },
      {
        name: '李沐雪',
        sex: '女',
        sno: 20157780127,
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲',
        pulse: 88,
        capacity: 2400
      },
      {
        name: '李沐雪',
        sex: '女',
        sno: 20157780127,
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲',
        pulse: 88,
        capacity: 2400
      },
      {
        name: '李沐雪',
        sex: '女',
        sno: 20157780127,
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲',
        pulse: 88,
        capacity: 2400
      },
      {
        name: '李沐雪',
        sex: '女',
        sno: 20157780127,
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲',
        pulse: 88,
        capacity: 2400
      }]
    }
  },
  mounted () {
  },
  methods: {
    handleClick () {
      console.log(2)
    }
  }
}
</script>
<style lang="scss" scoped>
#info{
  background: #f0f0f0;
  padding:4px 0;
  .cardHeader{
    position: relative;
    }
  .el-tab-pane{
    padding:0 10px;
  }
  .flex{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    font-size:12px;
    // &::after{
    // content: '';
    // flex: auto;    /* 或者flex: 1 */
    // }
    // 小组活动详情卡片
  .icard{
    width:160px;
    height:100px;
    margin: 10px 10px 0 0;
  }
  .cardRelative{
      box-shadow: 3px 3px 4px #aaa;
      background: #fff;
      border-radius:4px;
      margin: 10px 10px 0 0;
      position: relative;
      width:160px;
      height:100px;
      .cardTop{
        border-top-left-radius:4px;
        border-top-right-radius:4px;
        padding:6px 10px;
        background: rgba($color: #ff0, $alpha: 0.5);
      }
      .cardBottom{
        padding:6px;
        .progress{
          margin-left:12px;
        }
        .info{
          text-align:left;
          li{
            margin-left:90px;
            padding-top:6px;
          }
        }
      }
  }
  }
  .date{
    margin-right:10px;
    position: absolute;
    top:5px;
    right:20px;
    z-index: 9;
    }
}

</style>
