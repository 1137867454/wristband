<template>
    <div id="navi">
        <el-container class="wrapper">
            <el-header class="navi_header" height="30px">
                主页
            </el-header>
            <el-main class="navi_main">
                <div class="navi">
                    <ul class="navi_ul" v-show="role.role == 'teacher' || role.role == 'schoolManager'">
                        <!-- 考勤中心 -->
                        <li>
                            <p class="borderLeft" style="border-left:solid 2px #f90;"><i class="margin_4px iconfont icon-kaoqin orangeColor"></i>考勤管理</p>
                            <ul class="navi_icon">
                                <router-link to='/check/schoolGate' tag="li">
                                    <p class="orange naviCard">
                                        <i class="iconfont icon-huabanfuben cardIcon"></i>
                                        <!-- <img style="width:60px;height:60px;" src="../../assets/img/topic.jpg" alt="" srcset=""> -->
                                    </p>
                                    <p>校门考勤</p>
                                </router-link>
                                <router-link to="/check/PEAttendance" tag="li">
                                    <p class="naviCard blue">
                                        <i class="iconfont icon-tiyuguan white cardIcon"></i>
                                    </p>
                                    <p>体育考勤</p>
                                </router-link>
                                <router-link to="/classManager/classAttendance" tag="li">
                                    <p class="darkblue naviCard">
                                        <i class="iconfont icon-banji  cardIcon"></i>
                                        <!-- <img style="width:60px;height:60px;" src="../../assets/img/topic.jpg" alt="" srcset=""> -->
                                    </p>
                                    <p>班级考勤</p>
                                </router-link>
                                <router-link to="/check/PEAttendance" tag="li">
                                    <p class="naviCard f44">
                                        <i class="iconfont icon-xuexiao1 white cardIcon"></i>
                                    </p>
                                    <p>全校考勤</p>
                                </router-link>
                            </ul>
                        </li>
                        <!-- 教师中心 -->
                        <li>
                            <p class="borderLeft" style="border-left:solid 2px #0c6;"><i class="margin_4px iconfont icon-jiaoshi greenColor"></i>教师中心</p>
                            <ul class="navi_icon">
                                <!-- <router-link to='/classManager/info' tag="li">
                                    <p class="greenbg naviCard">
                                        <i class="iconfont icon-yonghu1 cardIcon"></i>
                                    </p>
                                    <p>班级主页</p>
                                </router-link> -->
                                <router-link to="/classManager/info" tag="li">
                                    <p class="blue naviCard">
                                        <i class="iconfont icon-zhuye1  cardIcon" style="margin-left:-2px;"></i>
                                        <!-- <img style="width:60px;height:60px;" src="../../assets/img/topic.jpg" alt="" srcset=""> -->
                                    </p>
                                    <p>班级主页</p>
                                </router-link>
                                <!-- <router-link to="/classManager/classAttendance" tag="li">
                                    <p class="naviCard darkblue">
                                        <i class="iconfont icon-banji white cardIcon"></i>
                                    </p>
                                    <p>班级考勤</p>
                                </router-link> -->
                                <router-link to="classManager/teacher_Affair/affair_center" tag="li">
                                    <p class="naviCard pinkbg">
                                        <i class="iconfont icon-gerenzhongxin white cardIcon"></i>
                                    </p>
                                    <p>教师中心</p>
                                </router-link>
                            </ul>
                        </li>
                        <!-- 体育中心 -->
                        <li>
                            <p class="borderLeft" style="border-left:solid 2px #d4237a;"><i class="margin_4px pinkColor iconfont icon-tiyusaishi"></i>体育监测</p>
                            <ul class="navi_icon">
                                <router-link to='/constitution/classInfo' tag="li">
                                    <p class="pinkbg naviCard">
                                        <i class="iconfont icon-shuju1 cardIcon"></i>
                                        <!-- <img style="width:60px;height:60px;" src="../../assets/img/topic.jpg" alt="" srcset=""> -->
                                    </p>
                                    <p>实时数据</p>
                                </router-link>
                                <router-link to="/constitution/dataComparison" tag="li">
                                    <p class="blue naviCard">
                                        <i class="iconfont icon-jiancepeizhi cardIcon"></i>
                                        <!-- <img style="width:60px;height:60px;" src="../../assets/img/topic.jpg" alt="" srcset=""> -->
                                    </p>
                                    <p>体育监测</p>
                                </router-link>
                                <router-link to="/check/PEAttendance" tag="li">
                                    <p class="naviCard darkblue">
                                        <i class="iconfont icon-tiyuguan white cardIcon"></i>
                                    </p>
                                    <p>体育考勤</p>
                                </router-link>
                                <!-- <router-link to="/check/PEAttendance" tag="li">
                                    <p class="naviCard f44">
                                        <i class="iconfont icon-xuexiao1 white cardIcon"></i>
                                    </p>
                                    <p>全校考勤</p>
                                </router-link> -->
                            </ul>
                        </li>
                    </ul>
                </div>
                <!-- 第二列 -->
                <div class="navi">
                    <ul class="navi_ul">
                        <!-- 管理中心 -->
                        <li v-show="role.role == 'schoolManager'">
                            <div  class="wrapper">
                                <p class="borderLeft" style="border-left:solid 2px #f44;"><i class="margin_4px red iconfont icon-guanli"></i>管理中心</p>
                            <ul class="navi_icon">
                                <router-link to='/Manager/student' tag="li">
                                    <p class="f44 naviCard">
                                        <i class="iconfont icon-xuesheng cardIcon"></i>
                                        <!-- <img style="width:60px;height:60px;" src="../../assets/img/topic.jpg" alt="" srcset=""> -->
                                    </p>
                                    <p>学生管理</p>
                                </router-link>
                                <router-link to="/Manager/teacher" tag="li">
                                    <p class="naviCard greenbg">
                                        <i class="iconfont icon-jiaoshi white cardIcon"></i>
                                    </p>
                                    <p>教师管理</p>
                                </router-link>
                                <router-link to="/classManager/class_" tag="li">
                                    <p class="naviCard darkblue">
                                        <i class="iconfont icon-banjiguanli white cardIcon"></i>
                                    </p>
                                    <p>班级管理</p>
                                </router-link>
                                <router-link to="/classroom/classroom" tag="li">
                                    <p class="blue naviCard">
                                        <i class="iconfont icon-jiaoshiguanli cardIcon"></i>
                                        <!-- <img style="width:60px;height:60px;" src="../../assets/img/topic.jpg" alt="" srcset=""> -->
                                    </p>
                                    <p>教室管理</p>
                                </router-link>
                                <router-link to="/device/wristband" tag="li">
                                    <p class="naviCard pinkbg">
                                        <i class="iconfont icon-shouhuan white cardIcon"></i>
                                    </p>
                                    <p>手环管理</p>
                                </router-link>
                                <router-link to="/device/bluetooth" tag="li">
                                    <p class="naviCard orange">
                                        <i class="iconfont icon-lanyadaikuang_huaban white cardIcon"></i>
                                    </p>
                                    <p>蓝牙管理</p>
                                </router-link>
                                <router-link to="/admin/announcement" tag="li">
                                    <p class="yellowbg naviCard">
                                        <i class="iconfont icon-gonggao cardIcon"></i>
                                        <!-- <img style="width:60px;height:60px;" src="../../assets/img/topic.jpg" alt="" srcset=""> -->
                                    </p>
                                    <p>公告管理</p>
                                </router-link>
                                <router-link to="/admin/setup" tag="li">
                                    <p class="naviCard black">
                                        <i class="iconfont icon-luru white cardIcon"></i>
                                    </p>
                                    <p>信息录入</p>
                                </router-link>
                                <router-link to="schoolAffair/AffairManage/adminHome" tag="li">
                                    <p class="naviCard" style="background:#388;">
                                        <i class="iconfont icon-guanli2 cardIcon" style="margin-left:2px;"></i>
                                    </p>
                                    <p>学校事务</p>
                                </router-link>
                            </ul>
                            </div>
                        </li>
                        <!-- 学生中心 -->
                        <li v-show="role.role != 'sysManager' &&  role.role != 'teacher'">
                            <p class="borderLeft" style="border-left:solid 2px #39f;"><i class="iconfont icon-xuesheng blueColor"></i>学生中心</p>
                            <ul class="navi_icon">
                                <router-link to="/classManager/info" tag="li">
                                    <p class="blue naviCard">
                                        <i class="iconfont icon-zhuye1 cardIcon" style="margin-left:-2px;"></i>
                                        <!-- <img style="width:60px;height:60px;" src="../../assets/img/topic.jpg" alt="" srcset=""> -->
                                    </p>
                                    <p>班级主页</p>
                                </router-link>
                                <router-link to="/classManager/classAttendance" tag="li">
                                    <p class="naviCard darkblue">
                                        <i class="iconfont icon-banji white cardIcon"></i>
                                    </p>
                                    <p>班级考勤</p>
                                </router-link>
                                <router-link to="/self" tag="li">
                                    <p class="naviCard greenbg">
                                        <i class="iconfont icon-gerenzhongxin1 white cardIcon"></i>
                                    </p>
                                    <p>个人中心</p>
                                </router-link>
                            </ul>
                        </li>
                        <!-- 学校管理 -->
                        <li v-show="role.role == 'sysManager'" >
                            <div class="wrapper">

                            <p class="borderLeft" style="border-left:solid 2px #f60;"><i class="iconfont icon-xuexiao5 f60Color"></i>学校管理</p>
                            <ul class="navi_icon">
                                <router-link to='/schoolManage/schools' tag="li">
                                    <p class="f60 naviCard">
                                        <i class="iconfont icon-xuexiao2 cardIcon"></i>
                                        <!-- <img style="width:60px;height:60px;" src="../../assets/img/topic.jpg" alt="" srcset=""> -->
                                    </p>
                                    <p>学校查询</p>
                                </router-link>
                            </ul>
                            </div>
                        </li>
                        <li></li>
                        <li></li>
                    </ul>
                    
                </div>
            </el-main>
        </el-container> 
    </div>
