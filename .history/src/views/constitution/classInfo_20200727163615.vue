<template>
  <div
    id="info"
    class="wrapper"
  >
    <div class="height_100">
      <div class="cardHeader height_100">
        <div
          class="date"
          style="width:100%;"
        >
          <el-radio-group v-if="showOptions"
            v-model="rule.grade"
            class="grade"
            size="small" @change="gradeClick"
          >
            <el-radio-button v-for="(v,i) in getOptions" :key="i" :label="v.value">
            {{v.label}}
          </el-radio-button>
          </el-radio-group>
          <el-radio-group v-if="rule.grade"
            v-show="rule.grade !== ''"
            v-model="rule.classroom"
            @change="classClick"
            class="classroom"
            size="small"
          >
          <el-radio-button v-for="(v,i) in getClassList.children" :key="i" :label="v.value">
            {{v.label}}
          </el-radio-button>
          </el-radio-group>
          <div class="classroom">
          </div>
        </div>
        <!-- {{wsCondition[0]}} -->
        <div  class="flex"> <!-- getCondition -->
           <!-- @click="cardClick(v)" -->
          <div
          class="cardRelative" v-for="(v,i) in wsCondition"
          :key="i">
            <ul
          :class="['animated',(i + 1) % 2 ? 'fadeInDown' : 'fadeInUp']"
        >
          <li :class="['cardTop', {'dangerheartate':v.healthData.heartate > 180 || v.healthData.heartate < 50}]">
            <span class="spanleft">{{ v.userName }}{{v.healthData.heartate}}
              <!-- <i :class="v.sex === '男' ? 'el-icon-male blueMale ' : 'el-icon-female redFemale'" /> -->
            </span>
            <!-- <span class="spanright right ">{{ v.userId }}</span> -->
          </li>
          <li class="cardBottom">
            <!--  stroke-linecap="round/butt/square" -->
            <el-progress
              class="left progress"
              :width="70"
              type="dashboard"
              :percentage="v.healthData.electricity"
              :text-inside = "true"
            />
            <div style="position:absolute;left:32px;bottom:26px;">电量{{v.healthData.electricity}}</div>
            <ul class="info">
              <li>
                <i
                  class="fa fa-heartbeat fa-2x D1"
                  style="color:#f44"
                ></i>{{ v.healthData.heartate }}
              </li>
              <li>
                <i class="iconfont icon-paobu" style="font-size:23px;"/>
                {{ v.healthData.step }}
              </li>
            </ul>
          </li>
        </ul>
        </div>
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
        <!-- {{wsCondition}} -->
        
        <!-- <ul v-for="(v,i) in eg" :key="i" @click="cardClick(wsCondition)"
          :class="['cardRelative','animated',(1 + 1) % 2 ? 'fadeInDown' : 'fadeInUp']"
        >
          <li class="cardTop">
            <span class="spanleft">{{ wsCondition.devMac }}{{v.name}} <i :class="'v.gender' === '2' ? 'el-icon-male blueMale ' : 'el-icon-female redFemale'" /> </span><span class="spanright right " style=";overflow:hidden;">{{ wsCondition.timeStamp }}G1245666</span>
          </li>
          <li class="cardBottom">
            <el-progress
              class="left progress"
              :width="70"
              type="dashboard"
              :percentage="60"
            />
            <ul class="info">
              <li style="position:absolute;left:-58px;bottom:24px;background:#fff;font-size:15px;">{{v.temperature}}°c</li>
              <li>
                <i
                  class="fa fa-heartbeat fa-2x"
                  style="color:#f44"
                />
                {{v.heartate}}
              </li>
              <li>
                <i class="iconfont icon-paobu" style="font-size:23px;"/>{{v.step}}
              </li>
            </ul>
          </li>
        </ul>
        <i class="icard" />
        <i class="icard" />
        <i class="icard" />
        <i class="icard" />
        <i class="icard" />
        <i class="icard" /> -->
        </div>
          <ul style="height:200px;width:200px;border:solid 1px;position:relative;">
            <li class="heart_left" style="z-index:3;position:absolute;left:10px;height:100px;width:100px;border-radius:50%;background:linear-gradient(-90deg,#F50A45 0%,#d5093c 40%);">1</li>
            <li class="heart_center" style="z-index:2;position:absolute;left:100px;height:100px;width:100px;border-radius:50%;background:linear-gradient(-90deg,#F50A45 0%,#d5093c 40%)">2</li>
            <li class="heart_right" style="z-index:2;position:absolute;left:57px;top:46px;height:96px;width:96px;transform:rotate(45deg);background:linear-gradient(-45deg,#B80734 0%,#d5093c 40%);">3</li>
          </ul>
          <div class="chest">
            <div class="heart left sided top"></div>
            <div class="heart center"></div>
            <div class="heart right sided"></div>
          </div>
      </div>
      <el-dialog v-if="cardInfo.healthData" :visible.sync="cardVisible"
       title="详情" center width="480px"
       :modal-append-to-body='false' top="10vh">
        <div style="">
          <img src="../../assets/img/bg2.jpg" style="vertical-align:top;width:200px;" alt="" srcset="">
          <ul class="cardInfo">
            <li><label>学校：</label>{{cardInfo.schoolName}}</li>
            <li><label>姓名：</label>{{cardInfo.userName}}</li>
            <li><label>步数：</label>{{cardInfo.healthData.step}}</li>
            <li><label>心率：</label>{{cardInfo.healthData.heartate}}</li>
            <!-- <li><label>姓名：</label>{{cardInfo.name}}</li>
            <li><label>性别：</label>{{cardInfo.sex}}</li>
            <li><label>班级：</label>{{cardInfo.grade}}{{cardInfo.classroom}}</li>
            <li><label>班主任：</label>{{cardInfo.teacher}}-{{cardInfo.tel}}</li>
            <li><label>心率：</label>{{cardInfo.pulse}}</li> -->
            <!-- <li><label>时间：</label>{{cardInfo.date}}</li> -->
            <!-- <li><label>设备类型：</label>{{cardInfo.deviceType}}</li> -->
            <!-- <li><label>设备型号：</label>{{cardInfo.deviceModel}}</li>
            <li><label>设备地址：</label>{{cardInfo.devMac}}</li>
            <li><label>信号强度：</label>{{cardInfo.rssi}}</li>
            <li><label>心率：</label>{{cardInfo.heartate}}</li>
            <li><label>步数：</label>{{cardInfo.step}}</li>
            <li><label>运动模式：</label>{{cardInfo.movement=='0'?'开':'关'}}</li>
            <li><label>动静状态：</label>{{cardInfo.dynamic =='2'?'无效':cardInfo.dynamic =='1'?'安静':'活动'}}</li>
            <li><label>清醒状态：</label>{{cardInfo.sleep=='0'?'清醒':cardInfo.sleep=='1'?'浅度睡眠':'深度睡眠'}}</li>
            <li><label>舒张压：</label>{{cardInfo.diastolic}}</li>
            <li><label>收缩压</label>{{cardInfo.systolic}}</li>
            <li><label>血氧</label>{{cardInfo.oxygen}}</li>
            <li><label>HRV值</label>{{cardInfo.hrv}}</li>
            <li><label>软件版本</label>{{cardInfo.version}}</li>
            <li><label>时间：</label>{{cardInfo.timeStamp}}</li>
            <li><label>校验状态：</label>{{cardInfo.status}}</li>
            <li><label>电量百分比：</label>{{cardInfo.electricity}}</li>
            <li><label>静态心率值：</label>{{cardInfo.staticHeartate}}</li>
            <li><label>异或校验：</label>{{cardInfo.crc}}</li> -->
            {{cardInfo}}
          </ul>
        </div>
      </el-dialog>
    </div>
  </div>
  <!-- table -->
