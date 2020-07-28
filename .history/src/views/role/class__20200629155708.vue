<template>
  <div
    id="student"
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
        @click="deleteBatch"
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
      <!-- <el-button size="mini" round class="right"><i class="el-icon-search"></i>查询</el-button> -->
      <!-- <el-input class="right" v-model="search" size="mini"
      placeholder="输入关键字搜索"  style="width:180px;" />-->
      <span class="right">
        <label>年级
          <el-select v-model="rule.gradeId" class="pickInput"
           clearable @change="gradeChange"
           placeholder="请选择年级" size="mini" filterable>
            <el-option 
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </label>
        <label>班级{{rule.classId}}
          <el-select v-model="rule.id" class="pickInput"
           clearable 
           placeholder="请选择年级" size="mini" filterable>
            <el-option 
              v-for="item in classList"
              :key="item.id"
              :label="item.className"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <!-- <label style="margin-left:4px;">
        班级
        <el-cascader v-if="showOptions"
          v-model="rule.name"
          class="pickInput"
          size="mini"
          :options="options"
          clearable
          placeholder="请选择班级"
          :props="{expandTrigger: 'hover'}"
          @change="handleChange"
        />
      </label> -->
      <!-- <label>
        班级ID
        <el-input
          v-model="rule.id"
          class="pickInput"
          size="mini"
          placeholder="根据班级id查询"
        />
      </label> -->
      <!-- <label>
        班主任
        <el-input
          v-model="rule.headMaster"
          class="pickInput"
          size="mini"
          placeholder="根据班主任查询"
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
    <!-- dialogVisible 学生添加弹窗 el-dialog -->
    <el-dialog :modal="false"
      custom-class="dialog"
      width="500px"
      top="10vh" v-el-drag-dialog
      :visible.sync="dialogVisible"
      center
      title="添加"
    >
      <el-form :rules="rules" ref="formName"
        class="form refuseCopy"
        size="small" label-position="left"
        :model="classes"
        label-width="100px"
      >
        <el-form-item label="班级内部Id" prop="internalClassId">
          <el-input :autofocus="true"
            v-model="classes.internalClassId"
            style="width:200px" clearable
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="年级" prop="gradeId">
          <el-select clearable filterable v-model="classes.gradeId" placeholder="请选择">
            <el-option
              v-for="item in getGrade"
              :key="item.id"
              :label="item.gradeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="className">
          <el-input clearbale
            v-model="classes.className"
            style="width:200px"
            autocomplete="off" @keydown.native.enter="submit('formName', classes);"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submit('formName', classes)"
          >
            确 定
          </el-button>
          <el-button @click="dialogVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- dialogVisible 班主任添加弹窗 el-dialog -->
    <el-dialog :modal="false"
      custom-class="dialog"
      width="500px"
      top="10vh"
      :visible.sync="headMasterVisible"
      :destroy-on-close="true"
      center
      title="添加班主任"
    >
      <el-form :rules="rules" ref="headMaster"
        class="form refuseCopy"
        size="small" label-position="left"
        :model="headMaster"
        label-width="100px"
      >
        <el-form-item label="班主任" prop="teacherId">
          <el-select clearable filterable v-model="headMaster.teacherId" placeholder="请选择老师">
            <el-option
              v-for="item in getTeachers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="addHeadMaster('headMaster', headMaster)"
          >
            确 定
          </el-button>
          <el-button @click="headMasterVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 学生信息列表 -->
    <div style="height:calc(100% - 80px);">
      <template>
      <el-table
        class="animated fadeIn"
        size="mini"
        row-class-name="table"
        header-cell-class-name="tableHeader"
        :data="sdata" style="background:rgba(243,245,248,0.8);"
        :border="true"
        height="100%"
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
        <el-table-column type="index" align="center" :index="table_index" width="50" label="序数" />
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
          v-for="(v,k,i) in class_"
          :key="i"
          :resizable="true"
          align="center"
          :prop="k"
          :label="v"
        />
        <el-table-column
          align="center"
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="tealButton resetButton"
              icon="el-icon-plus"
              @click="assignMaster(scope.row.id)"
            >班主任
            </el-button>
            <!-- {{scope.row.id}} -->
            <!-- <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              class="resetButton"
              @click="updateVisible = true;"
            >修改</el-button> -->
            <!-- <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              class="resetButton"
              @click="deletes(scope.$index,scope.row)"
            >删除
            </el-button> -->
            <!-- <el-button
              size="mini"
              icon="el-icon-more"
              circle
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
    <!-- 班级信息修改框 -->
    <el-dialog v-el-drag-dialog
      custom-class="dialog"
      width="500px"
      top="10vh" :modal="false"
      :visible.sync="updateVisible"
      center @close="updateClose"
      title="信息修改"
    >
        <el-form :rules="rules" ref="updateClass_"
        class="form refuseCopy"
        size="small" label-position="left"
        :model="classes"
        label-width="100px"
      >
        <el-form-item label="班级内部Id" prop="internalClassId">
          <el-input
            v-model="classes.internalClassId"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="年级" prop="gradeId">
          <el-select filterable v-model="classes.gradeId" placeholder="请选择">
            <el-option
              v-for="item in getGrade"
              :key="item.id"
              :label="item.gradeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="className">
          <el-input
            v-model="classes.className"
            style="width:200px"
            autocomplete="off" @keydown.native.enter="updateClass_('updateClass_', classes);"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="updateClass_('updateClass_', classes);"
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
        level2: '班级管理',
        total: 0
      },
      expands: [], //展开行,
      getRowKey(row) {
        return row.id;
      },
      rowKey: '',
      search: '',
      selection: [],
      dialogVisible: false,
      updateVisible: false,
      headMasterVisible: false,
      headMaster: {

      },
      showOptions: false,
      classId: '', // 修改用户信息所需的classId
      options: this.$store.getters.getOptions, // 班级列表
      classList: [],
      classes: {
        classId: '', // 班级号：唯一ID
        className: "",
        gradeId: "",
        internalClassId: "",
        headMaster: '', // 班主任
        num: '', // 人数
        date: ''
      },
      rules: {
        internalClassId: {required: true, message: '请输入班级内部id', trigger: 'blur'},
        className: {required: true, message: '请输入班名', trigger: 'blur'},
        gradeId: {required: true, message: '请选择所在年级', trigger: 'blur'},
        teacherId: {required: true, message: '班主任为必选项', trigger: 'blur'}
      },
      rule: {
        id: '', // 班级号：唯一ID
        gradeName: '',
        headMaster: '', // 班主任
        gradeId: '',
        pick: function () {
          var pickArr = [];
          for (let i in this) {
            if (this[i] !== '' && typeof this[i] != 'object') {
              pickArr.push(i)
            }
          }
          pickArr.pop();
          return pickArr
        }
      },
      class_: {
        // 学生对象 >> 属性
        gradeName: '年级',
        className: '班级',
        // classTeacherId: '班主任'
      },
      currentPage: 1,
      pageSize: 50
    }
  },
  computed: {
    getGrade() {
      return this.$store.getters.getGrade;
    },
    getTeachers() {
      return this.$store.getters.getTeachers;
    },
    sdata () {
      let data = this.$store.getters.getClasses;
      let rule = this.rule.pick()
      console.log(rule)
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
      console.log(this.pageSize)
      console.log(data);
      return data
    }
  },
  mounted () {
    // this.$store.dispatch('getClassSelect')
    // .then(res => {
    //   this.showOptions = true;
    // })
    this.$store.dispatch('getTeachersInfo');
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
      }
    },
    gradeChange(id) {
      if(id) {
        console.log(id);
        this.$store.dispatch('getClassListByGradeId', id)
        .then(res => {
          console.log(res);
          this.classList = res;
        }).catch(err => {
          console.log(err);
        })
      }else{
        this.classList = [];
      }
    },
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
      console.log('handleChange')
      console.log(e)
      console.log(this.rule)
      if(e.length){
        this.rule.gradeId = e[0];
        this.rule.id = e[1];
      }else{
        this.rule.gradeId = '';
        this.rule.id = '';
      }
      
    },
    clearSearch () {
      this.rule.id = '' // 班级号：唯一ID
      // this.rule.name = ''
      // this.rule.headMaster = '' // 班主任
      this.rule.gradeId = ''
      // this.rule.grade = ''
      // this.rule.name = '';
    },
    sizeChange (val) {
      console.log('sizeChange ' + val)
      this.pageSize = val
    },
    currentChange (val) {
      console.log('currentChage ' + val)
      this.currentPage = val
    },
    assignMaster(id) {
      this.headMaster = {};
      this.headMasterVisible = true;
      this.headMaster.classId = id
    },
    addHeadMaster(form, headMaster) {
      this.$refs[form].validate(valid => {
        if(valid) {
          console.log(headMaster)
          this.$store.dispatch('addHeadMaster', this.headMaster)
          .then(res => {
            this.headMasterVisible = false;
          }).catch(err => {

          })
        }else {
          return false;
        }
      })
    },
    submit (formName, class_) {
      // 提交添加学生信息
      console.log(class_)
      // this.$store.dispatch('addClass_', class_);
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.dialogVisible = false;
          this.$store.dispatch('addClass_', class_)
          .then(() => {
            that.classes = {};
          })
        } else {
          return false;
        }
      });
    },
    deletes (index, row) {
      // 删除班级
      this.$confirm('此操作将永久删除该班级，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {

      }).catch(() => {

      })
    },
    deleteBatch() {
      console.log(this.selection);
      console.log('delteBatch');
      if(this.selection.length){
        this.$confirm('此操作将批量删除信息，是否继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
        }).then(() => {

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
    updateClose() {
      this.classes = {};
      console.log('updateClose')
    },
    updateClass_ (form, classes) {
      // 学生信息修改
      console.log(classes);
      this.$refs[form].validate( valid => {
        if(valid) {
          this.updateVisible = false;
          // this.$store.dispatch('', this.classes)
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
#student{
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
