<template>
  <div
    id="stundent"
    class="wrapper"
  >
    <!-- 箭头盒子 -->
    <labelTop
      :label-info="labelInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <div class="button">
      <el-button
        size="mini"
        type="primary"
        round
        @click="dialogVisible = true"
      >
        <i class="el el-icon-circle-plus-outline" />添加
      </el-button>
      <el-button
        size="mini"
        type="danger"
        round
        @click="deletes"
      >
        <i class="el el-icon-delete" />删除
      </el-button>
      <el-button
        size="mini"
        type="success"
        round
      >
        <i class="el el-icon-finished" />升级
      </el-button>
      <label style="margin-left:16px;">班级
        <el-cascader
          v-model="rule.classroom"
          class="pickInput"
          size="mini"
          :options="options"
          clearable
          placeholder="请选择班级"
          :props="{expandTrigger: 'hover'}"
          @change="handleChange"
        />
      </label>
      <label>学号<el-input
        v-model="rule.sid"
        class="pickInput"
        size="mini"
        placeholder="根据班级id查询"
      /></label>
      <label>姓名<el-input
        v-model="rule.name"
        class="pickInput"
        size="mini"
        placeholder="根据班主任查询"
      /></label>
      <!-- <el-input class="right" v-model="search" size="mini"
          placeholder="输入关键字搜索"  style="width:180px;" />
      </div> -->
      <el-button
        type="primary"
        size="mini"
        round
        @click="clearSearch"
      >
        清空
      </el-button>
    </div>
    <!-- dialogVisible 学生添加弹窗 el-dialog -->
    <el-dialog
      custom-class="dialoger"
      top="10vh"
      :modal="false"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      center
      title="添加"
    >
      <el-form :inline="true"
        class="form refuseCopy"
        size="small"
        :model="students"
        label-width="80px"
      >
        <el-form-item label="姓名">
          <el-input
            v-model="students.studentName"
            style="width:130px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio style="width:58px;"
            v-model="students.gender"
            label="1"
          >
            男
          </el-radio>
          <el-radio
            v-model="students.gender"
            label="2"
          >
            女
          </el-radio>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker style="width:130px"
            v-model="students.date"
            align="right"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <!-- <el-form-item label="年龄">
          <el-input
            v-model="students.age"
            style="width:130px;"
            autocomplete="off"
          />
        </el-form-item> -->
        <el-form-item label="年级">
          <el-input
            v-model="students.grade"
            style="width:130px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="班级">
          <!-- class="pickInput" -->
          <el-cascader
          v-model="rule.classId"
          size="mini" style="width:130px;"
          :options="options"
          clearable
          placeholder="请选择班级"
          :props="{expandTrigger: 'hover'}"
          @change="handleChange"
        />
          <!-- <el-input
            v-model="students.classId"
            style="width:120px"
            autocomplete="off"
            
          /> -->
        </el-form-item>
        <el-form-item label="卡号">
          <el-input
            v-model="students.cardNo"
            style="width:130px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="学号">
          <el-input
            v-model="students.studentCode"
            style="width:130px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="家长姓名">
          <el-input
            v-model="students.patriarchName"
            style="width:130px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input @keydown.native.enter="dialogVisible = false;submit(students)"
            v-model="students.phone"
            style="width:130px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="图片" style="width:100%;" >
        <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="mini" type="primary">点击上传</el-button>
  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
