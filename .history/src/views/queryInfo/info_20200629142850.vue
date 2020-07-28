<template>
  <div
    id="info"
    class="wrapper"
  >
    <!-- {{classList}} -->
    <!-- {{courseData}} -->
    <div id="selectCase" v-show="selectVisible">
      <el-select size="small" clearable @change="gradeChange" v-model="gradeId" placeholder="请先选择年级">
        <el-option v-for="(v, i) in getGrade"
        :key="i" :value="v.id" :label="v.gradeName"></el-option>
      </el-select>
      <el-select size="small" no-data-text="请先选择年级"
      v-model="classId" @change="classChange" placeholder="请选择班级">
        <el-option v-for="(v, i) in classList"
        :key="i" :value="v.id" :label="v.className"></el-option>
      </el-select>
    </div>
    <div id="classroomBg" v-if="memberVisible"
     class=" groupWrapper animated fadeIn" :class="memberVisible? 'groupWrapper animated fadeIn' : 'groupWrapper animated fadeInDown'">
      <ul class="headerColor">
        <li style="background:#d4237a;"></li>
        <li style="background:#39f;"></li>
        <li style="background:#f24;"></li>
        <li style="background:#ff0;"></li>
        <li style="background:#42b9a0;"></li>
        <li style="background:#f60;"></li>
        <li style="background:#5D26C1;"></li>
        <li style="background:#38ef7d;"></li>
        <li style="background:#FFEFBA;"></li>
        <li style="background:#f08;"></li>
      </ul>
      <div class="wrapper_">
        <el-container style="">
          <el-aside width="50%" style="padding:10px;color:#fff;">
            <ul style="height:60px;">
              <li style="margin:10px 0;">
                <span style="margin-right:20px;">初三（2）班</span>
                <span style="margin-right:20px;">学生32人</span>
                <span style="margin-right:20px;">教师6人</span>
              </li>
              <li style="margin:10x;">班级口号：天行健，君子以自强不息</li>
            </ul>
            <div class="headMaster" style="">
              <ul style="letter-spacing:3px;text-align:center;background-image:linear-gradient(141deg, #007991 , #78ffd6);width:160px;">
                <li style="padding:6px;">班主任:李江~</li>
                <li style="padding:6px;"><img src="../../assets/img/bg2.jpg" style="border:solid 1px #fff;padding:10px;height:100px;width:100px;border-radius:50%;" alt="" srcset=""></li>
                <li style="padding:6px;">语文课</li>
              </ul>
              <ul class="studentShow">
                <li>1.班干部：
                  <!-- {{getClassLeader}} -->
                  <div style="padding:0 10px;font-size:14px;">
                    <span style="margin-right:10px;" v-for="(v, i) in getClassLeader" :key="i">{{v.job}}:{{v.stuName}}</span>
                  </div>
                </li>
                <li>2.值日生：张婉、钱雪雯、杜枫影、杨万里、徐志义</li>
                <li>3.请假人员：无</li>
              </ul>
            </div>
          </el-aside>
          <el-main style="background:transparent;">
            <ul style="height:60px;">
              <li style="margin:10px;color:#ff0;text-align:right;">
                <span style="margin-right:20px;">带班老师：</span>
                <span style="margin-right:20px;">王老师</span>
                <span style="margin-right:20px;">陈老师</span>
              </li>
              <li style="margin:10x;color:#fff;text-align:right;">
                <span style="margin-right:20px;">当前课程：英语课（李谏）</span>
                <span style="margin-right:20px;">剩余授课时间：10分钟</span>
              </li>
            </ul>
              <div class="headerColor">
                <ul class="rewards">
                  <li class="classModal">班级荣誉</li>
                  <li>
                    <img src="../../assets/img/icon/medal1.png" alt="">
                   <span class="rewardSpan">优秀班级奖</span>
                  </li>
                  <li>
                    <img src="../../assets/img/icon/medal2.png" alt="">
                    <span class="rewardSpan">学习先进般</span>
                  </li>
                  <li>
                    <img src="../../assets/img/icon/medal3.png" alt="">
                    <span class="rewardSpan">先进集体</span>
                  </li>
                </ul>
                <el-carousel height="220px" style="width:360px;">
                <span class="album">班级相册</span>
                  <el-carousel-item v-for="(item, i) in get_ClassPictures.slice(0,4)" :key="i">
                  <img style="height:220px;width:360px;" :src="item.picturePath"  :alt="i">
                  </el-carousel-item>
                  <el-carousel-item v-show="get_ClassPictures.slice(0,4)">
                  <img style="height:220px;width:360px;" src="../../assets/img/bg3.jpg"  :alt="i">
                  </el-carousel-item>
                </el-carousel>
              </div>
          </el-main>
        </el-container>
        <ul id="classArticle">
          <li class="Notice">
            <p class="underline">
              <span style="border-bottom:solid 2px #f40;padding:5px 0;color:#f40">通知公告</span>
            </p>
            <ul v-if="getNotice" class="NoticeIn">
              <!-- <li>1.预防新冠肺炎，你我一小步，人类一大步</li>
              <li>2.期末考试，近在眼前，你我携手，备战在即</li>
              <li>3.6月6号放假通知，请家长接走孩子</li>
              <li>4.今日值日班级初三二班</li> -->
              <li v-for="(v, i) in getNotice" :key="i">
                {{i+1}}.{{v.title}}
                111111111111sjkfdsjfksjfksjfdksjfksjfdkjsfkdqweqewqweqewqewqeqewqweqweqweewq
                <!-- {{getType(v.level)}} -->
                <el-tag :type="getType(v.level)">{{getLevel(v.level)}}</el-tag>
              </li>
            </ul>
          </li>
          <li class="Recommend">
            <ul class="todayCourse">
              <!-- {{getCourse(courseData)}} -->
                  <li class="classModal">今日课程</li>
                  <li v-if="courseData" v-for="(v, i) in getCourse(courseData)" :key="i">第{{i + 1}}节：{{v.courseName}}</li>
                  <!-- <li>第一节:语文</li>
                  <li>第二节:数学</li>
                  <li>第三节:英语</li>
                  <li>第四节:历史</li>
                  <li><span class="devide">第五节:政治</span></li>
                  <li>第六节:地理</li>
                  <li>第七节:生物</li>
                  <li>第八节:物理</li> -->
                </ul>
          </li>
          <li class="Extra">
            <ul class="todayWeather" style="font-family: Arial, Helvetica, sans-serif;">
                  <!-- <li>{{getday}}</li> -->
                  <li style="display:flex;">
                    <span style="padding:0 4px;">
                      <p style="font-size:30px;">{{getday.day > 9 ? getday.day:'0'+getday.day }} <span style="font-size:16px">{{getday.week}}</span></p>
                      <p style="font-size:30px;">{{getday.month}}&nbsp;<span style="font-size:20px;">{{getday.year}}</span></p>
                    </span>
                    <ul v-if="JSON.stringify(weather) !== '{}'" style="flex:1;text-align:center;font-size:26px;display:inline-block;float:right;">
                      
                      <li style="font-size:13px;"><i :class="getWeatherIcon" style="vertical-align:middle;font-size:42px;" /><span style="display:inline-block;">{{weather.daily_forecast[0].cond.txt_n}}{{weather.now.tmp}}°C</span></li>
                      <li style="position:relative;bottom:0px;font-size:15px;"><i class="el-icon-time"></i>{{gettime}}</li>
                    </ul>
                  </li>
                  <!-- <li class="oclock"><i class="el-icon-time"></i>{{gettime}}<span v-if="JSON.stringify(weather) !== '{}'" style="font-size:20px; margin-left:10px;">{{weather.now.tmp}}°C</span></li> -->
                  <li v-if="JSON.stringify(weather) !== '{}'" class="center" style="font-size:16px;padding:10% 0;">
                    <p>气温：{{weather.daily_forecast[0].tmp.min}}°C~{{weather.daily_forecast[0].tmp.max}}°C </p>
                    <p>空气质量：{{weather.aqi.city.aqi}}~{{weather.aqi.city.qlty}}</p>
                  </li>
                  <li>
                    <ul class="weather classModal" style="position:absolute;bottom:0;width:100%;">
                      <!-- <li>
                        <p class="temperature"><i :class="getWeatherIcon" style="vertical-align:middle;font-size:40px;" /><span style="font-size:16px;">{{weather.daily_forecast[0].cond.txt_n}}</span></p>
                      </li> -->
                      <li class="center" style="padding:16px 0;">
                        <!-- <p>空气质量：{{weather.aqi.city.aqi}}~{{weather.aqi.city.qlty}}</p>
                        <p>气温{{weather.daily_forecast[0].tmp.min}}°C~{{weather.daily_forecast[0].tmp.max}}°C </p> -->
                        <p>距离下次考试还剩</p>
                        <p>200天</p>
                      </li>
                    </ul>
                  </li>
                </ul>
            <ul class="todayWeather">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </li>
        </ul>
        <ul id="footer" class="refuseCopy">
          <li @click="turnToHome">首页</li>
          <li>任课老师</li>
          <li @click="memberVisible= false;tableShow = !tableShow;">学生列表</li>
          <li>班级相册</li>
          <li @click="tableVisible=true">课程表</li>
          <li @click="memberVisible= false">班级信息</li>
        </ul>
      </div>
      <el-dialog top="10vh" :modal="false" :visible.sync="tableVisible" center
        :close-on-click-modal="false" title="课程表" width="720px">
        <div v-if=" courseData[0]" id="tableWrapper" class="refuseCopy">
          <!-- {{courseData}} -->
          <ul class="center" style="flex:1;color:#000;background-color:rgba(255,255,255,0.6);">
            <li class="thead" style="padding:10px;">时间</li>
            <li style="padding:4px;border:solid 1px #aaa39f;border-top:none;font-size:14px;line-height:17px;" v-for="(t, ti) in courseData[0].dayCourseList" :key="ti">
              {{t.startTime.slice(0, t.startTime.length - 3)}}
            </li>
          </ul>
          <ul class="center" style="color:#000;flex:1;background-color:rgba(255,255,255,0.6);" v-for="(v, i) in courseData" :key="i">
            <li>
              <ul>
                <li class="thead" style="padding:10px;">{{v.weekday}}</li>
                <li style="padding:4px;border-bottom:solid 1px #aaa39f;border-right:solid 1px #aaa39f;" v-for="(vc, vi) in v.dayCourseList" :key="vi">
                  {{vc.courseName}}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </el-dialog>

      <!-- 
        分隔栏
       -->
        
    <!--  
      分隔栏
     -->
    </div> 

    <div v-else id="member" class="animated fadeInUp">
      <!-- <p class="underline">
        <span style="border-bottom:solid 2px #f90;padding:6px">学生信息</span>
        <i style="color:#39f;float:right;cursor:pointer;margin-right:20px;" @click="memberVisible=true">返回</i>
        <i v-if="!tableShow" style="color:#42b9a0;float:right;cursor:pointer;margin-right:20px;" @click="isOpacity = !isOpacity" v-text="isOpacity?'收起':'信息展示'">信息展示</i>
        <i style="color:#42b9a0;float:right;cursor:pointer;margin-right:20px;" @click="tableShow = !tableShow;" v-text="tableShow  ? '相册展示':'表格展示'"></i>
      </p> -->
      <!-- <el-page-header @back="memberVisible=true" content="详情页面">
        123s
      </el-page-header> -->
      <el-breadcrumb style=";padding:10px 0;" separator="/">
        <el-breadcrumb-item @click.native="memberVisible=true">
          <span style="color:teal;">
            <i class="el-icon-caret-left el" style="color:teal;"></i>返回
          </span>
        </el-breadcrumb-item>
        <!-- <el-breadcrumb-item><a href="/">表格展示</a></el-breadcrumb-item> -->
        <el-breadcrumb-item>
          <a @click="tableShow = !tableShow;" v-text="tableShow  ? '相册展示':'表格展示'"></a>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="!tableShow">
          <a @click="isOpacity = !isOpacity" v-text="isOpacity?'收起':'信息展示'"></a>
        </el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <el-button size="small" @click="memberVisible=true">返回</el-button> -->
      <ul v-if="!tableShow" class="classAlbum">
        <li v-for="v in 40" :key="v">
          <img :class="{opacity :isOpacity}" style="height:240px;width:190px;" src="../../assets/img/topic4.jpg" alt="" srcset="">
          <ul class="hideInfo">
            <li style="color:#fff;text-align:center;">姓名：张三</li>
            <li style="color:#fff;text-align:center;">家长：里斯</li>
            <li style="color:#fff;text-align:center;">联系方式：16603825454</li>
          </ul>
        </li>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </ul>
  <!-- table -->
  <!-- <el-button>111s</el-button> -->
      <el-table v-else header-row-class-name="tableHeader"
      style="padding:0 6px;width:90%;margin:20px auto 0;border:solid 1px #e0e0e0;"
            class="animated fadeIn"
            size="small"
             height="calc(100% - 80px)"
            row-class-name="table"
            :data="classStudent"
          > 
            <el-table-column align="center" type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column type="expand" width="30">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="姓名">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
        <el-table-column align="center" prop="studentCode" label="学号" ></el-table-column>
        <el-table-column align="center" prop="studentName" label="姓名" ></el-table-column>
        <el-table-column width="80px" align="center" label="性别" >
          <template slot-scope="scope">
            {{scope.row.gender=='1'?'男':'女'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="gradeName" label="年级" ></el-table-column>
        <el-table-column align="center" prop="className" label="班级" ></el-table-column>
        <!-- <el-table-column align="center" prop="internalClassId" label="班内id" ></el-table-column> -->
        <el-table-column align="center" prop="parentName" label="家长" ></el-table-column>
        <el-table-column align="center" prop="parentPhone" label="家长电话" ></el-table-column>
      </el-table>
    </div>
  </div>
  
</template>
<script>
import fx from '../../util/fx';
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      tableVisible: false,
      memberVisible: true,
      selectVisible: false,
      time: '',
      i: '',
      gradeId: '',
      classId: '',
      group: {
      },
      weather: {},
      classPhoto: [
        'bg2.jpg',
        'bg3.jpg',
        'bg4.jpg'
      ],
      isOpacity: false,
      tableShow: false,
      classVisible: false,
      classList: [],
      classStudent: [],
      courseData: []
    }
  },
  computed: {
    
    get_ClassPictures() {
      return this.$store.getters.get_ClassPictures;
    },
    getCourse (day) {
      return function (day) {
        console.log(day);
        let d = new Date().getDay();
        // console.log(day[d].dayCourseList)
        if(day[d]){
          return day[d].dayCourseList;
        }
        // return this.course.filter(v => {
        //   return v.day === day
        // })
      }
    },
    getClassLeader() {
      return this.$store.getters.get_classLeader;
    },
    getday() {
      let time = this.time;
      let months =  time.getMonth();
      let monthArr = ['January', 'February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let timeObj = {
        year: time.getFullYear(),
        month: monthArr[months],
        day: time.getDate(),
        week: '星期' + fx.number_Chinese(time.getDay())
      }
      // return time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + 
      // time.getDate() + '日 星期' + fx.number_Chinese(time.getDay());
      return timeObj;
    },
    gettime() {
      let time = this.time;
      if(time.getMinutes().toString().length === 1) {

        return time.getHours() + ':0' + time.getMinutes();
      }
      return time.getHours() + ':' + time.getMinutes();
    },
    getWeatherIcon () {
      const icon = [ //依次为雨、暴雨、雷阵雨、晴、阴、多云
        'el-icon-light-rain', 'el-icon-heavy-rain',
       'el-icon-lightning', 'el-icon-sunny', 
       'el-icon-cloudy', 'el-icon-cloudy-and-sunny'];
       var condation = this.weather.daily_forecast[0].cond.txt_n;
       switch(condation) {
         case '多云': return 'el-icon-cloudy';
         case '晴': return 'el-icon-sunny';
         case '阴': return 'el-icon-cloudy';
         case '暴雨': return 'el-icon-heavy-rain';
         case '雷阵雨': return 'el-icon-lightning';
         case '阵雨': return 'iconfont icon-zy';
         case '霾': return 'iconfont icon-mai';
         case '雾': return 'iconfont icon-wu';
         case '台风': return 'iconfont icon-shishitaifeng';
         case '冰雹': return 'iconfont icon-bingbaoditu';
         case '雪' : return 'iconfont icon-xue';
         case '沙尘暴': return 'iconfont icon-shachenbao';
        //  iconfont icon-icon-test font_
       }
       if(condation.includes('雨')){
         return 'el-icon-light-rain'
       }
       return '';
    },
    sdata() {
      return this.$store.getters.getStudents;// 获取该班级所有学生
    },
    getNotice() {
      return this.$store.getters.get_ClassNotice; //from classes.js(store) 获取班级公告
    },
    getLevel(level) {
      return function(level) {
        switch(level) {
          case '1': return '紧急';break;
          case '2': return '考试';break;
          case '3': return '倒计时';break;
          case '4': return '普通';break;
        }
      }
    },
    getType(level) {
      return function(level) {
        switch(level) {
          case '1': return 'danger';break;
          case '2': return 'warning';break;
          case '3': return 'primary';break;
          case '4': return 'success';break;
        }
      }
    },
    getGrade() {
      return this.$store.getters.getGrade;
    }
  },
  mounted() {
    console.log(this.$store.getters.getClassId);
    if(this.$store.getters.getClassId) {
      this.$store.dispatch('getClassStudent_')
      .then(res => {
        this.classStudent = res;
      })
    //   this.$store.dispatch('getClassNotice')
    // .then(res => {
    //   console.log('getNotice .....................')
    //   console.log(res)
    // })
    this.$store.dispatch('getClassLeader');
    this.$store.dispatch('getClassPictures');
    this.$store.dispatch('getClassTeachers');
    this.$store.dispatch('getClassHonors');
    }
    if(this.$store.getters.getRole == 'schoolManager') {
      this.selectVisible = true;
    }
    this.$store.dispatch('getCourseTableItem')
    .then(res => {
      console.log(res);
      this.courseData = res.perDayCourseList;
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    getWeek (day) {
      let chars = ['一', '二', '三', '四', '五', '六', '日']
      return chars[day]
    },
    turnToHome() {
      this.$router.push('/nav');
    },
    gradeChange(gradeId) {
      if(gradeId){
        this.classVisible = true;
        this.$store.dispatch('getClassListByGradeId', gradeId)
        .then(res => {
          console.log(res);
          this.classList = res;
        }).catch(err => console.log(err))
      }
      this.classId = '';
    },
    classroomChange(v) {
      console.log(v)
    },
    classChange(classId) {
      console.log(this.$store)
      if(classId) {
        console.log(classId);
        this.$store.dispatch('setClassId', classId);
        this.$store.dispatch('getClassNotice');
        this.$store.dispatch('getClassTeachers');
        this.$store.dispatch('getClassHonors');
        this.$store.dispatch('getClassPictures');
        this.$store.dispatch('getClassLeader');
        this.$store.dispatch('getClassStudent_')
        .then(res => {
          this.classStudent = res;
        })
        this.$store.dispatch('getCourseTableItem')
        .then(res => {
          console.log(res);
          this.courseData = res.perDayCourseList;
        }).catch(err => {
          this.courseData = '';
          console.log(err);
        })
      }
    }
  },
  beforeMount () {
    this.time = new Date();
    fx.getWeather(this);
    // this.time = date.getHours() + ':' + date.getMinutes();
    const timer = setInterval(() => {
      this.time = new Date();
      // this.time = date.getHours() + ':' + date.getMinutes();
    },30000);
  }
}
</script>
<style lang="scss" scoped>
@import url('../../assets/css/classroom.scss');
#info{
  background:rgba($color:#fff, $alpha: 0.6);
  position: relative;
  // padding:4px;
    // 小组活动详情卡片
    font-family: 'Courier New', Courier, monospace;
  .groupWrapper{
    height:100%;
    // padding:4px;
  }
  .NoticeIn{
    overflow-y:auto;
  }
  .left_Aside{
    height:100%;
    padding:6px;
    box-shadow:2px 2px 4px #aaa;
    background:#fff;
    #left_top{
      height:180px;
      box-shadow: -2px 2px 2px #aaa;
      margin-bottom:6px;
      overflow:hidden;
      background-image: url('../../assets/img/topic5.jpg');
      background-size:100% 100%;  
      background-repeat: no-repeat;
      
    }
    .modal{
      margin:6px;
      padding:8px 4px;
      height:100%;
      color:#333;
      font-weight: bold;
      font-size:18px;
      background:rgba(255,255,255,0.7);
      text-align:center;
      .oclock{
        font-size:36px;
      }
      li{
        padding:6px 0;
      }
      
      .weather{
        display:flex;
        justify-content: space-around;
        font-size:14px !important;
        .temperature{
          font-size:28px;
        }
        li{
          padding:6px 0;
        }
      }
    }
  }
  .literary{
    border-color:#f90 !important;
    // background:rgb(255,222,228) !important;
    .tBook{
      float:left;
      height:106px;
      width:114px;
      // border:solid 1px;
      margin:6px 0;
      li{
        height: 42px;
        width:42px;
        line-height:42px;
        margin:6px;
        color:#fff;
        font-size:20px;
        text-align:center;
        border-radius:50%;
        background:#f60 !important;
        float:left;
      }
    }
    .infoBook{
      float:left;
        background-image: url('https://bkimg.cdn.bcebos.com/pic/b58f8c5494eef01fb9de27b0e8fe9925bd317df8?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg');
        background-size:100%;
        height:120px;
        width:100px;
        margin:0px 6px 6px 7px;
    }
  }
  
  .infoBottom{
      height:calc(100% - 500px);margin-top:6px;border:dashed 2px #0c6;
      overflow-y:auto;
      background-image:linear-gradient(141deg,#C6FFDD 0%,#FBD786 51%,#f7797d 88%);
      padding:6px;
      .tMessage{
        li{
          font-size:18px;
          float:left;
          background:#39f;
          color:#fff;
          border-radius:50%;
          text-align:center;
          line-height:44px;
          margin:0 6px;
          height:42px;
          width:42px;
        }
      }
      .message{
        font-size:18px;
        margin:20px 20px 0 20px;
        
      }
    }
  #brandWrapper{
    padding: 8px;
    text-align: center;
    height:180px;
    color:#fff;
    font-size:16px;
    font-weight:bold;
    ul{
      li{
        padding:4px;
      }
    }
    .brand{
      font-size: 24px;
      height:80px;
      line-height:75px;
      text-align:center;
      width:100%;
      margin:0 auto;
      border-radius:10px;
      border:solid 1px;
      background:rgba($color: #000, $alpha: 0.4);
    }
  }
  #brandRight{
    color:#fff;
    font-size:16px;
    background: transparent;
    ul.peopleinfo{
      display: flex;
      li{
        margin-right:14px;
        padding:12px 0;
      }
    }
    #honor{
      height:90px;
      border-top:dotted 2px;
      border-bottom:dotted 2px;
      margin-top:10px;
      .honorLeft{
        position:relative;
        height:86px;
        display:inline-block;
        text-align: center;
        width:30px;
        box-sizing:border-box;
        padding:2px 0;
        color:#39f;
        font-weight:bold;
        background:#ff0;
        &::after{
          content:'';
          border:solid 4px #ff0;
          border-color:transparent transparent transparent #ff0 ;
          display:block;
          position:absolute;
          top:40px;
          right:-8px;
        }
      }
      .honorRight{
        ul{
          position:relative;
          li{
            width:60px;
            height:60px;
            margin:16px 10px;
            // border:solid 1px;
            float:left;
            text-align:center;
            padding-top:4px;
            img{
              height:50px;
              width:50px;
              
            }
            .honorName{
              position:absolute;
              top:2px;
              font-size:11px;
              text-align: center;
              width:60px;
            }
          }
        }
      }
    }
  }
  #tableWrapper{
    display: flex;
    background-image: url('../../assets/img/topic2.jpg');
    background-size:100% 100%;
    background-repeat: no-repeat;
    .thead{
        color:#fff;
        background:rgba($color: #39f, $alpha: 0.8);
    }
    table{
    height:308px;
      box-sizing:border-box;
      border:0;
      width:100%; table-layout: fixed;
      background-image: url('../../assets/img/topic2.jpg');
      background-repeat: no-repeat;
      background-size:100% 100%;
      // thead{
      //   color:#fff;
      //   background:rgba($color: #39f, $alpha: 0.8);
      //   th{
      //     padding:10px;
      //   }
      // }
    }
  }
}
#member{
  height:100%;
  width:100%;
  padding:10px;
  background:#fff;
  font-size:12px;
  font-family:Arial, Helvetica, sans-serif;
  .underline{
    color:#f60;
  }
  .classAlbum{
    font-family: 'Courier New', Courier, monospace;
    font-size:14px;
    width:100%;
    height:calc(100% - 36px);
    overflow-y: auto;
    // border:solid 1px;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .opacity{
      opacity:0.5;
    }
    &>li{
      position:relative;
      margin:4px 2px;
      height:240px;
      width:190px;
      &:hover img{
          transform: rotateY(90deg);
      }
      img{
        // opacity:0.5;
        position:absolute;
        transition: all 0.3s ease-in-out;
      }
      .hideInfo{
        margin-top:10px;
      }
      background: #444;
    }
    i{
      margin:4px 2px;
      width:190px;
    }
  }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-main{
    padding:6px;
  }
  .album{
        position:absolute;top:0;left:0;
        z-index:10;
        color:#fff;
        width:100%;
        padding:8px;
        background:rgba($color: #000000, $alpha: 0.6);
        // background:#f22;
      }
      // .table{
      //   border:solid 1px #ccc;
      // }
</style>
