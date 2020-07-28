<template>
  <div
    id="login"
    class="wrapper animated fadeIn"
  >
    <div class="dowebok">
      <div class="containers">
        <div id="left">
          <div class="login animated lightSpeedInLeft">
            廉江中学
            <div style="font-size:14px;text-align:right;">——十年树木，百年树人</div>
          </div>
          <div class="eula">
            欢迎光临，请输入您的用户名和密码以登录！
          </div>
        </div>
        <div id="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient
                id="linearGradient"
                inkscape:collect="always"
                x1="13"
                y1="193.49992"
                x2="307"
                y2="193.49992"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  id="stop876"
                  style="stop-color:#ff00ff;"
                  offset="0"
                />
                <stop
                  id="stop878"
                  style="stop-color:#ff0000;"
                  offset="1"
                />
              </linearGradient>
            </defs>
            <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
          </svg>
          <div class="form">
            <el-form
              ref="form"
              :rules="rules"
              :model="form"
              :status-icon="true"
            >
              <!-- <el-form-item prop="account">
                    <el-input v-model="form.account" prefix-icon="el-icon-user el"></el-input>
                </el-form-item> -->
              <label for="email">用户名</label>
              <el-form-item prop="account">
                <input autofocus
                  id="email"
                  v-model="form.account"
                  type="text"
                >
              </el-form-item>
              <label for="password">密码</label>
              <el-form-item prop="password" style="margin-top:-8px !important;">
                <input @keydown.enter="login('form')"
                  id="password"
                  v-model="form.password"
                  type="password"
                >
              </el-form-item>
              <!-- <input type="password" > -->
              <!-- <input type="submit"  value="登陆"> -->
              <el-button
                id="submit"
                style="border:none;background: transparent;
                    border: 0;color: #f2f2f2;font-size: 20px;height: 30px;margin-top:26px;
                    outline: none !important;width: 100%;"
                @click="login('form')"
              >
                登陆
              </el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- login (info) {
      this.$refs[info].validate(valid => {
        if (valid) {
          this.loginStatus = true
          this.form.role = 'schoolManager';
          if(getItem('role') && getItem('token')){
            this.$confirm('您正处于登录状态不能重复登录', '提示', {
              confirmButtonText: '注销',
              cancelButtonText: '取消',
              type: 'error',
              center: true
            }).then(() =>{
              removeItem('role');
              removeItem('token');
              this.$store.dispatch('login', this.form)
              .then(res => {
                this.$router.push({path: '/'})
              })
            }).catch(() => {

            })
          }else{
            this.$store.dispatch('login', this.form)
            .then(res => {
              this.$router.push({path: '/'})
            }).catch(error => {
            })
          }
          
        }
      })
    } -->
