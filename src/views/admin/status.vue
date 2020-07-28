<template>
  <div
    id="admin"
    class="wrapper"
  >
    <div id="come" class="animated fadeIn">
    <p style="color:#39f;">出入管理</p>
      <el-container style="height:calc(100% - 250px);">
        <el-aside width="50%" class="leftAside">
          <p class="underline">出勤信息</p>
          <ul id="leftAsideIn">
            <li class="center">
              <span class="block"><el-progress type="circle" color="#8e71c7" :width="130" :stroke-width="12" :percentage="100" ></el-progress></span>
              <ul>
                <li class="inProgress">今日</li>
                <li>总人数：{{sdata.length}}</li>
                <li>已出勤：{{sdata.length}}</li>
              </ul>
            </li>
            <li class="center">
              <span class="block"><el-progress type="circle" :width="130" :stroke-width="12" :percentage="70" ></el-progress></span>
              <ul>
                <li class="inProgress">昨日</li>
                <li>总人数：{{sdata.length}}</li>
                <li>已出勤：{{Math.ceil(sdata.length * 0.7)}}</li>
              </ul>
            </li>
            <li class="center">
              <span class="block"><el-progress type="circle" :width="130" color="#f66" :stroke-width="12" :percentage="40" ></el-progress></span>
              <ul>
                <li class="inProgress">本月</li>
                <li>总人数：{{sdata.length}}</li>
                <li>已出勤：{{Math.ceil(sdata.length * 0.4)}}</li>
              </ul>
            </li>
          </ul>
        </el-aside>
        <el-main class="rightMain" style="">
          <p class="underline">人员缺勤原因</p>
          <div id="rightMainIn">
             <ve-pie-chart :data="chartData" :height="300" />
            <!-- <ve-pie-chart :data="chartData" /> -->
          <!-- <img src="../../assets/img/bg3.jpg" style="width:200px;height:200px;margin:30px 0;" alt="">
          <ul>
            <li><label>姓名：</label>{{focusOne.studentName}}</li>
            <li><label>性别：</label> {{focusOne.gender == 1?'男':'女'}}</li>
            <li><label>年龄：</label>{{focusOne.age}}12</li>
            <li><label>班级：</label>{{focusOne.className}}</li>
            <li><label>班主任：</label>张颖川</li>
            <li><label>学号：</label>{{focusOne.studentCode}}</li>
            <li><label>手环号：</label>{{focusOne.cardNo}}</li>
            <li><label>家长：</label>{{focusOne.parentName}}</li>
            <li><label>电话：</label>{{focusOne.parentPhone}}</li>
            <li><label>状态：</label>已离校</li>
            <li><label>时间：</label>2020-4-7</li>
          </ul> -->
          </div>
        </el-main>
      </el-container>
      <el-container style="height:240px;">
        <el-aside class="leftAside" width="30%" >
          <p class="underline">在校师生</p>
          <ul id="role">
            <li style="">
              <p>学生</p>
              <p class="circle f44 center"><img src="../../assets/img/icon/student.png" alt=""></p>
              <p>{{sdata.length}}人</p>
            </li>
            <li style="padding:6px 10px;">
              <p>教师</p>
              <p class="circle green center"><img style="margin-top:6px;" src="../../assets/img/icon/teacher.png" alt=""></p>
              <p>{{teachers.length}}人</p>
            </li>
            <li>
              <p>班级</p>
              <p class="circle blue center"><img src="../../assets/img/icon/classroom.png" alt=""></p>
              <p>{{classes.length}}个</p>
            </li>
          </ul>
        </el-aside>
        <el-main class="rightMain" style="height:calc(100% - 10px);">
          <p class="underline">出入信息</p>
          <template>
      <el-table style="background:rgba(243,249,248,0.8)"
        size="mini" height="calc(100% - 34px)"
        row-class-name="table"
        header-cell-class-name="tableHeader"
        :data="sdata"
        :border="true"
        @row-click="rowClick"
      >
        <!-- <el-table-column
          :resizable="true"
          align="center"
          type="selection"
        /> -->
        <!-- <el-table-column type="expand" width="24">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.name }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column> -->
        <el-table-column
          v-for="(v, k, i) in student"
          :key="i" height="20%"
          :resizable="true"
          align="center"
          :prop="k"
          :label="v"
        />
        <!-- <el-table-column align="center" prop="name" :label="Object.values(student)"></el-table-column>
            <el-table-column align="center" prop="sex" :label="Object.values(student)"></el-table-column>
            <el-table-column align="center" prop="class" :label="Object.values(student)"></el-table-column>
            <el-table-column align="center" prop="date" :label="Object.values(student)"></el-table-column>
            <el-table-column align="center" prop="address" :label="Object.values(student)"></el-table-column>
            <el-table-column align="center" prop="address" :label="Object.values(student)"></el-table-column> -->
      </el-table>
    </template>
        </el-main>
      </el-container>
      <!-- websocket 设置项 -->
      <!-- <div class="cron">
        <el-popover v-model="cronPopover">
          <el-input slot="reference" @click="cronPopover=true" v-model="cron" placeholder="请输入定时策略" size="mini" style="width: 200px;margin-left:200px;"></el-input>
          <cron @change="changeCron" @close="cronPopover=false" ></cron>

        </el-popover>
      </div> -->
    </div>
  </div>