</el-upload>
        </el-form-item>
        <el-form-item :label="''" style="text-align:center;width:100%;">
          <el-button
            type="primary"
            @click="dialogVisible = false;submit(students)"
          >
            确 定
          </el-button>
          <el-button @click="dialogVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 学生信息列表 -->
    <div style="height:calc(100% - 90px);">
      <template>
      <el-table style="background:rgba(243,249,248,0.8)"
        size="mini" height="100%"
        row-class-name="table"
        header-cell-class-name="tableHeader"
        class="animated slideInDown"
        top="8vh"
        :data="sdata"
        :border="true"
        :row-key="getRowKey"
        :expand-row-keys="expands"
        @row-dblclick="dblclick"
        @select="select"
        @select-all="selectAll"
      >
        <el-table-column
          :resizable="true"
          align="center"
          type="selection"
        />
        <el-table-column type="expand" width="24">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.name }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
        <el-table-column
          v-for="(v, k, i) in student"
          :key="i"
          :resizable="true"
          align="center"
          :prop="k"
          :label="v"
        />
        <!-- <el-table-column align="center" prop="name" :label="Object.values(student)"></el-table-column>
            <el-table-column align="center" prop="sex" :label="Object.values(student)"></el-table-column>
            <el-table-column align="center" prop="class" :label="Object.values(student)"></el-table-column>
            <el-table-column align="center" prop="date" :label="Object.values(student)"></el-table-column>
            <el-table-column align="center" prop="address" :label="Object.values(student)"></el-table-column>
            <el-table-column align="center" prop="address" :label="Object.values(student)"></el-table-column> -->
        <el-table-column
          align="center"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              round
              @click="updateVisible = true;sid = scope.row.sid"
            />
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              round
              @click="deletes(scope.$index,scope.row)"
            />
            <el-button
              size="mini"
              type="info"
              icon="el-icon-more"
              round
            />
            <!-- <el-button size="mini" type="primary"  round>编辑</el-button>
              <el-button size="mini" type="danger" round>删除</el-button>
              <el-button size="mini" type="info" round>详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- {{sdata}} -->
    </template>
    </div>
    <!-- 学生信息修改框 -->
    <el-dialog
      :modal="false"
      custom-class="dialog"
      width="500px"
      top="10vh"
      :visible.sync="updateVisible"
      :destroy-on-close="true"
      center
      title="添加"
    >
      <el-form
        class="form refuseCopy"
        size="small"
        :model="students"
        label-width="100px"
      >
        <el-form-item label="学校">
          <el-input
            v-model="students.school"
            style="width:240px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="students.name"
            style="width:240px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio
            v-model="students.sex"
            label="男"
          >
            男
          </el-radio>
          <el-radio
            v-model="students.sex"
            label="女"
          >
            女
          </el-radio>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input
            v-model="students.age"
            style="width:120px;"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="年级">
          <el-input
            v-model="students.grade"
            style="width:120px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="班级">
          <el-input
            v-model="students.classroom"
            style="width:120px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="入学日期">
          <el-date-picker
            v-model="students.date"
            align="right"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="updateVisible = false;updateStudent"
          >
            确 定
          </el-button>
          <el-button @click="updateVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getItem } from '../../util/localStorage'