</template>
<script>
// import '../../assets/js/anime.min.js'
// import '../../assets/js/index.js'
// import axios from 'axios';
import fx from '../../util/fx'
// import qs from 'qs'
let Base64 = require('js-base64').Base64
// let md5 = require('js-md5')
// const anime = require('anime');
export default {
  name: 'Login',
  data () {
    return {
      loginStatus: false,
      form: {
        account: '',
        password: '',
        // account: '123456',
        // password: '123456',
        loginDirect: '',
        getCode: function () {
          // 采用MD5加密密码，而后用base64加密用户名与密码（MD5加密过）拼接的字符串
          let pwd = md5(this.password)
          let code = this.account + pwd
          code = Base64.encode(code)
          return code
        }
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 7 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 7 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    console.log(Base64)
    var current = null
    let that = this
    // console.log(document.querySelector('#email'))
    document.querySelector('#email').addEventListener('focus', function (e) {
      if (current) current.pause()
      current = that.$anime({
        targets: 'path',
        strokeDashoffset: {
          value: 0,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      })
    })
    let password = document.querySelector('#password');
    password.addEventListener('focus', function (e) {
      if (current) current.pause()
      current = that.$anime({
        targets: 'path',
        strokeDashoffset: {
          value: -336,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      })
    })
    password.addEventListener('keydown',(e) =>{
      // console.log(e.key)
      if(e.key == 'Tab'){
        current = that.$anime({
        targets: 'path',
        strokeDashoffset: {
          value: -730,
          duration: 400,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '530 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      })
      }
    })
    document.querySelector('#submit').addEventListener('mouseover', function (e) {
      let input1 = document.querySelector("#email");
      let input2 = document.querySelector("#password");
      input1.blur();input2.blur();
      if (current) current.pause()
      current = that.$anime({
        targets: 'path',
        strokeDashoffset: {
          value: -730,
          duration: 400,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '530 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      })
    })
  },
  methods: {
    login (info) {
      this.$refs[info].validate(valid => {
        if (valid) {
          this.loginStatus = true
          // let code = this.form.getCode();
          this.form.role = 'schoolManager';
          this.$store.dispatch('login', this.form)
            .then(res => {
              // this.$message({
              //   message: '登陆成功',
              //   type: 'success'
              // })
              this.$router.push({path: '/'})
            }).catch(error => {
              // console.log(error)
              // this.$message({
              //   center: true,
              //   message: '用户名或密码错误(＠_＠;)',
              //   type: 'error'
              // })
            })
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
  // @import url('../../assets/css/style.css');
    #login{
        min-width:400px;
        background-image: url('../../assets/img/topic7.jpg');
        background-repeat: no-repeat;
        background-size:100% 100%;
        font-family: 'Inter UI', sans-serif;
        margin: 0;
        position:relative;
        overflow:hidden;
        // #title{
        //   color:#fff;
        //   text-align:center;
        //   line-height:80px;
        //   font-size:30px;
        // }
    }
    // .box-class{
    //     position: absolute;
    //     padding:20px;
    //     right: 10%;
    //     top:30%;
    //     height:300px;
    //     width: 380px;
    //     background: rgba(250,250,250,0.65);
    //     box-shadow:2px 2px 4px #aaa !important;
    // }
    .el{
        font-size:22px;
        color:#666;
    }
    .el-form-item{
      margin:0 !important;
    }
   .el-form-item__error{
        padding:0 !important;
      }
    ::selection {
    background: #2d2f36;
}
::-webkit-selection {
    background: #2d2f36;
}
::-moz-selection {
    background: #2d2f36;
}
// input:-webkit-autofill {
  //     transition: background-color 5000s ease-in-out 0s;
//     box-shadow: 0 0 0 1000px  rgba($color: #474a59, $alpha: 0.9) inset !important;
// }
:-webkit-autofill {
 -webkit-text-fill-color: rgba($color: #fff, $alpha: 0.9) !important;
 -webkit-text-fill-background-color: rgba($color: #474a59, $alpha: 0.9) !important;
 transition: background-color 10000s ease-in-out 0s;
}
/* body {
    background: white;
    font-family: 'Inter UI', sans-serif;
    margin: 0;
    padding: 20px;
} */
 .dowebok {
     height: 100%;
     position: absolute;
     place-content: center;
     width: 100%;
     top:calc(50% - 170px);
 }
 .containers {
     display: flex;
     height: 320px;
     margin: 0 auto;
     width: 640px;
 }
 #left {
     background: rgba($color: #fff, $alpha: 0.9);
     height: calc(100% - 40px);
     top: 20px;
     position: relative;
     width: 50%;
 }
 .login {
     font-size: 50px;
     font-weight: 900;
     margin: 50px 40px 30px;
 }
 .eula {
     color: #999;
     font-size: 14px;
     line-height: 1.5;
     margin: 40px;
 }
 #right {
   background: rgba($color: #474a59, $alpha: 0.9);
    //  background: #474a59;
     box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
     color: #f1f1f2;
     position: relative;
     width: 50%;
 }
//  @media (max-width: 767px) {
//      #right {
//          flex-shrink: 0;
//          height: 100%;
//          width: 100%;
//          max-height: 350px;
//      }
//  }
 svg {
     position: absolute;
     width: 320px;
 }
 path {
     fill: none;
     stroke: url(#linearGradient);
     stroke-width: 4;
     stroke-dasharray: 240 1386;
 }
 .form {
     margin: 40px;
     position: absolute;
 }
 label {
     color: #c2c2c5;
     display: block;
     font-size: 14px;
     height: 16px;
     margin-top: 20px;
     margin-bottom: 5px;
 }
 input {
     background: transparent;
     border: 0;
     color: #f2f2f2;
     font-size: 20px;
     height: 30px;
     line-height: 30px;
     outline: none !important;
     width: 100%;
 }
 input::-moz-focus-inner {
     border: 0;
 }
 #submit {
     color: #707075;
     margin-top: 40px;
     transition: color 300ms;
 }
 #submit:focus {
     color: #f2f2f2;
 }
 #submit:active {
     color: #d0d0d2;
 }
</style>
