<template>
  <div
    id="home"
    class="wrapper"
  >
    <!-- header 头部 -->
    <header class="refuseCopy">
      <router-link
        id="logo"
        to="/"
      >
        廉江中学
      </router-link>
      <el-menu
        style="padding-left: 16%; height:50px;font-size:12px !important;"
        :default-active="activeIndex"
        background-color="#464c5b"
        text-color="#eee" :router="true"
        active-text-color="#ff0"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          style="height:48px;"
          index="/nav"
        >
          首页
        </el-menu-item>
        <el-menu-item
          style="height:48px;"
          index="/device/wristband"
        >
          设备管理
        </el-menu-item>
        <el-menu-item
          style="height:48px;"
          index="/classManager/class_"
        >
          班级管理
        </el-menu-item>
        <el-menu-item
          style="height:48px;"
          index="/workAndRest"
        >
          作息列表
        </el-menu-item>
      </el-menu>
      
      <div style="position:absolute;right:20px;top:6px;color:#fff;">
        <el-dropdown>
          <span class="el-dropdown-link">
          <img
            class="headPhoto"
            src="../../assets/img/cat.png"
            alt=""
          >
          </span>
          <!-- <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><div @click="infoVisible = true"><i class="el-icon-setting"></i> 修改资料</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <!-- <router-link :to="selfPage">
          <img
            class="headPhoto"
            src="../../assets/img/cat.png"
            alt=""
          >
        </router-link> -->
        <router-link
          :to="removePage"
          style="color:#eee"
          @click.native="removeLogin"
        >
          <img
            src="../../assets/img/icon/remove.png"
            style="vertical-align:middle;"
          >退出
        </router-link>
      </div>
    </header>
    <!-- 信息修改栏 -->
    <el-dialog
        :modal="false"
        :modal-append-to-body="false"
        title="信息修改"
        :visible.sync="infoVisible"
        width="500px"
        center
      >
        <el-form ref="info"
          class="form refuseCopy"
          size="small" :rules="rules"
          :model="self"
          label-width="100px"
        >
          <!-- <el-form-item label="学校">
            <el-input
              v-model="self.school"
              style="width:240px"
              autocomplete="off"
            />
          </el-form-item> -->
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="self.name"
              style="width:280px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio
              v-model="self.sex"
              label="男"
            >
              男
            </el-radio>
            <el-radio
              v-model="self.sex"
              label="女"
            >
              女
            </el-radio>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input
              v-model="self.age"
              style="width:280px;"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input maxlength="11"
              v-model="self.phone" clearable
              style="width:280px;"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
              v-model="self.password"
              style="width:280px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="密码确认" prop="confirmPassword">
            <el-input type="password"
              v-model="self.confirmPassword"
              style="width:280px"
              autocomplete="off"
            />
          </el-form-item>
          <!-- <el-form-item label="年级">
            <el-input
              v-model="self.grade"
              style="width:120px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="班级">
            <el-input
              v-model="self.classroom"
              style="width:120px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="入学日期">
            <el-date-picker
              v-model="self.date"
              align="right"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item> -->
          <el-form-item>
            <el-button @click="infoVisible = false">
              取 消
            </el-button>
            <el-button
              type="primary"
              @click="submit('info', self)"
            >
              确 定
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    <el-container class="container animated fadeIn slideInUp">
    <el-container class="container_">
      <!-- aside 侧边导航栏 -->
      <el-menu style="height:100%; overflow-y:auto; height:93%;"
        class="aside aside-menu refuseCopy"
        text-color="#909399"
        active-text-color="#39f"
        unique-opened
        :collapse="unfold"
        :router="true"
        :default-active="activeIndex2"
      >
          <el-submenu
          v-for="(v,i) in getRouter"
          :key="i"
          :index="i + ''"
        >
          <template slot="title">
            <i :class="v.meta.icon" />
            <span slot="title" style="font-size:12px;">{{ v.meta.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(child,id) in v.children"
              :key="id"
              :index="v.path + '/' + child.path" @click.native="isActive"
            >
              <i :class="child.meta.icon" />{{ child.meta.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <i
          id="showHidden"
          :class="unfold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
          @click="showHidden"
        />
      </el-menu>
      <!-- Main 主内容区 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      activeIndex: '首页',
      activeIndex2: '',
      infoVisible: false,
      self: {},
      unfold: false,
      removePage: '',
      selfPage: '',
      rules: {
        name: {required: true, message: '姓名为必填项', blur: true},
        phone: {required: true, message: '请填写联系方式', blur: true},
        password: {required: true, message: '请填写密码', blur: true},
        confirmPassword: {required: true, message: '请填写密码', blur: true},
      }
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // console.log('watch')
        this.activeIndex = val.path;
        let path = val.path;
        this.activeIndex2 = path;
        if(path.includes('Affair')){
          console.log('affair')
          this.activeIndex2 = path.slice(0,path.lastIndexOf('/'));
          // this.activeIndex2 = path;
        }
        // console.log(val.path);
        // let path = val.path;
        // let count = 0;
        // let index = 0;
        // let i = 0;
        // while(index != -1) {
        //   index = path.indexOf('/', index);
        //   console.log(index)
        //   if(index == -1){
        //     break;
        //   }
        //   i = index;
        //   index++;
        //   count ++; 
        // }
        // if(count >2) {
        //   this.activeIndex = path.slice(0, i);
        //   this.activeIndex2 = path.slice(0, i);
        // }
        //   console.log(this.activeIndex)
        //   console.log('count:   ' + count)
      }
    }
  },
  computed: {
    getRouter () {
      // console.log(this.$store.getters.getRouter)
      return this.$store.getters.getRouter
    },
    getCurrentRoute () {
      // let router = this.$store.getters.get_active_index;
      // router = this.activeIndex2 ? this.activeIndex2 : router;
      // return window.location.pathname;
    }
  },
  mounted () {
    let path = window.location.pathname;
    this.activeIndex2 = window.location.pathname;
    if(path.includes('Affair')){
          // console.log('affair')
          this.activeIndex2 = path.slice(0,path.lastIndexOf('/'));
          // this.activeIndex2 = path;
        }
    // console.log(this.activeIndex2);
    let role = this.$store.getters.getRole;
    switch(role) {
      case 'student': this.removePage = '/student_login';break;
      case 'teacher': this.removePage = '/teacher_login';this.selfPage='/self';break;
      case 'schoolManager': this.removePage = '/admin_login';this.selfPage='/adminself';break;
      case 'sysManager': this.removePage = '/MJK_login';break;
      default : this.removePage = '/admin_login';
    }
    this.$store.dispatch('getClassSelect');
    this.$store.dispatch('GradeList');
    // this.$store.dispatch('getTeachersInfo');
    // let LeaveSchoolNotification = {
    //   equipmentMac: '1111',
    //   recordTime: '2020-6-10 18:10:59',
    //   studentId: '1267385954419609608',
    //   studentCode: '1111616842'
    // }
    // axios({
    //   method: 'post',
    //   url: 'http://ws.yufengzhihui.cn/api/wristband/v1/index.php',
    //   data: LeaveSchoolNotification
    // }).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  
  methods: {
    isActive() {
      // this.activeIndex2 = window.location.pathname
    },
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    submit(form, self) {
      this.$refs[form].validate(valid => {
        if(valid) {
          console.log(self);
        }else{
          return false;
        }
      })
    },
    showHidden () {
      var i = document.querySelector('#showHidden')

      this.unfold = !this.unfold;
      // console.log(i.style)
      i.style.transform = 'rotate(180deg)';
    },
    removeLogin () {
      this.$store.dispatch('removeLogin')
    }
    
  }
}
</script>
<style lang="scss" scoped>
#delay{
  animation-duration: 2s;
}
#showHidden{
    color:#909399;
    font-size:24px;position:fixed;bottom:20px;left:27px;
    transition: all .4s linear !important;
  }