</template>
<script>
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { getItem } from '../../util/localStorage'
import { cron } from 'vue-cron';
export default {
  name: 'admin',
  components: { cron },
  data () {
    return {
      cronPopover:false,
      cron:'', // websocket 设置
      student: { // 学生对象 >> 属性
        // sid: '学号',
        // name: '姓名',
        // sex: '性别',
        // grade: '年级',
        // classroom: '班级',
        // age: '年龄',
        // address: '位置',
        // date: '入学日期',
        // "faceFile": "人脸识别",
        "studentCode": "学号",
        // "cardNo": "卡号",
        "studentName": "姓名",
        // "gender": '性别',
        // "classId": "班级",
        "className": '班级',
        "parentName": "家长",
        "parentPhone": "联系方式",
      },
      focusOne: {

      },
      chartData:  {
        dimensions: {
          name: '渠道',
          data: ['迟到', '早退', '缺勤', '请假', '旷课']
        },
        measures: [{
          name: 'PV',
          data: [40, 27, 20, 22, 15, 13]
        }]
      }
    }
  },
  computed: {
    sdata() {
      return this.$store.getters.getStudents;
    },
    teachers() {
      return this.$store.getters.getTeachers;
    },
    classes(){
      return this.$store.getters.getClasses;
    }
  },
  methods: {
    
  },
  created() {
    // this.chartData = {
    //     dimensions: {
    //       name: '渠道',
    //       data: ['APP', 'PC', 'M端', '微信', '手Q', '小程序']
    //     },
    //     measures: [{
    //       name: 'PV',
    //       data: [40000, 27800, 22000, 20200, 15600, 13600]
    //     }]
    //   }
  },
  mounted: function () {
    // this.initWebSocket();
    // console.log(Chart);
    this.$store.dispatch('getStudentData');
    this.$store.dispatch('getTeachersInfo');
    this.$store.dispatch('getClassSelect');
  },
  beforeDestroy: function () {
    // 页面离开时断开连接,清除定时器
    this.disconnect()
    clearInterval(this.timer)
  },
  methods: {
    rowClick(row,s) {
      this.focusOne = row;
      console.log(row);
      console.log(s);
    },
    changeCron(val){
      this.cron=val
      console.log(this.cron)
      console.log(this.cronPopover)
    },
    removeTab (targetName) {
      console.log(targetName)
    },
  initWebSocket () {
    this.connection()
    // let self = this
    // 断开重连机制,尝试发送消息,捕获异常发生时重连
    // this.timer = setInterval(() => {
    //   try {
    //     self.stompClient.send("test");
    //   } catch (err) {
    //     console.log("断线了: " + err);
    //     self.connection();
    //   }
    // }, 5000);
    },
    connection () {
      // 建立连接对象
      var token = getItem('token')
      this.socket = new SockJS('http://120.24.253.177:8777/ws?token=' + token)// 连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(this.socket)
      // 定义客户端的认证信息,按需求配置
      var headers = {
        'token': token
        // login: 'mylogin',
        // passcode: 'mypasscode',
        // // additional header
        // 'client-id': 'my-client-id'
      }
      // 向服务器发起websocket连接
      this.stompClient.connect(headers, (frame) => {
        this.stompClient.subscribe('/topic/chat_msg', (msg) => { // 订阅服务端提供的某个topic
          console.log(msg.body) // msg.body存放的是服务端发送给我们的信息
        })
      }, (err) => {
        // 连接发生错误时的处理函数
        console.log(err)
      })
    },
    // 断开连接
    disconnect () {
      if (this.stompClient != null) {
        this.stompClient.disconnect()
        console.log('Disconnected')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#admin{
  overflow:hidden;
  // font-family: Hiragino Sans GB;
  font-family: "PingFang SC";
  // font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  background:rgba($color: #fff, $alpha: 0.6);
  padding:6px;
  #come{
    padding:8px;
    height:100%;
    box-shadow: -2px -2px 2px #aaa;
    background: rgba(235,242,253,0.8);
    .leftAside{
      background:#fff;margin:5px;padding:8px;
      #leftAsideIn{
        position:relative;
        margin: 40px 0;
        display:flex;
        justify-content:space-around;
        color: #777;
        font-size:13px;
        .inProgress{
          position:absolute;
          top:80px;
          margin-left:48px;
        }
      }
      #role{
        text-align:center;
        padding:20px 0;
        display:flex;
        justify-content:space-around;
        .circle{
          line-height:20px;
          width:60px;
          height:60px;
          border-radius:50%;
          margin:20px auto;
          // background:#42b9a0;
          // &:nth-child(1) {
          //   background:#f44;
          // }
          // &:nth-child(2) {
          //   background:#f94;
          // }
          // background-image: linear-gradient(#5583EE,#41D8DD);
          // background-image: linear-gradient(#F78FAD,#FDEB82);

          img{
            margin-top:10px;
          }
        }
      }
    }
    .underline{
      border-bottom:solid 1px #ccc;padding-bottom:6px;
    }
    .rightMain{
      margin: 5px ;
      padding:8px;
      #rightMainIn{
        margin: 8px 0;
        // display:flex;
        ul{
          margin-left:40px;
          li{
            label{
              display:inline-block;
              width:60px;
              text-align: right;
              margin-right:20px;
            }
          }
        }
      }
    }
    li{
      padding:4px;
    }
  }
}
.value{
  display:block;
}
.el-progress-circle__track {
stroke: rgba(0, 122, 255, 0.4);
}
.el-progress__text{
  font-size:40px !important;
}
</style>
