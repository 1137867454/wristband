<template>
  <div
    id="notice"
    class="wrapper"
  >
    <div id="come" v-if="detailVisible" class="animated fadeIn">
        <p class="underline">
          <span class="openAclose">公告消息</span>
          <!-- 箭头盒子 -->
          <labelTop style="position:aboslute;top:-32px;z-index:2222;"
            :label-info="labelInfo"
            @sizeChange="sizeChange"
            @currentChange="currentChange"
          />
        </p>
        <article id="noticeWrapper">
          <!-- {{sdata}} -->
          <p class="everyOneNotice" v-for="(v, i) in sdata" :key="i">
          <span class="date">
            <p v-for="(d, idx) in getDate(v.createTime)" :key="idx">
            {{d}}
            </p>
          </span>
            <ul class="topic_wrapper">
              <li class="title" style="color:#333;padding:0 10px;">
                <span class="titleWidth">{{i + 1}}.{{v.title}}</span>
                <el-tag style="overflow:hidden;font-size:12px;" :type="getType(v.level)" round effect="dark">{{getLevel(v.level)}}</el-tag>
                <el-tag style="margin-left:20px;overflow:hidden;">{{v.startTime.slice(0, v.startTime.length - 3)}}-{{v.endTime.slice(0, v.endTime.length - 3)}}</el-tag>
                <!-- <el-button size="mini" round type="danger" style="">{{getLevel(v.level)}}</el-button> -->
              </li>
              <!-- <li class="type">{{getLevel(v.level)}}</li> -->
              <li class="content">{{v.content}}</li>
              <li class="operate">
                <el-button type="success" plain circle size="mini" 
                icon="el-icon-more" @click="more(v)"></el-button>
                <el-button plain type="danger" circle size="mini"
                 icon="el-icon-delete" @click="deletes(v.id)"></el-button>
              </li>
            </ul>
        </p>
      </article>
    </div>
    <div v-else style="height:100%;overflow-y:auto;">
      <el-button size="mini" @click="detailVisible=true">返回</el-button>
      
      <ul class="noticeUl">
        <li class="center"><h3>{{content.title}}</h3></li>
        <li class="center">
          <el-tag 
          style="overflow:hidden;font-size:12px;vertical-align:middle;margin-right:30px;"
          :type="getType(content.level)" round effect="dark">
          {{getLevel(content.level)}}通知</el-tag>
          <el-tag>有效期：{{content.startTime}}——{{content.endTime}}</el-tag>
        </li>
        <!-- <li>{{content.explains}}</li> -->
        <!-- <li></li>
        <li></li> -->
        <!-- <li>
          {{getGradeList}}
        </li> -->
        <!-- <li>{{getGrade(content.gradeId)}}</li> -->
        <li style="border:solid 1px #ccc;padding:20px;">
          <h3>致{{getGrade(content.gradeId)}}:</h3>
          <img width="200" v-for="(v, i) in content.pictureList" :src="v.picturePath" :key="i" alt="">
          <div class="indent">
            {{content.content}}
          </div>
          </li>
        <!-- <li></li> -->
      </ul>
      <!-- {{content}} -->
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
      detailVisible: true,
      content: {},
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
    getDate(date) {
      return function(date) {
        let d = new Date(date);
        let d_ = [d.Format('dd'), d.Format('yyyy MM-dd')]
        // console.log(d_)
        return d_;
      };
    },
    getGradeList() {
      return this.$store.getters.getGrade;
    }
  },
  mounted: function () {
    // axios({
    //   url: 'http://192.168.1.238:8777/brand/getNotificationList',
    //   method: 'get',
    // }).then(res =>{
    //   console.log(res);
    //   this.notice = res.data.data;
    // }).catch(err => {
    //   console.log(err);
    // })
    // this.$store.dispatch('getNotice')
    // .then(res => {
    //   this.notice = res.data.data;
    // }).catch(err => {

    // })

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
    getGrade(id){
      let gradeList = this.getGradeList;
      console.log(id);
      console.log(gradeList)
      let grade = gradeList.find(v => v.id == id)
      console.log(grade)
      if(grade) {
        return grade.gradeName;
      }
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
    deletes(id) {
      console.log(id);
      this.$confirm('此操作将删除该消息，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
          this.$store.dispatch('deleteNotice', id)
          .then(res => {
            console.log(res);
            this.notice = res.data.data;
          }).catch(err => {
            console.log(err);
          })
      }).catch(() =>{

      })
    },
    more(v) {
      this.detailVisible = false;
      this.content = v;
      console.log(v);
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
      height:calc(100% - 26px);
      overflow-y:auto;
      .everyOneNotice{
        padding:10px;
        border-bottom:solid 1px #ccc;
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
          .type{
            
          }
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
  .noticeUl{
    border:solid 1px;
    height:calc(100% - 30px);
    width:96%;margin:0 auto;
    li{
      padding:6px 0;
    }
    .indent{
      font-family: Arial, sans-serif;
      text-indent: 2em;
      min-height:400px;
      letter-spacing:1px;
      font-size:14px;
      // border:solid 1px #ccc;
      // text-decoration:underline #aaa;
      padding-bottom: 10px;
    }
  }
}
</style>