</template>
<script>
import fx from '../../util/fx'
import { getItem } from '../../util/localStorage'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
export default {
  data () {
    return {
      // date: '2019-12-24',
      showOptions: false,
      cardVisible: false,
      cardInfo: {},
      activeName: 'first',
      eg: [
        {name: '梁启', temperature: '36.4', gender: '1', step: '1299', heartate: '70'},
        {name: '张扬', temperature: '36.8', gender: '1', step: '2349', heartate: '78'},
        {name: '林秋雨', temperature: '36.5', gender: '1', step: '1279', heartate: '66'},
        {name: '赵一鸣', temperature: '36.9', gender: '2', step: '2569', heartate: '70'},
        {name: '武成远', temperature: '36.5', gender: '2', step: '2899', heartate: '80'},
        {name: '莫忆朗', temperature: '36.6', gender: '2', step: '4679', heartate: '89'},
        {name: '孟令泽', temperature: '36.5', gender: '1', step: '7779', heartate: '79'},
        {name: '江山', temperature: '36.5', gender: '1', step: '1897', heartate: '69'},
        {name: '樊雪云', temperature: '37.2', gender: '1', step: '10087', heartate: '74'},
      ],
      dangerStudents: [],
      wsCondition: [],
      all: false,
      rule: {
        name: '',
        // date: '',
        // date: new Date(),
        gradeId: '',
        classId: '',
        classroom: '',
        pick: function () {
          var pickArr = []
          for (var i in this) {
            if (this[i] !== '' && this[i] !== null) {
              pickArr.push(i)
            }
          }
          pickArr.pop()
          // console.log(pickArr)
          return pickArr
        }
      },
      // grade: '六年级',
      group: {
      }
    }
  },
  computed: {
    getClassStudent() {
      return this.$store.getters.get_class_student;
    },
    getGradeStudent() {
      return this.$store.getters.get_grade_student;
    },
    getGrade() {
      return this.$store.getters.getGrade;
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
    getCondition () {
      let rule = this.rule.pick()
      let rule_ = JSON.parse(JSON.stringify(this.rule))
      if (rule.indexOf('date') > -1) {
        rule_.date = fx.getDate(rule_.date)
      }
      let condition = this.$store.getters.getCondition
      rule.forEach(e => {
        condition = condition.filter(v => {
          return v[e].includes(rule_[e])
        })
      })
      return condition
    }
  },
  mounted: function () {
    this.$store.dispatch('GradeList');
    // this.$store.dispatch('getGradeStudent_');
    // this.$store.dispatch('getClassStudent_');
    this.$store.dispatch('getClassSelect')
    .then(() => {
      this.showOptions = true;
    })
    this.initWebSocket();
  },
  beforeDestroy: function () {
    // 页面离开时断开连接,清除定时器
    this.disconnect()
    clearInterval(this.timer)
  },
  methods: {
    handleClick () {
      console.log(2)
    },
    cardClick(v) {
      this.cardVisible=true;
      this.cardInfo = v;
      console.log(v);
      // this.disconnect();
    },
    gradeClick(v) {
      this.rule.gradeId = v;
      this.wsCondition = [];
      this.disconnect();
    },
    classClick(v) {
      this.rule.classId = v;
      this.wsCondition = [];
      this.disconnect();
      this.initWebSocket (v)
    },
    initWebSocket (classId) {
      this.connection(classId)
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
    removeTab (targetName) {
      console.log(targetName)
    },
    connection (classId) {
      // 建立连接对象
      var token = getItem('token')
      this.socket = new SockJS('http://120.24.253.177:8777/ws?token=' + token)// 连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(this.socket);
      // 定义客户端的认证信息,按需求配置
      var headers = {
        'token': token
      }
      // 向服务器发起websocket连接
      // let url = '/exchange/test-exchange/student-id';
      // let url = '/exchange/test-exchange/class-id'
      let url = '/exchange/test-exchange/testkey'
      
      if(classId) {
        // alert(classId)
        url = '/exchange/test-exchange/' + classId
      }
      this.stompClient.connect(headers, (frame) => {
        this.stompClient.subscribe(url, (msg) => { // 订阅服务端提供的某个topic
        console.log('服务传递数据');
        // console.log(msg)
        // console.log(JSON.parse(msg.body)) // msg.body存放的是服务端发送给我们的信息
        let wsdata = JSON.parse(msg.body);
        let idx = 0;
        let pulse = wsdata.healthData.heartate;
        console.log(pulse);
        let that = this;
        if(pulse < 50 || pulse >180) {
          if(!this.dangerStudents.length) {
            this.dangerStudents.push(wsdata.userName);
            this.$notify.error({
              title: '危险',
              duration: 0,
              message: `${wsdata.userName}心率偏低，数值为${pulse}`,
              onClose() {
                let needDelete = that.dangerStudents.indexOf(wsdata.userName);
                that.dangerStudents.splice(needDelete, 1);
              }
            });
          }else{
            let repeat = this.dangerStudents.find(v => {
              return v == wsdata.userName;
            })
            if(!repeat) {
              this.dangerStudents.push(wsdata.userName);
              this.$notify.error({
                title: '危险',
                duration: 0,
                message: `${wsdata.userName}心率偏低，数值为${pulse}`,
                onClose() {
                  let needDelete = that.dangerStudents.indexOf(wsdata.userName);
                  that.dangerStudents.splice(needDelete, 1);
                  // console.log(this.dangerStudents)
                }
              });
            }
          }
        //   this.$notify.error({
        //   title: '危险',
        //   message: `${wsdata.userName}心率偏低，数值为${pulse}`
        // });
        }
        let flag = this.wsCondition.find((v,i) => {
          if(v.userId == wsdata.userId){
            idx = i;
            return true;
          }
        })
        if(!flag) {
          if ( !this.rule.gradeId || wsdata.gradeId  == this.rule.gradeId){
            this.wsCondition.push(wsdata);
          }
        }else{
          console.log(idx + wsdata.userName+ ' 心率heartate: ' + wsdata.healthData.heartate + ' 步数step: ' + wsdata.healthData.step)
          // console.log(wsdata)
          this.wsCondition.splice(idx,1,wsdata);
          // this.wsCondition[idx] = wsdata;

        }
        // if(this.wsCondition.length<10){
        // }
        // console.log(this.wsCondition)
        if(this.cardVisible) {
          this.cardInfo = wsdata;
        }
        // wsCondition.deviceType //设备类型
        // wsCondition.deviceModel //设备型号
        // wsCondition.devMac //设备地址
        // wsCondition.rssi //信号强度
        // wsCondition.heartate //心率
        })
      }, (err) => {
        // 连接发生错误时的处理函数
        console.log(err)
      })
    },
    // 断开连接
    disconnect () {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        this.socket.close();
        console.log('Disconnected')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#info{
  background: #f0f0f0;
  padding:6px;
  .cardHeader{
    padding:4px;
    background-color: #fff;
    // position: relative;
    overflow-y:auto;
    }
  .grade{
      margin:6px 10px;
      display: block;
    }
  .classroom{
      margin: 6px 10px;
  }
  .el-tab-pane{
    padding:0 10px;
  }
  .flex{
    height:calc(100% - 80px);
    overflow-y:auto;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    font-size:12px;
    // 小组活动详情卡片
  .icard{
    width:160px;
    margin: 10px 10px 0 0;
  }
  #healthInfo{
    width:100%;
    height:200px !important;
    // padding:10px;
    margin:10px 10px 0;
    // border:solid 1px;
  }
  .cardRelative{
      // cursor:pointer;
      // border:solid 1px #e2e2e2;
      box-shadow: -2px 2px 4px #e2e2e2;
      transition: all 0.3s linear;
      &:hover{
      box-shadow: 3px 3px 8px #aaa;
      transform:translateY(-4px);
      }
      background: #fff;
      border-radius:4px;
      margin: 10px 5px 0;
      position: relative;
      width:160px;
      height:100px;
      .cardTop{
        border-top-left-radius:4px;
        border-top-right-radius:4px;
        padding:6px 10px;
        background: rgba($color: #ff0, $alpha: 0.5);
      }
      .dangerheartate{
          background:#ea1222;
          color:#fff;
          border-top-left-radius:4px;
        border-top-right-radius:4px;
        animation: danger 4s linear infinite;
        }
      .cardBottom{
        padding:6px;
        .progress{
          margin-left:12px;
          font-size:20px !important;
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
}
.cardInfo{
  display:inline-block;font-size:13px;
  text-align:left;
  li{
    padding:4px;
    label{
      width:80px;display:inline-block;
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
  font-size:30px !important;
}
.D1{    
        height:24px;
        width:24px;
        display:inline-block;
        vertical-align: middle;
        // border: 3px solid cadetblue;
        // z-index: 20000;
        text-align:center;
        font-size:16px;
        // border-radius: 50%;
    // margin: 100px auto;
        animation:mysirst 2s ease-in-out;	
        animation-iteration-count: infinite;
        animation-direction: alternate;
        }
        @keyframes mysirst{
                0%{
                  transform:scale(1);
                  
                }
                50%{
                  transform:scale(1.3);
                }
                100%{
                  transform:scale(1);
                }
                
        }
        @keyframes danger{
                0%{
                  // background: #ea1222;
                  box-shadow: 0 0 10px #f00;
                }
                50%{
                  box-shadow: 0 0 1px #f00;
                  // background:#39f;
                }
                100%{
                  box-shadow: 0 0 10px #f00;
                  // background:#ea1222;
                }
                
        }
.chest {
	width:220px;
	height:200px;
	margin:0 auto;
	position:relative;
  border:solid 1px;
}
.heart {
	position:absolute;
	z-index:2;
	background:linear-gradient(-90deg,#F50A45 0%,#d5093c 40%);
	animation:beat 2s ease 0s infinite normal;
}
.heart.center {
	background:linear-gradient(-45deg,#B80734 0%,#d5093c 40%);
}
.heart.top {
	z-index:3;
}
.sided {
	// top:100px;
	width:120px;
	height:120px;
	border-radius:110px;
}
.center {
	width:110px;
	height:110px;
	bottom:100px;
  top:56px;
	left:74px;
	transform:rotateZ(225deg);
}
.left {
	left:22px;
}
.right {
	right:62px;
}
@keyframes beat {
	0% {
	transform:scale(1) rotate(225deg);
	box-shadow:0 0 40px #d5093c;
}
50% {
	transform:scale(1.1) rotate(225deg);
	box-shadow:0 0 70px #d5093c;
}
100% {
	transform:scale(1) rotate(225deg);
	box-shadow:0 0 40px #d5093c;
}
} 
</style>