import labelTop from '../../components/label'
export default {
  name: 'Student',
  components: {
    labelTop
  },
  data () {
    return {
      labelInfo: {
        avatar: 'el-icon-user',
        level1: '用户管理',
        level2: '学生管理',
        total: 0
        // handleSizeChange:
      },
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      expands: [], //展开行,
      getRowKey(row) {
        return row.id;
      },
      rowKey: '',
      search: '',
      selection: [],
      dialogVisible: false,
      updateVisible: false,
      sid: '', // 修改用户信息所需的sid
      options: this.$store.getters.getOptions, // 班级列表
      students: {
        cardNo: "",
        classId: "",
        faceFile: "",
        gender: "",
        patriarchName: "",
        phone: "",
        studentCode: "",
        studentName: ""
      },
      rule: {
        sid: '',
        name: '',
        sex: '',
        age: '',
        grade: '',
        classroom: '',
        pick: function () {
          var pickArr = []
          for (let i in this) {
            if (this[i] !== '') {
              pickArr.push(i)
            }
          }
          pickArr.pop()
          return pickArr
        }
      },
      student: { // 学生对象 >> 属性
        // sid: '学号',
        // name: '姓名',
        // sex: '性别',
        // grade: '年级',
        // classroom: '班级',
        // age: '年龄',
        // address: '位置',
        // date: '入学日期',
        "cardNo": "卡号",
        "classId": "班级",
        // "faceFile": "人脸识别",
        "gender": '性别',
        "patriarchName": "家长",
        "phone": "联系方式",
        "studentCode": "学号",
        "studentName": "姓名"
      },
      currentPage: 1,
      pageSize: 10,
      studentData: []
    }
  },
  computed: {
    form () {
      return Object.entries(this.$data.student)
    },
    sdata () {
      let data = this.$store.getters.getStudents
      let rule = this.rule.pick()
      // if (rule.length) {
      //   this.currentPage = 1
      // }
      rule.forEach(e => {
        data = data.filter((v, i) => {
          if (Array.isArray(this.rule[e])) {
            return v[e].includes(this.rule[e].join(''))
          } else {
            return v[e].includes(this.rule[e])
          }
        })
      })
      console.log(rule)
      this.setData(rule, data)
      var prev = (this.currentPage - 1) * this.pageSize
      // this.labelInfo.total = data.length
      data = data.slice(prev, this.pageSize + prev)
      console.log(prev)
      console.log(this.pageSize)
      return data
    }
  },
  mounted () {
    this.$store.dispatch('getStudentData')
    // this.studentData = this.$store.getters.getStudents;
    // this.webSocketInit()
  },
  beforeDestroy () {
    // this.over()
  },
  methods: {
     handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    select (selection, row) { // 单选
      this.selection = selection
      console.log(this.selection)
    },
    selectAll (selection) { // 多选
      // console.log(selection)
      this.selection = selection
      console.log(this.selection)
    },
    dblclick(row, cloumn, event) {
      console.log(row)
      if (this.expands.includes(row.id)) {
        this.expands = this.expands.filter(val => val !== row.id);
      } else {
        this.expands.splice(0,1,row.id)
        // this.expands.pop();
        // this.expands.push(row.sid);
      }
    },
    // getRowKey(row) {
    //   console.log(row)
    // },
    handleSizeChange (val) { // 分页数量改变
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) { // 当前页切换
      console.log(`当前页: ${val}`)
    },
    handleChange (e) {
      // console.log(e)
    },
    clearSearch () {
      this.rule.sid = '' // 班级号：唯一ID
      this.rule.name = ''
      this.rule.classroom = ''// 班主任
      this.rule.grade = ''
    },
    sizeChange (val) {
      console.log('sizeChange ' + val)
      this.pageSize = val
    },
    currentChange (val) {
      console.log('currentChage ' + val)
      this.currentPage = val
    },
    submit (student) { // 提交添加学生信息
      console.log(student)
      // this.$store.dispatch('addStudent', student)
      this.$store.dispatch('addStudent', student)
    },
    deletes (index, row) { // 删除学生
      var arr = []
      // console.log(i);
      // console.log(s);
      if (row) {
        arr.push(row.sid)
      } else {
        this.selection.forEach(v => {
          arr.push(v.sid)
        })
      }
      this.$store.dispatch('deleteStudent', arr)
    },
    updateStudent () { // 学生信息修改
      this.students.sid = this.sid
      // console.log('sid' + this.students.sid)
      this.$store.dispatch('updateStudent', this.students)
    },
    // webSocketInit () { // 初始化
    //   var token = getItem('token')
    //   // const url = '192.168.1.222:8777'
    //   console.log('ws://192.168.1.222:8777/ws?token=' + token)
    //   // this.ws = new WebSocket('ws://' +url);
    //   this.ws = new WebSocket('ws://192.168.1.222:8777/ws?token=' + token)
    //   this.ws.onmessage = this.wsOnmessage
    //   this.ws.onopen = this.wsOnopen
    //   this.ws.onerror = this.wsOnerror
    //   this.ws.onclose = this.wsOnclose
    //   this.over = () => {
    //     this.ws.close()
    //   }
    //   // var that = this;
    //   // this.$router.afterEach(function() {
    //   //   that.ws.close();
    //   // })
    // },
    // wsOnopen () {
    //   console.log('onopen')
    //   this.ws.send(getItem('token'))
    //   // this.ws.send({'Authorizaiton': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IjEiLCJzY2hvb2xJZCI6IjEiLCJ1c2VyTmFtZSI6IjEiLCJleHAiOjE1ODQ1MjA4MzR9.V5n5qmd0Dj6TqVeT_5bT8tdUc8yDbEqhNpJDZOmbvZ8'})
    // },
    // wsOnmessage (e) {
    //   console.log('onmessage:' + e.data)
    // },
    // wsOnerror () {
    //   console.log('onerror')
    // },
    // wsOnclose () {
    //   console.log('onclose')
    // },
    setData (rule, data) {
      if (rule.length) {
        this.currentPage = 1
      }
      this.labelInfo.total = data.length
    }
  }
}
</script>
<style lang="scss" scoped>
    .form{
      // padding: 0 8%;
      font-size: 18px !important;
      // text-align: center;
    }
    .tableHeader{
        background: #eef1f6 !important;
        color: #606266;
        // font-size:14px;
        font-family: 'Courier New', Courier, monospace;
    }
    .table{
        font-size:14px !important;
    }
    .button{
      padding:10px;
      border:solid 1px #f0f0f0;
    }
    // .el-dialog{
    //   width:500px !important;
    // }
    // .el-input__inner{
    //   height:20px !important;
    // }
    .el-dialog__header{
      // padding: 10px;
      background: #6df;
      letter-spacing:2em;
      text-indent:2em;
      .el-dialog__title{
        color:#fff !important;
      }
    }
    .el-dialog--center .el-dialog__body{
      padding:0 !important;
    }
    .el-dialog__body{
      padding:0 !important;
    }
    .pickInput{
      width:120px !important;
      margin:0 8px;
      font-size:12px;
    }
    .dialoger{
      width:500px !important;
      // border:solid 1px;
      background:#f44 !important;
    }
    .el-popup-parent--hidden {
      padding: 0 !important;
    }
    .upload-demo{
      width:300px;
    }
</style>
