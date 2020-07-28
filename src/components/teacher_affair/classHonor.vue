<template>
  <div
    id="notice"
    class="wrapper"
  >
    <div id="come" class="animated fadeIn">
        <p class="underline">
          <span class="openAclose">班级荣誉</span>
          <!-- 箭头盒子 -->
          <!-- <labelTop style="position:aboslute;top:-32px;z-index:2222;"
            :label-info="labelInfo"
            @sizeChange="sizeChange"
            @currentChange="currentChange"
          /> -->
        </p>
        <article id="noticeWrapper">
          <!-- {{sdata}} -->
          
          <div class="everyOneNotice" v-for="(v, i) in get_ClassHonors" :key="i">
            <!-- console.log(this.$store.getters.get_ClassHonors) -->
            <header class="center header">
              {{i + 1}}-{{v.title}}
              <span style="float:right;" @mouseover="v.showClose = true" @mouseout="v.showClose = false">
              <!-- <i  class="el-icon-error el"></i> -->
              <!-- <i class="el-icon-circle-close el"></i> -->
              <i :class="v.showClose?'el-icon-error el':'el-icon-close el'"
              @click="deletes(v.id)"></i>
              </span>
            </header>
            <ul class="honorUl">
              <li style="text-indent:2em;line-height:20px;font-size:13px;">{{v.honourDesc}}
                <!-- <el-button type="danger" size="mini" plain round
                 icon="el-icon-delete" @click="deletes(v.id)"></el-button> -->
              </li>
              <li>
                <span v-for="(img, idx) in v.pictureList" :key="idx">
                  <img class="imageShow" :src="img.picturePath" alt="" srcset="">
                </span>
            </li>
            </ul>
           
          <!-- <span class="date">
            <p v-for="(d, idx) in getDate(v.createTime)" :key="idx">
            {{d}}
            </p>
          </span>
            <ul class="topic_wrapper">
              <li class="title" style="color:#333;padding:0 10px;">
                <span class="titleWidth">{{i + 1}}.{{v.title}}</span>
                <el-tag style="overflow:hidden;font-size:12px;" :type="getType(v.level)" round effect="dark">{{getLevel(v.level)}}</el-tag>
                <el-tag style="margin-left:20px;overflow:hidden;">{{v.startTime.slice(0, v.startTime.length - 3)}}-{{v.endTime.slice(0, v.endTime.length - 3)}}</el-tag>
              </li>
              <li class="content">{{v.content}}</li>
              <li class="operate">
                <el-button plain type="danger" circle size="mini"
                 icon="el-icon-delete" @click="deletes(v.id)"></el-button>
                <el-button plain circle size="mini" 
                icon="el-icon-more" @click="more(v.id)"></el-button>
              </li>
            </ul> -->
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import labelTop from '../../components/paging';
import { getItem } from '../../util/localStorage'
import axios from 'axios';
export default {
  name: 'notice',
  components: {
    labelTop
  },
  data () {
    return {
      notice: [],
      labelInfo: {
        // avatar: 'el-icon-user',
        // level1: '用户管理',
        // level2: '学生管理',
        total: 0
      },
      showClose: [],
      currentPage: 1,
      pageSize: 50,
    }
  },
  computed: {
    sdata() {
      let data = this.$store.getters.get_notice;
      this.setData(data.length);
      let prev = (this.currentPage - 1) * this.pageSize;
      console.log(prev)
      data = data.slice(prev, prev + this.pageSize);
      console.log(data);
      return data;
    },
    get_ClassHonors() {
      // console.log(this.$store.getters.get_ClassHonors)
      return this.$store.getters.get_ClassHonors;
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
          case '4': return '全校';break;
        }
      }
    },
    getDate(date) {
      return function(date) {
        let d = new Date(date);
        // let d_ = {
        //   year: d.getFullYear(),
        //   month: d.getMonth() + 1,
        //   day: d.getDate()
        // }
        let d_ = [d.Format('dd'), d.Format('yyyy MM-dd')]
        // console.log(d_)
        return d_;
      };
    }
  },
  mounted: function () {
    
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
    setData(len) {
      this.labelInfo.total = len;
    },
    sizeChange(page) {
      this.sizeChange = page;
      console.log(page)
    },
    currentChange(page) {
      this.currentPage = page;
    },
    closeClick(i) {
      console.log(i)
      this.$refs[i].className = 'el-icon-close el';
      console.log(this.$refs[i])
    },
    deletes(id) {
      console.log(id);
      this.$confirm('此操作将删除该荣誉，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
          this.$store.dispatch('delClassHonorByIds', id)
          .then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
      }).catch(() =>{

      })
    },
    more(id) {
      console.log('more: ' + id)
    }
  }
}
</script>
<style lang="scss" scoped>
#notice{
  font-family: "PingFang SC";
  // font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  background:rgba($color: #fff, $alpha: 0.6);
  padding:6px;
  box-sizing: border-box;
  #come{
    height:100%;
    // box-shadow: -2px -2px 2px #aaa;
    // background: rgba(235,242,253,0.8);
    padding:4px;
    .underline{
      border-bottom:solid 1px #ccc;padding-bottom:6px;
      margin-bottom:9px;
      .openAclose{
          background:#fff;
          padding:4px;
          border-bottom:solid 2px #39f;
          color:#39f;
      }
    }
    #noticeWrapper{
      // padding:10px;
      box-sizing: border-box;
      height:calc(100% - 26px);
      overflow-y:auto;
      margin:10px;
      .everyOneNotice{
        padding:8px;
        border:solid 1px #ccc;
        // margin:10px 0;
        margin-bottom:10px;

        .header{
          padding:10px;
          font-size:14px;
          color:#fff;
          background:rgba($color: #3091f2, $alpha: 1.0)
        }
        .honorUl{
          li{
            // box-shadow:2px 2px 10px #ccc;
            padding:4px;
            // border:solid 1px;

          }
        }
        .imageShow{
          width:22%;height:160px;
          border:solid 1px #ccc;

          padding:1%;
          // margin:10px 4px;
          margin-right:4px;
          border-radius:8px;
        }
        .date{
          text-align:center;
          font-size:24px;
          display:inline-block;
          height:60px;
          width:80px;
          color:#333;
          padding:10px 0;
          line-height:28px;
          vertical-align:top;
          border:solid 1px #aaa;
          margin-top:10px;
          border-radius:4px;
          &>p:last-child{
            font-size:13px;
            color:#909399;
          }
        }
        .topic_wrapper{
          overflow:hidden;
          position:relative;
          display: inline-block;
          margin-left:10px;
          // border-top:solid 1px #aaa;
          border-bottom:solid 1px transparent;
          height:100px;
          width: calc(100% - 100px);
          &>li{
            padding:0 10px;
            // border:solid 1px;
            height:30px;
            line-height:30px;
          }
          .title{
            color:#000;
            font-size:14px;
            font-weight: bolder;
            .titleWidth{
              display:inline-block;
              width:180px;
              overflow:hidden;
              white-space:nowrap;
              text-overflow:ellipsis;
            }
          }
          // .type{
            
          // }
          .content{
            height:auto;
            width:calc(100% - 80px);
            // border-right:solid 1px;
            display:-webkit-box; //将对象作为弹性伸缩盒子模型显示。
            -webkit-box-orient:vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
            -webkit-line-clamp:2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数
          }
          .operate{
            position:absolute;
            right:-10px;
            top:34px;
          }
        }
      }
    }
  }
}
</style>
