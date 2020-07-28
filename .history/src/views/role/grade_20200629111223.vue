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
    <div class="button">
      <el-button
        size="mini"
        type="primary"
        round
        @click="dialogVisible = true"
      >
        <i class="el el-icon-circle-plus-outline" />添加
      </el-button>
      <!-- <el-button
        size="mini"
        type="danger"
        round
        @click="deleteBatch"
      >
        <i class="el el-icon-delete" />删除
      </el-button> -->
      <el-button
        size="mini"
        type="success"
        round
      >
        <i class="el el-icon-finished" />升级
      </el-button>
      <!-- <el-button size="mini" round class="right"><i class="el-icon-search"></i>查询</el-button> -->
      <!-- <el-input class="right" v-model="search" size="mini"
      placeholder="输入关键字搜索"  style="width:180px;" />-->
      <span class="right">
        <label style="margin-left:4px;">
        年级
        <el-select v-model="rule.id" class="pickInput" clearable
           placeholder="请选择年级" size="mini">
            <el-option 
              v-for="item in getOptions"
              :key="item.id"
              :label="item.gradeName"
              :value="item.id">
            </el-option>
          </el-select>
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
      <label>
        年级主任
        <el-input
          v-model="rule.headMaster"
          class="pickInput"
          size="mini"
          placeholder="根据班主任查询"
        />
      </label>
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
    <!-- dialogVisible 学生添加弹窗 el-dialog -->
    <el-dialog :modal="false"
      custom-class="dialog"
      width="500px"
      top="10vh" :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :destroy-on-close="false"
      center title="添加"
    >
      <el-form :rules="rules" ref="ruleForm"
        class="form refuseCopy"
        size="small"
        :model="grade"
        label-width="100px"
      >
        <el-form-item label="年级" prop="gradeName">
          <el-input
            v-model="grade.gradeName"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="上年级" prop="nextGradeId">
          <el-select v-model="grade.nextGradeId" placeholder="请选择">
            <el-option
              v-for="item in getGrade"
              :key="item.id"
              :label="item.gradeName"
              :value="item.id">
            </el-option>
          </el-select>
          <!-- <el-input
            v-model="grade.nextGradeId"
            style="width:120px"
            autocomplete="off" @keydown.native.enter="submit(grade);dialogVisible = false;"
          /> -->
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submit('ruleForm', grade)"
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
        <el-table-column align="center" type="index" :index="table_index" width="50" label="序数" >
          <!-- <template slot-scope="scope">
            {{scope.$index}}
          </template> -->
        </el-table-column>
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
          v-for="(v,k,i) in grade_"
          :key="i"
          :resizable="true"
          align="center"
          :prop="k"
          :label="v"
        />
        <!-- <el-table-column align="center" prop="name" :label="Object.values(grade_)"></el-table-column>
            <el-table-column align="center" prop="sex" :label="Object.values(grade_)"></el-table-column>
            <el-table-column align="center" prop="class" :label="Object.values(grade_)"></el-table-column>
            <el-table-column align="center" prop="date" :label="Object.values(grade_)"></el-table-column>
            <el-table-column align="center" prop="address" :label="Object.values(grade_)"></el-table-column>
        <el-table-column align="center" prop="address" :label="Object.values(grade_)"></el-table-column>-->
        <el-table-column
          align="center"
          label="操作"
          width="160"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              round
              @click="updateVisible = true;cid = scope.row.cid"
            />
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              round
              @click="deletes(scope.row.id)"
            />
            <!-- <el-button
              size="mini"
              type="info"
              icon="el-icon-more"
              round
            /> -->
            <!-- <el-button size="mini" type="primary"  round>编辑</el-button>
              <el-button size="mini" type="danger" round>删除</el-button>
            <el-button size="mini" type="info" round>详情</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- {{sdata}} -->
    </template>
    </div>
    <!-- 年级信息修改框 -->
    <el-dialog
      custom-class="dialog"
      width="500px"
      top="10vh" :modal="false"
      :visible.sync="updateVisible"
      :destroy-on-close="true"
      center @close="beforeClose"
      title="修改"
    >
      <el-form :rules="rules"
        class="form refuseCopy"
        size="small" ref="updateGrade"
        :model="grade"
        label-width="100px"
      >
      
        <el-form-item label="年级" prop="gradeName">
          <el-input
            v-model="grade.gradeName"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="上年级" prop="nextGradeId">
          <el-select v-model="grade.nextGradeId" placeholder="请选择">
            <el-option
              v-for="item in getGrade"
              :key="item.id"
              :label="item.gradeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="updateGrade_('updateGrade', grade)"
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
        level1: '用户管理',
        level2: '年级管理',
        total: 0
      },
      expands: [], //展开行,
      getRowKey(row) {
        return row.id;
      },
      showOptions: false,
      rowKey: '',
      search: '',
      selection: [],
      dialogVisible: false,
      updateVisible: false,
      classId: '', // 修改用户信息所需的classId
      options: this.$store.getters.getOptions, // 班级列表
      grade: {
        classId: '', // 班级号：唯一ID
        name: '',
        headMaster: '', // 班主任
        gradeName: "",
        nextGradeId: '',
        grade: '',
        num: '', // 人数
        date: '',
        // pick: function () {
        //   var pickArr = []
        //   for (let i in this) {
        //     if (this[i] !== '') {
        //       pickArr.push(i)
        //     }
        //   }

        //   pickArr.pop()
        //   return pickArr
        // }
      },
      rules: {
        gradeName: { required: true, message: '请输入新增年级', trigger: 'blur' },
        nextGradeId: { required: true, message: '请输入上一年级', trigger: 'blur' },
      },
      rule: {
        // classId: '', // 班级号：唯一ID
        id: '',
        // name: '',
        headMaster: '', // 班主任
        // gradeId: '',
        num: '', // 人数
        date: '', // 手环编号
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
        gradeName: '年级',
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
      let data = this.$store.getters.getGrade;
      let rule = this.rule.pick()
      if (rule.length) {
        this.currentPage = 1
      }
      rule.forEach(e => {
        data = data.filter((v, i) => {
          if(v[e] != null){
            return v[e].includes(this.rule[e])
          }
        })
      })
      this.setData(rule, data)
      var prev = (this.currentPage - 1) * this.pageSize
      data = data.slice(prev, this.pageSize + prev)
      // console.log(this.pageSize)
      console.log(data);
      return data;
    },
    getOptions() {
      return this.$store.getters.getGrade;
    },
    getGrade() {
      let grade = [...this.$store.getters.getGrade];
      // grade.find(v => {
      //   v.id
      // })
      grade.unshift({id: '0', gradeName: '无'});
      return grade;
    }
  },
  mounted () {
    // this.$store.dispatch('GradeList');
    // this.$store.dispatch('getClassSelect')
    // .then(res => {
    //   this.showOptions = true;
    //   this.res = res
    // })
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
    handleChange (e) {
      // console.log(e)
    },
    clearSearch () {
      this.rule.id = '' // 班级号：唯一ID
      // this.rule.name = ''
      this.rule.headMaster = '' // 班主任
      // this.rule.grade = ''
    },
    sizeChange (val) {
      console.log('sizeChange ' + val)
      this.pageSize = val
    },
    currentChange (val) {
      console.log('currentChage ' + val)
      this.currentPage = val
    },
    submit (formName, grade_) {
      // 提交添加学生信息
      console.log(grade_)
      // this.$store.dispatch('addgrade_', grade_)
      // this.$store.dispatch('addGrade', grade_)
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.$store.dispatch('addGrade', grade_)
          .then(() => {
            that.grade = {};
          })
        } else {
          return false;
        }
      });
    },
    deletes (id) {
      // 删除年级
      this.$confirm('此操作将删除该年级，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
          console.log('go on')
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
    beforeClose() {
      this.grade = {};
    },
    updateGrade_ (form, grade) {
      // 年级信息修改
      console.log(grade);
      this.$refs[form].validate(valid => {
        if(valid) {
          // this.$store.dispatch('updategrade_', this.classes)
          this.updateVisible = false;
        }else{
          return false;
        }
      })
    },
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
#grade{
  // background:rgba(240,240,240,0.8);
  box-shadow: -2px 2px 6px #fff;
}
.form {
  padding: 0 8%;
  font-size: 18px !important;
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
  font-size: 16px;
}
.el-input {
  font-size: 16px;
}
.pickInput {
  width: 118px !important;
  margin: 0 6px;
  font-size: 12px;
}
</style>
