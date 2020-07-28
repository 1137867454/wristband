<template>
  <div
    id="self"
    class="wrapper animated fadeIn"
  >
    <!-- 个人中心 -->
    <div class="selfInfoWrapper">
      <div
        class="selfCard"
        style="background:rgb(243,114,118);"
      >
        <span
          class="cardLeft"
          style=""
        >本周剩余20堂课</span>
        <span class="cardRight"><i
          class="el-icon-edit"
          style="font-size:20px;color:#fff;"
        /></span>
      </div>
      <div
        class="selfCard"
        style="background:rgb(255,170,61)"
      >
        <span class="cardLeft">20个学生请假</span>
        <span class="cardRight"><i
          class="el-icon-edit"
          style="font-size:20px;color:#fff;"
        /></span>
      </div>
      <div
        class="selfCard"
        style="background:rgb(37,203,183);"
      >
        <span class="cardLeft">5门课程 有待答疑</span>
        <span class="cardRight"><i
          class="el-icon-edit"
          style="font-size:20px;color:#fff;"
        /></span>
      </div>
      <div
        class="selfCard"
        style="background:#39f;"
      >
        <span class="cardLeft">2个班级有待测试</span>
        <span class="cardRight"><i
          class="el-icon-edit"
          style="font-size:20px;color:#fff;"
        /></span>
      </div>
    </div>
    <el-container style="margin-top:10px;">
      <el-aside
        class="myself"
        width="200px"
      >
        <div class="top" />
        <div class="middle">
          <img
            class="site"
            src="../../assets/img/cat.png"
            alt=""
          >
        </div>
        <div class="bottom">
          <ul>
            <li>姓名：李廉江</li>
            <li>年龄：24</li>
            <li>性别：男</li>
            <li>工号：1100011</li>
            <li>职务：物理老师</li>
            <li>年级：3年级</li>
            <li id="button">
              <el-button
                type="info"
                style="background:rgb(70, 76, 91);padding:6px;"
                size="mini"
                @click="setInfo = true"
              >
                信息设置
              </el-button>
              <el-button
                type="warning"
                style="padding:6px;"
                size="mini"
                @click="resetPwd = true;"
              >
                密码修改
              </el-button>
            </li>
          </ul>
        </div>
      </el-aside>
      <!-- 信息设置框 -->
      <el-dialog
        :modal="false"
        :modal-append-to-body="false"
        title="提示"
        :visible.sync="setInfo"
        width="40%"
        center
      >
        <el-form
          class="form refuseCopy"
          size="small"
          :model="self"
          label-width="100px"
        >
          <el-form-item label="学校">
            <el-input
              v-model="self.school"
              style="width:240px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              v-model="self.name"
              style="width:240px"
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
              style="width:120px;"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="年级">
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
          </el-form-item>
          <el-form-item>
            <el-button @click="setInfo = false">
              取 消
            </el-button>
            <el-button
              type="primary"
              @click="setInfo = false"
            >
              确 定
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 密码修改框 -->
      <el-dialog
        title="密码重置"
        :close-on-click-modal="false"
        :visible.sync="resetPwd"
        :modal="false"
        width="40%"
        center
      >
        <el-form
          class="form refuseCopy"
          size="small"
          :model="self"
          label-width="100px"
        >
          <el-form-item label="原始密码">
            <el-input
              v-model="self.pre_pwd"
              style="width:240px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="原始密码">
            <el-input
              v-model="self.new_pwd"
              style="width:240px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="原始密码">
            <el-input
              v-model="self.confirm_pwd"
              style="width:240px"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button @click="resetPwd = false">
              取 消
            </el-button>
            <el-button
              type="primary"
              @click="resetPwd = false"
            >
              确 定
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-main style="margin-left:10px;overflow-y:auto !important;height:292px;">
        <div style="border-bottom:solid 1px #f0f0f0;padding:6px;">
          <span
            class="bottom"
            style="border-bottom:solid 2px #39f;padding-bottom:6px;"
          ><i class="el-icon-user" />通知公告</span>
        </div>
        <ul id="notice">
          <li>[置顶]关于任课教师交流平台的通知</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>3</li>
          <li>3</li>
          <li>3</li>
        </ul>
      </el-main>
    </el-container>
    <el-container id="containerEl">
      <el-aside
        class="asideEl"
        width="calc(100% - 410px)"
      >
        <div style="border-bottom:solid 1px #f0f0f0;padding:6px;">
          <span
            class="bottom"
            style="border-bottom:solid 2px #42b9a0;padding-bottom:6px;"
          >
            <i class="el-icon-user" />课程表</span>
        </div>
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>时间</th>
              <th
                v-for="day in courseDatas.courseInfo"
                :key="day[0]"
              >
                {{ day['courseTime'] }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="v in courseDatas.weeks"
              :key="v"
            >
              <th>周{{ getWeek(v - 1) }}</th>
              <th
                v-for="(va,i) in courseDatas.courseInfo"
                :key="i"
              >
                {{ va[getWeek2(i)] }}
              </th>
              <!-- {{va[getWeek2(v - 1)]}} -->
            </tr>
          </tbody>
          <!-- <tbody>
                <tr v-for="(v,i) in courseDatas.courseInfo" :key="i">
                  <th v-for="(va, key,index) in v" :key="index">
                    <p style="margin-bottom:4px;" v-if="index < 1 ">第{{i+1}}节</p>
                    {{va}}
                  </th>
                </tr>
              </tbody> -->
        </table>
      </el-aside>
      <el-main
        class="mainEl"
        style="max-width:400px;"
      >
        <div style="border-bottom:solid 1px #f0f0f0;">
          <span
            class="bottom"
            style="border-bottom:solid 2px #e01212;padding-bottom:6px;"
          >
            <i class="el-icon-user" />快速链接</span>
        </div>
        <!-- <div class="link">
              <span class="linkTop"></span>
            </div> -->
        <links :link-info="'#f44'">
          <template v-slot:header>
            NO.1
          </template>
          <template v-slot:main>
            学校官网
          </template>
          <!-- <main>#fff</main> -->
        </links>
        <links
          :link-info="'#f60'"
          style="margin:2% 13px"
        >
          <template v-slot:header>
            NO.2
          </template>
          <template v-slot:main>
            教务处网
          </template>
        </links>
        <links :link-info="'#f90'">
          <template v-slot:header>
            NO.3
          </template>
          <template v-slot:main>
            学校资源
          </template>
        </links>
        <links :link-info="'#1296db'">
          <template v-slot:header>
            NO.4
          </template>
          <template v-slot:main>
            课程观摩
          </template>
        </links>
        <links
          :link-info="'#39f'"
          style="margin:0 13px"
        >
          <template v-slot:header>
            NO.5
          </template>
          <template v-slot:main>
            开课申请
          </template>
        </links>
        <links :link-info="'#0c6'">
          <template v-slot:header>
            NO.6
          </template>
          <template v-slot:main>
            个人资源
          </template>
        </links>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import links from '../../components/links'
export default {
  name: 'Self',
  components: {
    links
  },
  data () {
    return {
      setInfo: false,
      resetPwd: false,
      self: {
      },
      courseDatas: {
        weeks: [1, 2, 3, 4, 5, 6, 7],
        courseInfo: [{
          courseTime: '8:00- 8:40',
          monday: '物理',
          tuesday: '英语',
          wednesday: '政治',
          thursday: '历史',
          friday: '化学',
          saturday: '语文',
          sunday: '化学'
        },
        {
          courseTime: '8:50- 9:30',
          monday: '物理',
          tuesday: '英语',
          wednesday: '政治',
          thursday: '历史',
          friday: '化学',
          saturday: '语文',
          sunday: '化学'
        },
        {
          courseTime: '9:50- 10:30',
          monday: '物理',
          tuesday: '英语',
          wednesday: '政治',
          thursday: '历史',
          friday: '化学',
          saturday: '语文',
          sunday: '化学'
        },
        {
          courseTime: '10:40- 11:20',
          monday: '物理',
          tuesday: '英语',
          wednesday: '政治',
          thursday: '历史',
          friday: '化学',
          saturday: '语文',
          sunday: '化学'
        },
        {
          courseTime: '11:30- 12:10',
          monday: '物理',
          tuesday: '英语',
          wednesday: '政治',
          thursday: '历史',
          friday: '化学',
          saturday: '语文',
          sunday: '化学'
        },
        {
          courseTime: '2:00- 2:40',
          monday: '物理',
          tuesday: '英语',
          wednesday: '政治',
          thursday: '历史',
          friday: '化学',
          saturday: '语文',
          sunday: '化学'
        },
        {
          monday: '物理',
          tuesday: '英语',
          wednesday: '政治',
          thursday: '历史',
          friday: '化学',
          saturday: '语文',
          sunday: '化学',
          courseTime: '2:50-3:30'
        }]
      }
    }
  },
  computed: {
    getCourse (day) {
      return function (day) {
        return this.course.filter(v => {
          return v.day === day
        })
      }
    }
  },
  methods: {
    getWeek (day) {
      let chars = ['一', '二', '三', '四', '五', '六', '七']
      console.log(day)
      return chars[day]
    },
    getWeek2 (day) {
      let chars = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      return chars[day]
    }
  }
}
</script>

<style lang="scss" scoped>
  #self{
    background:#f0f0f0;
    padding:10px;
    .selfInfoWrapper{
      display:flex;height:66px;justify-content:space-between;text-align:center;
        .selfCard{
          // max-width:324px;
          height:66px;width:24%;
        .cardLeft{
          line-height:54px;
          // border:solid 1px;
          width:calc(100% - 80px);
          float:left;
          color:#fff;
          padding:6px;display:inline-block;
        }
        .cardRight{
          height:54px;width:54px;display:inline-block;
          line-height:60px;
          padding:6px;
          float:right;
          background:rgba(120,120,120,0.6);
        }
      }
    }
    .form{
      padding: 0 8%;
      font-size: 18px !important;
      // text-align: center;
    }
    .myself{
      position:relative;
      font-size:12px;
      // border:solid 1px;
      width:180px;
      // margin-top:20px;
      .top{
        background-image: url("../../assets/img/topic6.jpg");
        background-size: 100% 100%;
        height:130px;
        // border-bottom:solid 1px;
      }
       .middle{
          .site{
            height:50px;
            width:50px;
            border-radius:50%;
            position: absolute;
            top:100px;
            left:70px;
            border:solid 2px #eee;
          }
        }
      .bottom{
        background:#fff;
        width:100%;
        padding:20px 0 6px 10px;
        ul{
          width:90%;
          margin:0 auto;
          // border:solid 1px;
          li{
            padding-left:10px;
            margin-top:2px;
            #button{
              padding-left:0 !important;
              text-align:center;
            }
          }
        }
      }
    }
    #notice{

      overflow-y: auto !important;
      li{
        padding:8px;
        border-bottom:solid 1px #e0e0e0;
      }
    }
    #containerEl{
      margin-top:8px;height:calc(100% - 374px);
      .asideEl{
        background:#fff; padding:4px;overflow-y:auto;
        height:100%;
        table{
          margin:6px auto;
          width:86%;
          height:80%;
          border:0;
          table-layout: fixed;
          thead{
            color:#fff;background:#67a1ff;
            th{
              padding:0px 5px;height:30px;
            }
          }
          tbody{
            background: #eaf2ff;
            color:#909399;
            th,
            td {
                font-size:14px;
                width: 60px;
                // padding: 2% 0px;
                padding: 3px 0px;
                text-align: center;
                font-weight: 500;
            }
            tr th:first-child{
              color:#666;
            }
          }
        }
      }
      .mainEl{
        margin-left:10px;
      }
    }
    .el-main{
      padding:7px;
    }
  }
</style>
