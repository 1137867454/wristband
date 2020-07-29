<template>
  <div
    id="notice"
    class="wrapper"
  >
    <div id="come" class="animated fadeIn">
        <p class="underline">
          <span class="openAclose">微课管理</span>
          <!-- 箭头盒子 -->
          <labelTop style="position:absolute;top:-10px;right:10px;z-index:2222;"
            :label-info="labelInfo"
            @sizeChange="sizeChange"
            @currentChange="currentChange"
          />
        </p>
        <el-radio-group size="mini" v-model="rule.gradeId" style="margin-bottom:10px;">
        <el-radio-button v-for="(v, i) in getGradeList" :key="i" :label="v.id">
          {{v.gradeName}}
        </el-radio-button>
      </el-radio-group>
        <article id="videoWrapper">
          <!-- {{sdata[1]}} -->
          <p class="everyOneNotice" @mousemove="index = i" @mouseleave="index = -1" v-for="(v, i) in sdata" :key="i">
            <i v-if="index == i" class="el-icon-error animated fadeInDown"
            @click="deletes(v.id)"
            style="font-size:18px;color:#f44;position:absolute;right:0;z-index:3333;"></i>
            <video style="border-radius:8px;border:solid 1px #ccc;" height="130" width="234" :src="'http://' + v.url" controls="controls"></video>
            <ul class="topic">
              <li style="font-weight:bolder;">【{{v.name}}】——{{v.microDesc}}</li>
              <li style="color:#909399;">——{{v.microDesc}}</li>
              <li>{{getGrade(v.gradeId)}}</li>
            </ul>
            
            <!-- 123 -->
        </p>
        <i style="width:242px;"></i>
        <i style="width:242px;"></i>
        <i style="width:242px;"></i>
        <!-- {{gradeList}} -->
        <!-- {{getGradeList}} -->
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
      gradeList: [],
      gradeId: '',
      index: -1,
      labelInfo: {
        // avatar: 'el-icon-user',
        // level1: '用户管理',
        // level2: '学生管理',
        total: 0
      },
      rule: {
        gradeId: ''
      },
      currentPage: 1,
      pageSize: 50,
    }
  },
  computed: {
    sdata() {
      let data = this.$store.getters.get_video;
      this.setData(data.length);
      if(this.rule.gradeId) {
        console.log(data)

      //   console.log(this.rule.gradeId)
        data = data.filter(v => v.gradeId == this.rule.gradeId)
      }
      let prev = (this.currentPage - 1) * this.pageSize;
      console.log(prev)
      data = data.slice(prev, prev + this.pageSize);
      console.log(data);
      return data;
    },
    getGradeList() {
      return this.$store.getters.getGrade;
    }
  },
  mounted() {
    
    // this.gradeList = this.$store.getters.getGrade;
  },
  methods: {
    getGrade(id) {
        let gradeList = this.$store.getters.getGrade;
        let data = gradeList.find(v => v.id == id);
        console.log(data);
        if(data) {
          return data.gradeName; 
        }
        return '无数据';
    },
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
    deletes(id) {
      console.log(id);
      this.$confirm('此操作将删除该视频，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
          this.$store.dispatch('deleteVideo', id)
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
      position: relative;
      border-bottom:solid 1px #ccc;padding-bottom:6px;
      margin-bottom:9px;
      .openAclose{
          background:#fff;
          padding:4px;
          border-bottom:solid 2px #39f;
          color:#39f;
      }
    }
    #videoWrapper{
      height:calc(100% - 60px);
      width:100%;
      // border:solid 1px;
      overflow-y:auto;
      display:flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content:space-around;
        background:#f0f0f0;
      .everyOneNotice{
        position:relative;
        background:#fff;
        border-radius:8px;
        border:solid 1px #ccc;
        padding: 2px;
        border-bottom:solid 1px #ccc;
        height:200px;width:242px;
        margin-top:10px;
        .topic{
          text-align:center;
          overflow:hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
