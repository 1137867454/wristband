<template>
  <div
    id="notice"
    class="wrapper"
  >
  <!-- v-if="overview" -->
    <div id="come" class="animated fadeIn">
        <p class="underline">
          <span class="openAclose">考试信息</span>
          <!-- 箭头盒子 -->
          <labelTop style="position:aboslute;top:-32px;z-index:2222;"
            :label-info="labelInfo"
            @sizeChange="sizeChange"
            @currentChange="currentChange"
          />
        </p>
        <article id="noticeWrapper">
          <!-- {{sdata}} -->
          <p class="everyOneNotice"  v-for="(v, i) in sdata" :key="i">
            <!-- {{v}} -->
          <span class="date">
            <p v-for="(d, idx) in getDate(v.startTime)" :key="idx">
            {{d}}
            </p>
          </span>
            <ul class="topic_wrapper">
              <li class="title" style="color:#333;padding-left:0px;">
                <span class="subjects">{{i + 1}}.{{v.subjects}}</span>
                <span class="titleWidth">范围：{{v.scope}}&nbsp;</span>
                <span style="overflow:hidden;display:inline-block;">时间：</span><el-tag style="overflow:hidden;">{{v.startTime.slice(10, v.startTime.length - 3)}}-{{v.endTime.slice(10, v.endTime.length - 3)}}</el-tag>
                <!-- <span v-if="v.invigilator" style="margin-left:10px;overflow:hidden;display:inline-block;">监考人：</span>
                <el-tag v-if="v.invigilator" style="overflow:hidden;vertical-align:;font-size:12px;"  round effect="dark">{{v.invigilator}}</el-tag> -->
              </li>
              <li class="content">
                <label style="font-weight:bold;color:#333;">班级：</label>{{v.gradeName}}{{v.className}}
                <label style="font-weight:bold;color:#333;margin-left:10px;">监考员：</label><span style="color:#39f;">{{v.invigilator}}</span>
              </li>
              <li class="content">备注：{{v.remark}}</li>
              <!-- <li class="content"></li> -->
              <li class="operate">
                <!-- <el-button plain type="success" circle size="mini"
                 icon="el-icon-more" @click="moreDetails(v)" ></el-button> -->
                <el-button plain type="danger" circle size="mini"
                 icon="el-icon-delete" @click="deletes(v.id)"></el-button>
                <!-- <el-button plain circle size="mini" 
                icon="el-icon-more" @click="more(v.id)"></el-button> -->
              </li>
            </ul>
        </p>
      </article>
    </div>
    <!-- <div v-else>
      <el-button @click="overview=true" size="small">返回</el-button>
      {{tableData}} -->
      <!-- <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</div> -->
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
      tableData: [],
      overview: true,
      currentPage: 1,
      pageSize: 50,
    }
  },
  computed: {
    sdata() {
      let data = this.$store.getters.get_examination;
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
    moreDetails(v) {
      this.overview = false;
      this.tableData = v;
    },
    deletes(id) {
      console.log(id);
      this.$confirm('此操作将删除该通知，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
          this.$store.dispatch('delExamination', id)
          .then(res => {
            console.log(res);
            this.notice = res.data.data;
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
      height:calc(100% - 26px);
      overflow-y:auto;
      .everyOneNotice{
        padding:10px 0 10px 10px;
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
            .subjects{
              display:inline-block;
              width:100px;
              // border:solid 1px;
              margin-right:10px;
              overflow:hidden;
              // white-space:nowrap;
              // text-overflow:ellipsis;
            }
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
            right:0px;
            top:34px;
          }
        }
      }
    }
  }
}
</style>