</template>
<script>
export default {
    name: 'navi',
    data() {
        return {
            role: {},
            permission: ['student', 'teacher', 'schoolManager']
        }
    },
    mounted() {
        this.role = this.$store.getters.getUser;
        // console.log('nav   ' + this.role.type);
        // console.log(this.$route)
    },
    beforeRouteLeave(to, from, next) {
        // console.log(to);
        // console.log(this.$store.commit)
        this.$store.state.activeIndex = to.path;
        // this.$store.commit('set_activeIndex', to.path)
        next();
    }
}
</script>
<style lang="scss" scoped>
#navi{
    // font-family: 'Courier New', Courier, monospace;
    background:rgba($color: #fff, $alpha: 1);
    height:100%;
    width:100%;
    // padding:10px;
    .navi_header{
        background:rgb(235,242,250);
        line-height:30px;
        margin:8px;
        box-shadow:2px 0px 4px #aaa;
        color:#1296db;
    }
    .navi_main{
        box-sizing: border-box;
        margin:0 8px 0;
        padding:10px 0 0 0;
        background:transparent;
        box-shadow:2px 0px 4px #aaa;
        overflow-y: auto;
        .navi{
            font-size:14px;
            // margin-top:10px;
            .navi_ul{
                // padding:8px 0;
                // display:grid;
                // grid-template-columns: repeat(3,30%);
                // justify-content: space-around;
                // grid-template-rows:repeat(3,30%);
                font-size:12px;
                display:flex;
                justify-content:space-between;
                flex-wrap: wrap;
                // flex-direction:row-reverse;
                &>li{
                    // box-shadow: 0px 2px 6px #aaa;
                    // border:solid 1px;
                    width:30%;
                    text-align: center;
                    .borderLeft{
                        text-align:left;
                        padding:4px;
                        margin-left:10%;
                        font-size:12px;
                    }
                }
                .navi_icon{
                    margin:10px 0;
                    width:90%;
                    display: inline-flex;
                    justify-content:flex-start;
                    flex-wrap: wrap;
                    // border:solid 1px;
                    &>li{
                        float:left;
                        height:30%;
                        width:30%;
                        margin-left:2.5%;
                        margin-bottom:10px;
                        // border:solid 1px;
                        border-radius:8px;
                        .naviCard{
                            width:60px;height:60px;margin:0 auto 4px;
                            border-radius: 10px;
                            transition: all linear 0.3s;
                            &:hover{
                                opacity: 0.8;
                                transform: scale(1.1,1.1);
                            }
                            .cardIcon{
                                line-height:58px;font-size:36px;color:#fff;
                            }
                        }
                    }
                }
            }
        }
    }
    .margin_4px{
        margin-right:4px;
    }
}
</style>