#home{
  // min-width:1200px;
  overflow:hidden;
  
  // .rotate{
  //   transform:rotate(180deg);
  // }
}
  header{
    height:50px !important;
    padding:0 !important;
    #logo{
      position: absolute;
      top:0;
      left:2%;
      color:#fff;
      z-index: 10;
      line-height:50px;
    }
  }
  .container{
    width:100%;
    padding:8px;
    height:calc(100% - 50px);
    background:rgb(245,247,249);
    .container_ {
      height:100%;
      // border:solid 1px;
      background:#fff;
      box-shadow:-2px 0px 4px #aaa;
    }
    li{
      overflow:hidden;
      // background:#39f;
      .is-active{
        background:rgb(236, 245, 255);
      }
      .is-active::after{
        content:'';
        position:absolute;
        width: 2px;
        height:50px;
        right:0;
        background:#39f;
      }
    }
    .aside{
      // box-shadow:-2px 0px 4px #aaa;
      font-size: 12px ;
      // max-width:16%;
    }
    .el-submenu__title{
      font-size:12px;
    }
    // .el-submenu .el-menu-item{
    //   font-size:12px;
    //   width:100% !important;
    //   min-width: auto !important;
    //   padding:0 auto !important;
    // }
    .el-menu-item{
      font-size:12px;
      width:100% !important;
      min-width: auto !important;
      padding:0 0 0 45px !important;
    }
    asideCopy,.aside-menu{
      height:100%;
    }
    asideCopy:not(.el-menu--collapse),.aside-menu:not(.el-menu--collapse){
      // transition-delay: 0.38s;
      width: 16%;
      min-width: auto;
      // height:100%;
    }
    .main{
      background-image: url('../../assets/img/topic4.jpg');
    }
    main{
      background: #fff;
      padding:6px;
      box-shadow:2px 0px 4px #aaa;
      width: 100% !important;
      // overflow-x:hidden;
      overflow-y: auto;
      // background-image: url('../assets/img/topic4.jpg');
      background-size:100% 100%;
    }
    .el-menu-item-group__title{
      padding:0 !important;
    }
    .icon {
      font-size:20px;
      vertical-align: middle;
      margin: 0 4px;
    }
  }
</style>
