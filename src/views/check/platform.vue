<template>
  <div
    id="dailyInfo"
    class="wrapper"
  >
    <div class="bottoming groupWrapper">
      <div style="height:100%;background:#fff;">
        <div class="cardHeader">
          <el-form
            v-model="group"
            class="groupForm"
            :inline="true"
            label-width="40"
          >
            <el-form-item label="学号">
              <el-input
                v-model="group.name"
                size="mini"
                style="width:120px;"
              />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                v-model="group.people"
                size="mini"
                style="width:120px"
              />
            </el-form-item>
            <el-form-item label="班级">
              <el-input
                v-model="group.goal"
                size="mini"
                style="width:120px;"
              />
            </el-form-item>
            <el-form-item label="任课老师">
              <el-input
                v-model="group.goal"
                size="mini"
                style="width:120px;"
              />
            </el-form-item>
            <el-form-item label="上课地点">
              <el-input
                v-model="group.goal"
                size="mini"
                style="width:120px;"
              />
            </el-form-item>
            <el-form-item>
              <!-- <el-form-item label="考勤状态">
            <el-input size="mini" v-model="group.goal" style="width:120px;"></el-input>
          </el-form-item> -->
              <el-date-picker
                v-model="group.date"
                size="mini"
                style="width:200px;"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="mini"
              >
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <p style="padding:10px;">
          课程总数：72
        </p>
        <ul style="display:flex;justify-content:space-around;">
          <li class="solid">
            ve-charts
          </li>
          <li class="solid">
            ve-charts
          </li>
        </ul>
      </div>
    </div>
    <!-- table -->
    <div class="bottoming groupWrapper">
      <el-table
        :data="participate"
        height="100%"
      >
        <el-table-column
          align="center"
          prop="date"
          label="日期"
        />
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
        />
        <el-table-column
          align="center"
          prop="classroom"
          label="班级"
        />
        <el-table-column
          align="center"
          prop="teacher"
          label="任课老师"
        />
        <el-table-column
          align="center"
          prop="classroom"
          label="上课地点"
        />
        <el-table-column
          align="center"
          label="考勤状态"
        >
          <template slot-scope="scope">
            <span>
              <el-tag
                type="danger"
                size="medium "
                style="letter-spacing:1px;"
              >{{ scope.row.status }}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="percentage"
          label="详情"
        >
          <template slot-scope>
            <el-button size="mini">
              <i class="el-icon-more" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      date: '2019-12-24',
      group: {
      },
      participate: [{
        name: '李沐雪',
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲'
      },
      {
        name: '李沐雪',
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲'
      },
      {
        name: '李沐雪',
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲'
      },
      {
        name: '李沐雪',
        grade: '一年级',
        classroom: '一班',
        tel: '17803824890',
        date: '2019-12-24',
        status: '缺勤',
        teacher: '张玉玲'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
#dailyInfo{
  background: #f0f0f0;
  padding:4px;
  .top{
    background: #fff;
    position: relative;
    height:40%;
    border:solid 3px #f0f0f0;
    .groupForm{
      // position: absolute;
      // top:50%;
      // left:50%;
      // transform: translateX(-400px) translateY(-50px);
      // width:800px;margin:0 auto;text-align:center;padding-top:10px;
    }
  }
  .el-form-item{
    margin:0 20px 0px 0;
  }
  .cardHeader{
      border-bottom:solid 5px #f0f0f0;padding:4px 0 0 10px;
    }
    // 小组活动详情卡片
  .groupWrapper{
    background:#f0f0f0;height:50%;
  }
  #cardRelative{
      box-shadow: 0 0 10px #aaa;
      border-radius:4px;
      padding:8px;
      position: relative;
      width:390px;
      margin:10px;
      height:220px;
      .tag-el{
        position: absolute;
        color:#f44;
        top:10px;
        right:10px;
        font-size:30px;
      }
    #progress{
      margin-left:20px;
    }
    #meetingInfo{
      position:absolute;
      top:40px;
      margin-left:180px;
      color:#666;
      font-size:14px;
      li{
        padding:8px;
      }
    }
    .date{
      padding:4px;color:#909399;
      font-size:14px;
    }
    .details{
      color:#39f;margin:12px 28px 0 0;
    }
  }
}

</style>
