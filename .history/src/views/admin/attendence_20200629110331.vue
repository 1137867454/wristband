<template>
  <div
    id="grade"
    class="wrapper"
  >
    <!-- 箭头盒子 -->
    <labelTop
      :label-info="labelInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <div class="button clearfix">
      <!-- <el-button
        size="mini"
        type="primary"
        round
        @click="dialogVisible = true"
      >
        <i class="" />考勤添加
      </el-button>
      <el-button
        size="mini"
        type="success"
        round @click="attendVisible = true"
      >
        <i />类型添加
      </el-button>
      <el-button
        size="mini"
        type="danger"
        round
        @click="deleteBatch"
      >
        <i class="el el-icon-delete" />删除
      </el-button> -->
      <span class="right">
        <label>
          日期
          <el-date-picker style="width:140px;margin:0 6px;"
            v-model="rule.dateInfo" value-format="yyyy-MM-dd"
            type="date" size="mini" format="yyyy-MM-dd"
            placeholder="选择日期" @change="dateChange">
          </el-date-picker>
        </label>
      <!-- <label>
        班级ID
        <el-input
          v-model="rule.cid"
          class="pickInput"
          size="mini"
          placeholder="根据班级id查询"
        />
      </label> -->
      <el-button
        type="primary"
        size="mini"
        round
        @click="clearSearch"
      >
        清空
      </el-button>
      </span>
    </div>
    <!-- dialogVisible 考勤添加弹窗 el-dialog -->
    <el-dialog :modal="false"
      custom-class="dialog"
      width="500px"
      top="10vh"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      center
      title="考勤添加"
    >
      <el-form :rules="rules"
        class="form refuseCopy"
        size="small" ref="new_Attendence"
        :model="new_Attendence"
        label-width="100px"
      >
        <el-form-item label="考勤名目" prop="name">
          <el-input
            v-model="new_Attendence.name"
            style="width:220px"
            autocomplete="off" 
          />
        </el-form-item>
        <el-form-item label="考勤类型" prop="typeId">
          <el-select style="width:220px;" v-model="new_Attendence.typeId" clearable placeholder="请选择">
          <el-option
            v-for="item in attend_Type"
            :key="item.id"
            :label="item.typeName"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="考勤日期" prop="dateInfo">
          <el-date-picker
            :picker-options="pickerLimit"
            v-model="new_Attendence.dateInfo"
            type="date" value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="起始时间" prop="startTime">
          <el-time-picker value-format="HH:mm:ss"
          v-model="new_Attendence.startTime"
          placeholder="选择日期时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-time-picker  value-format="HH:mm:ss"
          v-model="new_Attendence.endTime"
          placeholder="选择日期时间" >
          </el-time-picker>
        </el-form-item>
        <!-- <el-form-item label="考勤名目">
          <el-input
            v-model="new_Attendence.name"
            style="width:200px"
            autocomplete="off" 
          />
        </el-form-item> -->
        <el-form-item label="备注" prop="comment">
          <el-input style="width:220px;" v-model="new_Attendence.comment"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submit('new_Attendence', new_Attendence)"
          >
            确 定
          </el-button>
          <el-button @click="dialogVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>



    <!-- 考勤类型添加 -->
    <el-dialog :modal="false"
      custom-class="dialog"
      width="500px"
      top="10vh"
      :visible.sync="attendVisible"
      :destroy-on-close="true"
      center
      title="考勤类型添加"
    >
      <el-form ref="addAttendence"
        class="form refuseCopy"
        size="small" :rules="rules"
        :model="attendence_type"
        label-width="100px"
      >
        <el-form-item label="起始过渡" prop="startTransitTime">
          <el-input style="width:200px;" v-model="attendence_type.startTransitTime" placeholder="过渡时间"></el-input>
          <!-- <div class="block">
            <el-date-picker
              v-model="attendence_type.startTransitTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div> -->
        </el-form-item>
        <el-form-item label="结束过渡" prop="endTransitTime">
          <el-input style="width:200px;" v-model="attendence_type.endTransitTime" placeholder="过渡时间"></el-input>
          <!-- <el-date-picker
              v-model="attendence_type.endTransitTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker> -->
        </el-form-item>
        <el-form-item label="考勤名称" prop="typeName">
          <el-input
            v-model="attendence_type.typeName"
            style="width:200px;"
            autocomplete="off" 
          />
        </el-form-item>
        <el-form-item label="考勤对象" prop="userType">
          <el-select v-model="attendence_type.userType" clearable placeholder="请选择">
            <el-option
              v-for="item in user"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="addAttendence('addAttendence', attendence_type)"
          >
            确 定
          </el-button>
          <el-button @click="attendVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 考勤信息列表 -->
    <div style="height:calc(100% - 80px);">
      <template>
      <el-table
        class="animated fadeInUp"
        size="mini" height="100%"
        row-class-name="table"
        header-cell-class-name="tableHeader"
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
        <el-table-column align="center" :index="table_index" label="序号" width="60" type="index">

        </el-table-column>
         <el-table-column type="expand" width="30">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="创建人">
            <span>{{ props.row.createUser }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ props.row.createTime }}</span>
          </el-form-item>
          <el-form-item label="起始过渡时间">
            <span>{{ props.row.startTransitTime }}</span>
          </el-form-item>
          <el-form-item label="结束过渡时间">
            <span>{{ props.row.endTransitTime }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
        <el-table-column
          v-for="(v,k,i) in grade_"
          :key="i"
          :resizable="true"
          align="center"
          :prop="k"
          :label="v"
        />
        <!-- <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createTime.substring(0, scope.row.createTime.length - 3)}}
          </template>
        </el-table-column> -->
        <el-table-column align="center" width="100" label="起始时间">
          <template slot-scope="scope">
            {{scope.row.startTime.substring(0, scope.row.startTime.length - 3)}}
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="结束时间">
          <template slot-scope="scope">
            {{scope.row.endTime.substring(0, scope.row.endTime.length - 3)}}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="考勤日期">
          <template slot-scope="scope">
            {{scope.row.dateInfo.substring(0, scope.row.dateInfo.length - 3)}}
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          label="操作"
          width="80"
        >
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="updateVisible = true;cid = scope.row.cid"
            />
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deletes(scope.row.id)"
            /> -->
            <el-button
              size="mini"
              class="resetButton tealButton"
              icon="el-icon-more"
              @click="more(scope.row.id)"
            >详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    </div>
    <!-- 年级信息修改框 -->
    <!-- <el-dialog
      custom-class="dialog"
      width="500px"
      top="10vh" :modal="false"
      :visible.sync="updateVisible"
      :destroy-on-close="true"
      center
      title="添加"
    >
      <el-form
        class="form refuseCopy"
        size="small"
        :model="grade"
        label-width="100px"
      >
        <el-form-item label="年级">
          <el-input
            v-model="grade.grade"
            style="width:120px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="班级">
          <el-input
            v-model="grade.class"
            style="width:120px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="入学日期">
          <el-date-picker
            v-model="grade.date"
            align="right"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="updateVisible = false;updategrade_"
          >
            确 定
          </el-button>
          <el-button @click="updateVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>
