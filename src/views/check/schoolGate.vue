<template>
  <div
    id="check"
    class="wrapper animated fadeIn"
  >
    <el-row :gutter="10">
      <el-col :span="test1">
        <div class="card cardTop">
          <div v-if="JSON.stringify(weather) !== '{}'">
            <ul id="time">
              <li>{{weather.daily_forecast[0].date}}</li>
              <li>星期{{new Date().getDay()}}</li>
              <li>{{time}}</li>
              <li>{{weather.basic.city}}</li>
            </ul>
            <div id="temperature">
              {{weather.now.tmp}}°C &nbsp;<i :class="getWeatherIcon" />
            </div>
            <ul id="weather">
              <!-- <li>气温21~26°C </li>
              <li>天气多云</li>
              <li>风向西南风</li>
              <li>紫外线较强</li>
              <li>穿衣指导推荐长袖</li>
              <li>其他提示天气较好，可以多多进行户外运动，尽情享受运动的乐趣</li> -->
              <li>天气：{{weather.daily_forecast[0].cond.txt_n}}</li>
              <!-- -{{weather.daily_forecast[0].wind.spd}} 等级 3-微风 -->
              <li>{{weather.daily_forecast[0].wind.dir}}</li>
              <li>气温{{weather.daily_forecast[0].tmp.min}}°C~{{weather.daily_forecast[0].tmp.max}}°C </li>
              <li>空气指数：{{weather.aqi.city.aqi}}~{{weather.aqi.city.qlty}}</li>
              <!-- <li>{{weather.status}}</li> -->
            </ul>
          </div>
        </div>
        <p style="height:10px;" />
        <div class="card cardBottom">
          <div>未到校人员</div>
          <div class="flex">
            <span
              v-for="(v,i) in 18"
              :key="i"
              class="absent"
            >
              <img
                class="cardImg"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                alt=""
              >
              <div class="center">李木雪</div>
            </span>
            <span class="empty" />
            <span class="empty" />
            <span class="empty" />
          </div>
        </div>
      </el-col>
      <el-col :span="test2">
        <div class="card height_100">
          <ul class="gateCard">
            <li
              v-for="(v,i) in 100"
              :key="i"
              class="paddingCard"
            >
              <p class="licard">
                <img
                  class="cardImg"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  alt=""
                >
                <ul class="center">
                  <li>李沐雪</li>
                  <li>7:20</li>
                  <li style="">
                    20157780127
                  </li>
                </ul>
              </p>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="test3">
        <div class="card height_100">
          <h4 style="height:20px;">
            到校排名
          </h4>
          <ul class="ranking">
            <li
              v-for="(v,i) in 10"
              :key="i"
            >
              <div class="rank_li_in">
                <label>
                  <img
                    v-if="i + 1 <= 3"
                    :src="require('../../assets/img/icon/' + img + (i + 1) + '.png')"
                    style="vertical-align:middle;margin-left:0px;"
                  >
                  <span v-else>{{ i + 1 }}</span>
                </label>
                <img
                  class="rankingImg"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  alt=""
                >
                <span class="space">李宇春</span>
                <span
                  class="right"
                  style="margin-top:12px;"
                >7:40</span>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import axios from 'axios'
import fx from '../../util/fx'
export default {
  name: 'SchoolGate',
  data () {
    return {
      test1: 6,
      test2: 13,
      test3: 5,
      img: 'medal',
      weather: {},
      time: '',
    }
  },
  methods: {
    // getWeather() {
    //   axios.get("https://free-api.heweather.com/v5/weather?key=5a08956dc52c43eca4ee75d77db964c8&city=湛江")
    // .then( res => {
    //   console.log(res);
    //   this.weather = res.data.HeWeather5[0];
    //   console.log(this.weather)
    // }).catch( err => {
    //   console.log(err);
    // })
    // }
  },
  computed: {
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
    }
  },
  beforeMount () {
    // this.getWeather();
    fx.getWeather(this);
    var date = new Date();
    this.time = date.getHours() + ':' + date.getMinutes();
    const timer = setInterval(() => {
      date = new Date();
      this.time = date.getHours() + ':' + date.getMinutes();
    },30000);
  },
  mounted () {
    window.onresize = () => {
      console.log(1)
      if (document.body.clientWidth < 1134) {
        this.test1 = 7
        this.test2 = 11
        this.test3 = 6
      } else {
        this.test1 = 6
        this.test2 = 13
        this.test3 = 5
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('../../assets/iconfont/iconfont.css');
#check{
    // background: #2db7f5;
    background-image: url('../../assets/img/school.jpg');
    background-size:100% 100%;
    background-repeat: no-repeat;
    padding:10px;
    .el-row{
      height:100%;
      .el-col{
        height:100%;
      }
    }
  .card{
    padding:8px;
    background: rgba(220,220,220,0.6);
    box-shadow: -2px 2px 4px #aaa;
    border-radius:4px;
    color:#fff;
    .gateCard{
      height:100%;
      overflow-y:scroll;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .paddingCard{
        // border:solid 1px;
        height:100px;
        width:160px;
        // min-width:150px;
        padding:4px;
        .licard{
          background:rgba($color:#666, $alpha: 0.6);
          border-radius:8px;
          height:100%;
          position:aboslute;
          .cardImg{
            float:left;

            margin:18px 4px 0 20px;
            // padding:2px;
          }
          li{
            font-size:12px;
            padding:8px 0;
            height:30px;
            // border-left:solid 1px;
            // border-bottom: solid 1px;
            &:nth-last-child(1){
              border-bottom: none;
            }
          }
        }
      }
    }
  }
  .cardTop{
    
    height:44%;
    position: relative;
    // min-height:200px;
    #time{
      font-family: 'Courier New', Courier, monospace;
    font-size:14px;
      display:flex;
      justify-content:space-around;
    }
    #temperature{
      text-align:center;
      font-size:36px;
      .iconfont {
        font-size:36px;
      }
      line-height:50px;
      margin-top:14%;
    }
    #weather{
      // position: absolute;
      font-size:14px;
      letter-spacing: 1px;
      text-align:center;
      margin-top:10%;
      // bottom:10px;
      li{
        padding:4px;
      }
    }
  }
  .cardBottom{
    height:calc(56% - 10px);
    overflow-y: scroll;
    .absent{
      padding:4px;
    }
    .empty{
      padding:6px;
      height:57px;
      width:57px;
    }
  }
  .cardImg{
    border-radius:50%;
    height:40px;
    width:40px;
    padding:4px;
    background:#42b9a0;
    border: solid 1px ;
    }
  .ranking{
    height:calc(100% - 20px);
    // border:solid 1px;
    li{
      height:10%;
      position: relative;
      border-bottom:solid 1px;
      .rank_li_in{
        // padding:0 5%;
        // border:solid 1px;
        width:100%;
        position:absolute;top:calc(50% - 20px);
        label{
          width:24px;
          text-align:center;
          display: inline-block;
        }
        .rankingImg{
          height:40px;
          width:40px;
          vertical-align:middle;
          border-radius:50%;
          // margin-right:40px;
          // position:absolute ;
          // top:16px;
        }
      }
      @media (max-width:1240px) {
      // background: #000;
      .rankingImg{
        margin:0;
      }
    }
      .space{
        margin-left:20%;
      }
    }
  }
}

*::-webkit-scrollbar-track {background-color:rgba(160,213,241,0.6);  }
.flex{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
