<template>
  <div
    id="dailyInfo"
    class="wrapper animated fadeIn"
  >
    <div class="top">
      <div class="cardHeader">
        创建小组
      </div>

      <el-form
        v-model="group"
        class="groupForm"
        :inline="true"
        label-width="80"
      >
        <el-form-item label="小组组名">
          <el-input
            v-model="group.name"
            size="mini"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item label="小组成员">
          <el-input
            v-model="group.people"
            size="mini"
            style="width:200px"
          />
        </el-form-item>
        <el-form-item label="小组目标">
          <el-input
            v-model="group.goal"
            size="mini"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item label="有效日期">
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
        <p style="margin-top:10px;">
          <el-button size="mini">
            取消
          </el-button>
          <el-button
            type="primary"
            size="mini"
          >
            确认
          </el-button>
        </p>
      </el-form>
    </div>
    <div class="bottoming groupWrapper">
      <div style="height:100%;background:#fff;">
        <div class="cardHeader">
          已建小组
        </div>
        <div id="groupCard">
          <div
            id="cardRelative"
            class="clearfix"
          >
            <i class="el-icon-s-flag tag-el" />
            <div style="padding:0 0 10px 30px;">
              快速暴走小组
            </div>
            <!-- circle进度条 -->
            <el-progress
              id="progress"
              type="circle"
              :width="100"
              :stroke-width="10"
              :percentage="60"
            />
            <ul id="meetingInfo">
              <li>人均计步: 12000步</li>
              <li>达标人数: 10人</li>
              <li>小组人数: 10人</li>
            </ul>
            <!-- 图片 + 按钮 -->
            <ul>
              <li class="clearfix">
                <span class="left date">2019-12-25 - 2019-1-17</span>
                <el-button
                  class="right"
                  type="danger"
                  size="mini"
                  round
                >
                  删除
                </el-button>
                <el-button
                  class="right"
                  style="margin-right:10px;"
                  size="mini"
                  type="primary"
                  round
                >
                  结束
                </el-button>
              </li>
              <li>
                <div>
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <router-link :to="{path: 'groupDetails'}">
                    <el-button
                      size="mini"
                      class="right details"
                      round
                    >
                      详情>
                    </el-button>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
          <div
            id="cardRelative"
            class="clearfix"
          >
            <i class="el-icon-s-flag tag-el" />
            <div style="padding:0 0 10px 40px;">
              快速暴走小组
            </div>
            <!-- circle进度条 -->
            <el-progress
              id="progress"
              type="circle"
              :width="100"
              :stroke-width="10"
              :percentage="60"
            />
            <ul id="meetingInfo">
              <li>人均计步: 12000步</li>
              <li>达标人数: 10人</li>
              <li>小组人数: 10人</li>
            </ul>
            <!-- 图片 + 按钮 -->
            <ul>
              <li class="clearfix">
                <span class="left date">2019-12-25 - 2019-1-17</span>
                <el-button
                  class="right"
                  type="danger"
                  size="mini"
                  round
                >
                  删除
                </el-button>
                <el-button
                  class="right"
                  style="margin-right:10px;"
                  size="mini"
                  type="primary"
                  round
                >
                  结束
                </el-button>
              </li>
              <li>
                <div>
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-button
                    size="mini"
                    class="right details"
                    round
                  >
                    详情>
                  </el-button>
                </div>
              </li>
            </ul>
          </div>
          <div
            id="cardRelative"
            class="clearfix"
          >
            <i class="el-icon-s-flag tag-el" />
            <div style="padding:0 0 10px 40px;">
              快速暴走小组
            </div>
            <!-- circle进度条 -->
            <el-progress
              id="progress"
              type="circle"
              :width="100"
              :stroke-width="10"
              :percentage="60"
            />
            <ul id="meetingInfo">
              <li>人均计步: 12000步</li>
              <li>达标人数: 10人</li>
              <li>小组人数: 10人</li>
            </ul>
            <!-- 图片 + 按钮 -->
            <ul>
              <li class="clearfix">
                <span class="left date">2019-12-25 - 2019-1-17</span>
                <el-button
                  class="right"
                  type="danger"
                  size="mini"
                  round
                >
                  删除
                </el-button>
                <el-button
                  class="right"
                  style="margin-right:10px;"
                  size="mini"
                  type="primary"
                  round
                >
                  结束
                </el-button>
              </li>
              <li>
                <div>
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-button
                    size="mini"
                    class="right details"
                    round
                  >
                    详情>
                  </el-button>
                </div>
              </li>
            </ul>
          </div>
          <div
            id="cardRelative"
            class="clearfix"
          >
            <i class="el-icon-s-flag tag-el" />
            <div style="padding:0 0 10px 40px;">
              快速暴走小组
            </div>
            <!-- circle进度条 -->
            <el-progress
              id="progress"
              type="circle"
              :width="100"
              :stroke-width="10"
              :percentage="60"
            />
            <ul id="meetingInfo">
              <li>人均计步: 12000步</li>
              <li>达标人数: 10人</li>
              <li>小组人数: 10人</li>
            </ul>
            <!-- 图片 + 按钮 -->
            <ul>
              <li class="clearfix">
                <span class="left date">2019-12-25 - 2019-1-17</span>
                <el-button
                  class="right"
                  type="danger"
                  size="mini"
                  round
                >
                  删除
                </el-button>
                <el-button
                  class="right"
                  style="margin-right:10px;"
                  size="mini"
                  type="primary"
                  round
                >
                  结束
                </el-button>
              </li>
              <li>
                <div>
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-button
                    size="mini"
                    class="right details"
                    round
                  >
                    详情>
                  </el-button>
                </div>
              </li>
            </ul>
          </div>
          <div
            id="cardRelative"
            class="clearfix"
          >
            <i class="el-icon-s-flag tag-el" />
            <div style="padding:0 0 10px 40px;">
              快速暴走小组
            </div>
            <!-- circle进度条 -->
            <el-progress
              id="progress"
              type="circle"
              :width="100"
              :stroke-width="10"
              :percentage="60"
            />
            <ul id="meetingInfo">
              <li>人均计步: 12000步</li>
              <li>达标人数: 10人</li>
              <li>小组人数: 10人</li>
            </ul>
            <!-- 图片 + 按钮 -->
            <ul>
              <li class="clearfix">
                <span class="left date">2019-12-25 - 2019-1-17</span>
                <el-button
                  class="right"
                  type="danger"
                  size="mini"
                  round
                >
                  删除
                </el-button>
                <el-button
                  class="right"
                  style="margin-right:10px;"
                  size="mini"
                  type="primary"
                  round
                >
                  结束
                </el-button>
              </li>
              <li>
                <div>
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-button
                    size="mini"
                    class="right details"
                    round
                  >
                    详情>
                  </el-button>
                </div>
              </li>
            </ul>
          </div>
          <div
            id="cardRelative"
            class="clearfix"
          >
            <i class="el-icon-s-flag tag-el" />
            <div style="padding:0 0 10px 40px;">
              快速暴走小组
            </div>
            <!-- circle进度条 -->
            <el-progress
              id="progress"
              type="circle"
              :width="100"
              :stroke-width="10"
              :percentage="60"
            />
            <ul id="meetingInfo">
              <li>人均计步: 12000步</li>
              <li>达标人数: 10人</li>
              <li>小组人数: 10人</li>
            </ul>
            <!-- 图片 + 按钮 -->
            <ul>
              <li class="clearfix">
                <span class="left date">2019-12-25 - 2019-1-17</span>
                <el-button
                  class="right"
                  type="danger"
                  size="mini"
                  round
                >
                  删除
                </el-button>
                <el-button
                  class="right"
                  style="margin-right:10px;"
                  size="mini"
                  type="primary"
                  round
                >
                  结束
                </el-button>
              </li>
              <li>
                <div>
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-avatar
                    :size="40"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                  <el-button
                    size="mini"
                    class="right details"
                    round
                  >
                    详情>
                  </el-button>
                </div>
              </li>
            </ul>
          </div>
          <div class="empty" />
          <div class="empty" />
        </div>
      </div>
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
  mounted() {
    // let ws = new WebSocket('ws://192.168.1.238:8777/socket/123')
    // ws.onopen = function () {
    //   ws.send(123);
    //   alert('数据发送中。。。')
    // }
    // ws.onmessage = function (evt) {
    //   let received_msg = evt.data;
    //   alert('数据已接收')
    // }
    // ws.onclose = function(){ 
    //   // 关闭 websocket
    //   alert("连接已关闭..."); 
    // };
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
    height:30%;
    border:solid 3px #f0f0f0;
    .groupForm{
      position: absolute;
      top:50%;
      left:50%;
      transform: translateX(-400px) translateY(-50px);
      width:800px;margin:0 auto;text-align:center;padding-top:10px;
      .el-form-item{
        margin:0 40px 0px 0;
      }
    }
  }
  .cardHeader{
      border-bottom:solid 2px #f0f0f0;padding:8px;
    }
    // 小组活动详情卡片
  .groupWrapper{
    background:#f0f0f0;height:70%;
    #groupCard{
      overflow-y: scroll;
      height:calc(100% - 38px);
      display: flex;
      flex-wrap: wrap;
      justify-content:space-around;
    }
  }
  .empty{
    // height:216px;
    width:340px;
    margin:6px;
  }
  #cardRelative{
      box-shadow: 0 0 10px #aaa;
      border-radius:4px;
      padding:8px;
      position: relative;
      width:340px;
      height:216px;
      margin:6px;
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
        padding:6px;
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