<script>
import labelTop from '../../components/label'
export default {
  name: 'Class',
  components: {
    labelTop
  },
  data () {
    return {
      labelInfo: {
        avatar: 'el-icon-user',
        level1: '管理中心',
        level2: '考勤管理',
        total: 0,
        currentPage: 1
      },
      expands: [], //展开行,
      getRowKey(row) {
        return row.id;
      },
      user: [{
        label: '学生',
        value: 'student'
      },
      {
        label: '教师',
        value: 'teacher'
      }],
      rowKey: '',
      search: '',
      selection: [],
      dialogVisible: false,
      attendVisible: false,
      updateVisible: false,
      classId: '', // 修改用户信息所需的classId
      options: this.$store.getters.getOptions, // 班级列表
      pickerLimit: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 8.64e7 ;
// (
//             time < new Date(this.form.cooperationBegin + " 00:00:00") ||
//             time > new Date(this.form.cooperationEnd + " 00:00:00")
//             );
        }
      },
      attendence_type: { // 考勤类型
        "endTransitTime": '',
        "startTransitTime": '',
        "typeName": "",
        "userType": ""
      },
      new_Attendence: {
        "comment": "", //备注
        "dateInfo": "",//考勤日期 YYYY-MM-DD
        "name": "",    //考勤名称
        "typeId": "",         //考勤类型Id
        "startTime": "", //考勤开始时间 HH:MM:SS
        "endTime": ""  //考勤结束时间 HH:MM:SS
      },
       rules: { // 添加限制
        endTransitTime: { required: true, message: '请输入过渡时间', trigger: 'blur' },
        startTransitTime: { required: true, message: '请输入过渡时间', trigger: 'blur' },
        typeName: { required: true, message: '请输入考勤名目', trigger: 'blur' },
        userType: { required: true, message: '请输入考勤对象', trigger: 'blur' },
        comment: { required: true, message: '请输入备注', trigger: 'blur' },
        dateInfo: { required: true, message: '请输入日期', trigger: 'blur' },
        name: { required: true, message: '请输入考勤名目', trigger: 'blur' },
        typeId: { required: true, message: '请选择考勤对象', trigger: 'blur' },
        startTime: { required: true, message: '请选择开始时间', trigger: 'blur' },
        endTime: { required: true, message: '请选择结束时间', trigger: 'blur' }
        
      },
      rule: {
        classId: '', // 班级号：唯一ID
        name: '',
        headMaster: '', // 班主任
        grade: '',
        num: '', // 人数
        dateInfo: new Date().Format("yyyy-MM-dd"), // 日期
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
      grade_: {
        // 学生对象 >> 属性
        // id: 'id',
        // classId: '班级ID', // 班级号：唯一ID
        // gradeId: '年级id',
        // grade: '年级',
        name: '考勤',
        typeName: '考勤名称',
        // userType: '考勤对象',
        // comment: '备注',
        // createTime: '创建时间',
        // startTime: '起始时间',
        // endTime: '结束时间',
        dateInfo: '考勤日期',
        // gradeName: '年级',
        // headMaster: '年级主任', // 年级主任
        // num: '人数', // 人数
        // date: '创建日期'
      },
      currentPage: 1,
      pageSize: 50
    }
  },
  computed: {
    sdata () {
      console.log('sdata触发')
      let data = this.$store.getters.get_ClockList;
      // console.log(data[400].dateInfo)
      // console.log(this.rule['dateInfo'])
      let rule = this.rule.pick();
      console.log(rule);
      rule.forEach(e => {
        if(this.rule[e]){
          data = data.filter((v, i) => {
            return v[e].includes(this.rule[e])
          })
        }
      })
      this.setData(rule, data);
      console.log('this.currentPage '+this.currentPage)
      var prev = (this.currentPage - 1) * this.pageSize
      console.log(prev)
      data = data.slice(prev, this.pageSize + prev)
      console.log(this.pageSize)
      console.log(data);
      return data;
    },
    attend_Type() {
      return this.$store.getters.get_TypeList;
    },
    get_ClockList() {
      return this.$store.getters.get_ClockList;
    }
  },
  mounted () {
    // this.rule.dateInfo = new Date().Format("yyyy-MM-dd")
    this.$store.dispatch('getClockInList');
    this.$store.dispatch('getClockInTypeList')
  },
  beforeDestroy () {
  },
  methods: {
    select (selection, row) {
      // 单选
      this.selection = selection
      console.log(this.selection)
    },
    selectAll (selection) {
      // 多选
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
        // this.expands.push(row.id);
      }
    },
    //翻页后序号连续
    table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
    },
    handleSizeChange (val) {
      // 分页数量改变
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // 当前页切换
      console.log(`当前页: ${val}`)
    },
    dateChange (e) {
      console.log(e);
      console.log('dateChange触发')
      this.currentPage = 1;
      this.labelInfo.currentPage = 1;
      // console.log(this.currentPage)
      // console.log(this.pageSize)
      // console.log(this.labelInfo.total)
    },
    clearSearch () {
      this.rule.classId = '' // 班级号：唯一ID
      this.rule.name = ''
      this.rule.dateInfo = '' // 班主任
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
    submit (new_Attendence, attendence) {
      // 考勤类型添加：
      let that = this;
      this.$refs[new_Attendence].validate((valid) => {
        if (valid) {
          that.dialogVisible = false;
          this.$store.dispatch('clockListAdd', attendence)
          .then(() => {
            that.new_Attendence = {};
          })
        } else {
          return false;
        }
      });
    },
    addAttendence(formName, item) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.attendVisible = false;
          this.$store.dispatch('clockListAdd', item)
          .then(() => {
            that.attendence_type = {};
          })
        } else {
          return false;
        }
      });
    },
    more(id) {
      this.$router.push('/check/classAttendance')
    },
    deletes (id) {
    // 删除学生
    this.$confirm('此操作将删除改考勤表，是否继续？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
      }).then(() => {
        console.log('continue')
      }).catch(() =>{

      })
    },
    deleteBatch() {
      if(this.selection.length){
          this.$confirm('此操作将批量删除信息，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
          }).then(() => {
            console.log('deleteBatch')
          }).catch(() => {
    
          })
        }else{
          this.$message({
            message: '请选中至少一条数据',
            type: 'error',
            duration: 1500
          })
        }
    },
    updategrade_ () {
      // 学生信息修改
      this.classes.cid = this.cid
      // console.log('cid' + this.classes.cid)
      this.$store.dispatch('updategrade_', this.classes)
    },
    setData (rule, data) {
      // if (rule.length) {
      //   this.currentPage = 1
      // }
      this.labelInfo.total = data.length
    }
  }
}
</script>
<style lang="scss" scoped>
#grade{
  // background:rgba(240,240,240,0.8);
  box-shadow: -2px 2px 6px #fff;
}
.form {
  padding: 0 8%;
  // font-size: 12px !important;
  // text-align: center;
}
.tableHeader {
  background: #eef1f6 !important;
  color: #606266;
  // font-size:14px;
  font-family: "Courier New", Courier, monospace;
}
.table {
  font-size: 14px !important;
  // overflow-y: auto;
}
.button {
  padding: 6px;
  border: solid 1px #f0f0f0;
  // box-shadow: 0 0px 2px #f0f0f0;
}
.el-dialog__header {
  // padding: 10px;
  background: #6df;
  letter-spacing: 2em;
  text-indent: 2em;
  .el-dialog__title {
    color: #fff !important;
  }
}
.el-dialog__headerbtn {
  top: 16px;
  .el-dialog__close {
    color: #fff !important;
  }
}
.el-form-item__label {
  // font-size: 16px;
}
.el-input {
  // font-size: 16px;
}
.pickInput {
  width: 118px !important;
  margin: 0 6px;
  font-size: 12px;
}
.resetButton{
padding:8px 10px;border:none;
}
.tealButton{
  background:teal;color:#fff;
  &:hover{
    background:rgba($color: teal, $alpha: 0.7);
    color:#fff;
  }
}
</style>
