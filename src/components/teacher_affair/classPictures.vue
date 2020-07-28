<template>
  <div
    id="notice"
    class="wrapper"
  >
    <div id="come" class="animated fadeIn">
        <p class="underline">
          <span class="openAclose">班级相册</span>
          <!-- 箭头盒子 -->
          <labelTop style="position:absolute;top:-10px;right:10px;z-index:2222;"
            :label-info="labelInfo"
            @sizeChange="sizeChange"
            @currentChange="currentChange"
          />
        </p>
        <div class="center" v-show="modelVisible" style="position:fixed;top:0;
        left:0;z-index:9999;height:100%;width:100%;
        background:rgba(60,60,60,.8);">
        <el-button style="position:absolute;top:0;" @click="modelVisible=false" icon="el-icon-close" circle></el-button>
        <el-button style="position:absolute;left:50px;top:45%;" @click="nextPhoto('left')" icon="el-icon-arrow-left" circle></el-button>
        <el-button style="position:absolute;right:50px;top:45%;" @click="nextPhoto('right')" icon="el-icon-arrow-right" circle></el-button>
        <img style="margin:10% auto;display:block;" height="60%" :src="showImg.picturePath" alt="" srcset="">
        </div>
        <article id="videoWrapper" class=" animated fadeIn">
          <!-- {{sdata[1]}} -->
          <p class="everyOneNotice" @click="modelClick(v, i)" @mousemove="deleteIcon(i)" v-for="(v, i) in sdata" :key="i">
            <i v-if="iconDelete == i" class="el-icon-error animated fadeInDown"
            @click.stop="deletes(v.id)"
            style="font-size:18px;color:#000;position:absolute;top:0;right:0;z-index:3333;"></i>
            <el-image lazy style="border-radius:8px;border:solid 1px #ccc;height:130px;width:234px;" :src="v.picturePath">
            </el-image>
            <!-- <ul class="topic">
              <li style="font-weight:bolder;">【{{v.name}}】</li>
              <li style="color:#909399;">——{{v.microDesc}}</li>
              <li>{{v.gradeId}}</li>
            </ul> -->
            <!-- 123 -->
        </p>
        <i style="width:237px;padding:6px;"></i>
        <i style="width:237px;padding:6px;"></i>
        <i style="width:237px;padding:6px;"></i>
        <i style="width:237px;padding:6px;"></i>
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
      showClose: false,
      iconDelete: '',
      labelInfo: {
        // avatar: 'el-icon-user',
        // level1: '用户管理',
        // level2: '学生管理',
        total: 0
      },
      modelVisible: false,
      showImg: '',
      index: 0,
      currentPage: 1,
      pageSize: 50,
    }
  },
  computed: {
    sdata() {
      let data = this.$store.getters.get_ClassPictures;
      this.setData(data.length);
      let prev = (this.currentPage - 1) * this.pageSize;
      // console.log(prev)
      data = data.slice(prev, prev + this.pageSize);
      // console.log(data);
      return data;
    },
    // getType(level) {
    //   return function(level) {
    //     switch(level) {
    //       case '1': return 'danger';break;
    //       case '2': return 'warning';break;
    //       case '3': return 'primary';break;
    //       case '4': return '全校';break;
    //     }
    //   }
    // },
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
    // console.log('全文宽' + document.body.scrollWidth);
    // console.log('全文高' + document.body.scrollHeight);
  },
  methods: {
    modelClick(v, i) {
      this.modelVisible = true;
      console.log(v)
      console.log(i)
      this.showImg = this.sdata[i];
      this.index = i;
    },
    nextPhoto(direction) {
      console.log(direction)
        let data = this.sdata;
      if(direction == 'left'){
        if(this.index == 0) {
          this.$message.success({
            message: '这是第一张照片'
          })
          return ;
        }
        this.index--;
      }else{
        if(this.index == data.length-1){
          this.$message.success({
            message: '这已是最后一张照片'
          })
          return ;
        }
        this.index++;
      }
        this.showImg = data[this.index];
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
    deleteIcon(index) {
      this.iconDelete = index;
    },
    deletes(id) {
      console.log(id);
      this.$confirm('此操作将删除该图片，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
          this.$store.dispatch('delClassPictureByIds', [id])
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
      height:calc(100% - 26px);
      width:100%;
      // border:solid 1px;
      overflow-y:auto;
      display:flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content:space-around;
        background:#f0f0f0;
      .everyOneNotice{
        cursor:pointer;
        position:relative;
        background:#fff;
        border-radius:8px;
        border:solid 1px #aaa;
        padding: 6px;
        border-bottom:solid 1px #ccc;
        // height:160px;width:242px;
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
