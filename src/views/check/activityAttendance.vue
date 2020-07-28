<template>
  <div
    id="attendance"
    class="wrapper animated fadeIn"
  >
    <div class="top bottoming">
      <span class="part">我创建的 </span>
      <span class="part">我参与的</span>
      <div style="display:inline-block;margin-left:40px;">
        <el-date-picker
          v-model="date"
          style="width:160px"
          type="date"
          size="mini"
          placeholder="选择日期"
        />
      </div>
    </div>
    <div
      class="bottoming"
      style="background:#f0f0f0;height:calc(100% - 48px);"
    >
      <el-row
        :gutter="6"
        class="height_100"
      >
        <el-col
          :span="8"
          class="height_100"
        >
          <el-card
            body-style="padding:0 ;"
            style="height:50%; border-bottom:6px solid #f0f0f0;"
          >
            <div class="cardHeader">
              家长会议出勤率
            </div>
            <div id="cardRelative">
              <el-progress
                id="progress"
                type="circle"
                :width="150"
                :stroke-width="12"
                :percentage="60"
              />
              <ul id="meetingInfo">
                <li>参会地点: 深圳市宝安区三位工业园</li>
                <li>参会时间：2019-12-8 9：30</li>
                <li>参会人数： 60人</li>
              </ul>
            </div>
          </el-card>
          <el-card
            body-style="padding:0;"
            style="height:50%"
          >
            <div class="cardHeader">
              缺席人员
            </div>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
            <el-tag
              class="tags"
              type="danger"
            >
              李沐雪
            </el-tag>
          </el-card>
        </el-col>
        <el-col
          :span="16"
          class="height_100"
        >
          <el-card
            body-style="padding:0;"
            class="height_100"
          >
            <div class="cardHeader">
              参与人员
            </div>
            <el-table
              :data="participate"
              style="width: 90%;margin:0 auto;"
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
                prop="percentage"
                label="参与度"
              />
              <el-table-column
                align="center"
                label="状态"
              >
                <template slot-scope="scope">
                  <span>
                    <el-tag
                      type="danger"
                      effect="dark"
                      size="medium "
                      style="letter-spacing:1px;"
                    >{{ scope.row.status }}</el-tag>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      date: '2019-12-24',
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
  }
}
</script>
<style lang="scss" scoped>
#attendance{
  font-size: 13px;
  .tags{
    margin:10px;
  }
  background: #f0f0f0;
  padding:2px;
  // border:solid 1px #aaa;
    .cardHeader{
      border-bottom:solid 2px #f0f0f0;padding:8px;
    }
  #cardRelative{
    position: relative;
      // border:solid 1px;
      width:90%;
      margin:8% auto;
    #progress{
      position: relative;
    }
    #meetingInfo{
      position:absolute;
      top:10%;
      // left:50%;
       margin-left:180px;
      li{
        padding:10px;
      }
    }
  }
  .absenceCard{
    height:40px;
    line-height:40px;
  }
}

</style>
