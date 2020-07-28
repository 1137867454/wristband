<template>
  <div
    id="admin"
    class="wrapper"
  >
    <div id="come" class="animated fadeIn">
      <el-container style="height:100%">
        <el-aside class="leftAside" :width="asideWidth==true?'100%':'50%'" >
          <p class="underline">
            <span style="border-bottom:solid 2px #f44;padding:5px 0;">已发公告</span>
            <span class="openAclose" @click="asideWidthChange"><span v-text="asideWidth?'收起':'展开'"></span><i :class="asideWidth?'el-icon-back':'el-icon-right'"></i></span>
            </p>
          <el-table
        size="mini"
        row-class-name="table"
        header-cell-class-name="tableHeader"
        :data="focusOne"
        height="90%"
        style="width:90%;margin:0px auto 0;"
        @select="select"
        @select-all="selectAll"
      >
        <el-table-column
          :resizable="true"
          align="center"
          type="selection"
        />
        <el-table-column prop="id" align="center"  width="50" label="序号"></el-table-column>
        <el-table-column prop="date" align="center" width="90" label="时间"></el-table-column>
        <el-table-column prop="title" align="center"  label="标题"></el-table-column>
        <el-table-column prop="content" align="center" :show-overflow-tooltip="true" label="内容"></el-table-column>
        </el-table>
        <!-- <el-table-column :resizable="true" v-for="(v,i) in form" align="center" :prop="v[0]" :label="v[1]" v-bind:key="i"></el-table-column> -->
        </el-aside>
        <el-main class="rightMain" v-if="!asideWidth">
          <p class="underline"><span style="border-bottom:solid 2px #0c6;padding:5px 0;">发布公告</span></p>
          <el-form :data = 'notice' label-width="80px">
            <el-form-item label="发布部门">
                <el-input style="width:60%;" size="mini" type="text" v-model="notice.title"></el-input>
            </el-form-item>
            <el-form-item label="标题">
                <el-input style="width:60%;" size="mini" type="text" v-model="notice.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input style="width:90%;resize:none !important;" rows="18" size="mini" type="textarea" v-model="notice.content"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center;margin-left:-80px;">
              <el-button type="primary" round >提交</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { getItem } from '../../util/localStorage'
export default {
  name: 'admin',
  data () {
    return {
      cronPopover:false,
      cron:'', // websocket 设置
      asideWidth: false,
      notice: {
        date: '2020-4-5',
        title: '4月7日开学通知',
        content:'123'
      },
      focusOne: [{
        id : 1,
        date: '2020-4-5',
        title: '4月7日开学通知',
        content: '1211111111111111111111111111111111111111'
      }]
    }
  },
  computed: {
    sdata() {
      return this.$store.getters.getStudents;
    }
  },
  mounted: function () {
    // this.initWebSocket();
    // console.log(Chart);
    // this.$store.dispatch('getStudentData')
  },
  beforeDestroy: function () {
    // 页面离开时断开连接,清除定时器
    // this.disconnect()
    // clearInterval(this.timer)
  },
  methods: {
    select() {
      console.log('select');
    },
    selectAll() {
      console.log('selectAll')
    },
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
    asideWidthChange() {
      this.asideWidth = !this.asideWidth;
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
  // padding:6px;
      box-sizing: border-box;
  #come{
    height:100%;
    box-shadow: -2px -2px 2px #aaa;
    background: rgba(235,242,253,0.8);
    padding:5px;
    .leftAside{
      background:#fff;padding:8px;
      transition: width 0.4s ease-in-out ;
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
      margin-bottom:10px;
      .openAclose{
        float:right;
        cursor:pointer;
          color:#19d;
        &:hover{
          color:#5cadff;
        }
      }
    }
    .rightMain{
      height:100%;
      padding:8px;
      margin-left:5px;
      #rightMainIn{
        // margin: 8px 0;
        display:flex;
        ul{
          // margin-left:40px;
          li{
            label{
              display:inline-block;
              width:60px;
              text-align: right;
              // margin-right:20px;
            }
          }
        }
      }
    }
    li{
      // padding:4px;
    }
  }
}
.value{
  display:block;
}
// .el-progress-circle__track {
// stroke: rgba(0, 122, 255, 0.4);
// }
// .el-progress__text{
//   font-size:40px !important;
// }
</style>
