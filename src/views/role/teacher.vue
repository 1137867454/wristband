<template>
  <div
    id="teacher"
    class="wrapper" style=""
  >
    <labelTop
      :label-info="labelInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <div
      class="button"
      style="border:solid 1px #f1f2f3;height:calc(100% - 36px); "
    >
      <div style="padding:8px;">
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
      <!-- <el-button size="mini" round class="right"><i class="el-icon-search"></i>查询</el-button> -->
      <span class="right">
        <!-- <label v-if="showOptions" style="margin-left:16px;">
          班级
          <el-cascader
            v-model="classroom"
            class="pickInput"
            size="mini"
            :options="getOptions"
            clearable
            placeholder="请选择班级"
            :props="{checkStrictly: true }"
            @change="handleChange_"
          />
        </label> -->
        <label>
          科目
          <el-input
            v-model="rule.teacherType"
            class="pickInput"
            size="mini" clearable
            placeholder="根据科目查询"
          />
        </label>
        <label>
          姓名
          <el-input clearable
            v-model="rule.name"
            class="pickInput"
            size="mini"
            placeholder="请输入姓名"
          />
        </label>
        <!-- <el-input class="right" v-model="search" size="mini"
          placeholder="输入关键字搜索"  style="width:180px;" />
      </div>-->
        <el-button
          type="primary"
          size="mini"
          round
          @click="clearSearch"
        >清空</el-button>
      </span>
      </div>

<!-- dialogVisible 教师添加弹窗 el-dialog -->
    <el-dialog v-el-drag-dialog
      custom-class="dialog animated fadeIn"
      width="500px"
      top="8vh" :close-on-click-modal="false"
      :modal="false"
      :visible.sync="dialogVisible"
      center
      title="添加"
    >
      <el-form :rules="dialogInfo.rules" ref="ruleForm"
        class="form refuseCopy" style="margin-left:50px;"
        size="small" label-position="left"
        :model="teacherInputDTO"
        label-width="90px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input maxlength="6" show-word-limit
            v-model="teacherInputDTO.name"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <!-- <el-form-item label="性别">
          <el-radio
            v-model="teacherInputDTO.gender"
            :label="1"
          >
            男
          </el-radio>
          <el-radio
            v-model="teacherInputDTO.gender"
            :label="2"
          >
            女
          </el-radio>
        </el-form-item> -->
        <!-- <el-form-item label="照片上传">
          <el-upload :class="['animated','fadeIn',hideUpload?'hide':'']"
            action="#" :limit="1" :auto-upload="false"
            list-type="picture-card"
            :on-change="photoChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item> -->
        <el-form-item label="用户名" >
          <el-input
            v-model="teacherInputDTO.account"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" >
          <el-input type="password" show-password
            v-model="teacherInputDTO.password"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="课程/工作" prop="teacherType">
          <el-input
            v-model="teacherInputDTO.teacherType"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input maxlength="11" show-word-limit
            v-model="teacherInputDTO.phone"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label-width="0">
          <el-upload 
            class="upload-demo"
            action="" style="width:280px;margin:-10px 0 10px;"
            :on-change="photoChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            list-type="picture">
            <el-button size="small" type="primary">图片上传</el-button>
            <div slot="tip" class="el-upload__tip" style="position:absolute;top:-16px;right:100px; ">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-dialog
         :visible.sync="photoVisible" :modal="false">
          <img width="100%" :src="photoImageUrl" alt="">
        </el-dialog>
        <!-- <el-form-item label="年龄" :class="hideUpload?'age_margin_distance':''">
          <el-input maxlength="2" show-word-limit
            v-model="teacherInputDTO.age"
            style="width:200px;"
            autocomplete="off"
          />
        </el-form-item> -->
        <!-- <el-form-item label="年级&班级">
          <el-cascader
            v-model="teacherInputDTO.classroom"
            size="mini"
            :options="getOptions"
            clearable
            placeholder="请选择年级&班级"
            :props="{checkStrictly: true }"
            @change="handleChange"
          />
        </el-form-item> -->
        
        
        
        <el-form-item>
          <el-button
            type="primary"
            @click="submit('ruleForm',teacherInputDTO)"
          >
            确 定
          </el-button>
          <el-button @click="dialogVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
<!-- dialogVisible 教师信息修改弹窗 el-dialog -->
    <el-dialog
      custom-class="dialog animated fadeIn"
      width="500px" v-el-drag-dialog
      top="8vh" :close-on-click-modal="false"
      :modal="false"
      :visible.sync="updateVisible"
      @close="dialogClose"
      center
      title="信息修改"
    >
      <el-form  :rules="dialogInfo.rules" ref="updateForm"
        class="form refuseCopy" style="margin-left:50px;"
        size="small" label-position="left"
        :model="teacherInputDTO"
        label-width="90px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input maxlength="6" show-word-limit
            v-model="teacherInputDTO.name"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <!-- <el-form-item label="性别">
          <el-radio
            v-model="teacherInputDTO.gender"
            :label="1"
          >
            男
          </el-radio>
          <el-radio
            v-model="teacherInputDTO.gender"
            :label="2"
          >
            女
          </el-radio>
        </el-form-item> -->
        <!-- <el-form-item label="用户名" >
          <el-input
            v-model="teacherInputDTO.account"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" >
          <el-input type="password" show-password
            v-model="teacherInputDTO.password"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item> -->
        <el-form-item label="课程/工作" prop="teacherType">
          <el-input
            v-model="teacherInputDTO.teacherType"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input maxlength="11" show-word-limit
            v-model="teacherInputDTO.phone"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <!-- <el-form-item label-width="0">
          <el-upload 
            class="upload-demo"
            action="" style="width:280px;margin:-10px 0 10px;"
            :on-change="photoChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            list-type="picture">
            <el-button size="small" type="primary">图片上传</el-button>
            <div slot="tip" class="el-upload__tip" style="position:absolute;top:-16px;right:100px; ">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item> -->
        <!-- <el-dialog :visible.sync="photoVisible" :modal="false">
          <img width="100%" :src="photoImageUrl" alt="">
        </el-dialog> -->
        <!-- <el-form-item label="年龄" :class="hideUpload?'age_margin_distance':''">
          <el-input maxlength="2" show-word-limit
            v-model="teacherInputDTO.age"
            style="width:200px;"
            autocomplete="off"
          />
        </el-form-item> -->
        <!-- <el-form-item label="年级&班级">
          <el-cascader
            v-model="teacherInputDTO.classroom"
            size="mini"
            :options="getOptions"
            clearable
            placeholder="请选择年级&班级"
            :props="{checkStrictly: true }"
            @change="handleChange"
          />
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="primary"
            @click="updateTeacher('updateForm',teacherInputDTO)"
          >
            确 定
          </el-button>
          <el-button @click="updateVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

      <div style="height:calc(100% - 48px);">
        <el-table
        class="animated fadeInUp"
        size="mini" height="100%"
        row-class-name="table"
        header-cell-class-name="tableHeader"
        :data="pickUp"
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
         <el-table-column type="index" align="center" :index="table_index" width="70" label="序数" />
        <el-table-column type="expand" width="24">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="姓名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column :resizable="true" v-for="(v,k,i) in teacher" align="center" :prop="k" :label="v" v-bind:key="i"></el-table-column>
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
            round @click="updateAssign(scope.row)"
          />
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            round @click="deletes(scope.row.id)"
          />
          </template>
          <!-- <el-button
            size="mini"
            type="info"
            icon="el-icon-more"
            round
          /> -->
        </el-table-column>
      </el-table>
      </div>
      <!-- <dialogDefined :dialogInfo='dialogInfo'>
        <template v-slot:message>
          <el-form-item label="姓名" prop="name">
            <el-input size="mini" style="width:200px;"
             v-model="dialogInfo.submits.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
          <el-radio
            v-model="dialogInfo.submits.gender"
            label="1"
          >
            男
          </el-radio>
          <el-radio
            v-model="dialogInfo.submits.gender"
            label="2"
          >
            女
          </el-radio>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input maxlength="2" show-word-limit
            v-model="dialogInfo.submits.age"
            style="width:200px;"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="年级&班级">
          <el-cascader
            v-model="dialogInfo.submits.classroom"
            size="mini"
            :options="getOptions"
            clearable
            placeholder="请选择年级&班级"
            :props="{checkStrictly: true }"
          />
        </el-form-item>
        
        <el-form-item label="用户名" prop="account">
          <el-input
            v-model="dialogInfo.submits.account"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" show-password
            v-model="dialogInfo.submits.password"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="课程/工作" prop="teacherType">
          <el-input
            v-model="dialogInfo.submits.teacherType"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input maxlength="11" show-word-limit
            v-model="dialogInfo.submits.phone"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        </template>
      </dialogDefined> -->
    </div>
  </div>
</template>
<script>
import dialogDefined from '../../components/dialog/dialog'
import labelTop from '../../components/label'
import axios from 'axios'
export default {
  name: 'Teacher',
  components: {
    labelTop,
    dialogDefined
  },
  data () {
    return {
      fileList: {},
      showOptions: false,
      updateVisible: false,
      labelInfo: {
        avatar: 'el-icon-user',
        level1: '用户管理',
        level2: '教师管理',
        total: 0
      },
      dialogInfo: {
        Visible: false,
        title: '修改',
        submits: {
        },
        triggerFunction: '',
        rules: { // 添加限制
          name: { required: true, message: '请输入老师姓名', trigger: 'blur' },
          account: { required: true, message: '请输入用户名', trigger: 'blur' },
          password: { required: true, message: '请输入老师密码', trigger: 'blur' },
          teacherType: { required: true, message: '请输入工作类型', trigger: 'blur' },
          phone: { required: true, message: '请输入其联系方式', trigger: 'blur' }
        }
      },
      expands: [], //展开行,
      getRowKey(row) {
        return row.id;
      },
      rowKey: '',
      selection: [],
      currentPage: 1,
      pageSize: 50,
      dialogVisible: false,
      search: '', // 用户索引
      options: this.$store.getters.getOptions, // 班级列表
      // wristbandData: this.$store.getters.getWristData,
      classroom: '',
      rule: { // 筛选规则
        name: '',
        teacherType: '',
        cardId: '',
        classId: '',
        gradeId: '',
        wristId: '', // 手环编号
        pick: function () {
          var pickArr = []
          for (let i in this) {
            if (this[i] !== '' && typeof this[i] != 'object') {
              pickArr.push(i)
            }
          }
          pickArr.pop()
          return pickArr
        }
      },
      photoImageUrl: '',
      photoVisible: false,
      hideUpload: false,
      fileList: [],
      teacher: {
        // 老师对象 >> 属性
        // "id": "ID",
        "name": "姓名",
        "teacherType": "学科",
        "account": "账号",
        // "password": "密码",
        // "faceFile": "照片",
        "phone": "电话",
        // tid: '教师id',
        // name: '姓名',
        // sex: '性别',
        // age: '年龄',
        // teacherType: 'chinese',
        // classroom: '班级',
        // address: '位置',
        // date: '入学时间'
        // id: '序号',
        // teacherCode: '教师ID',
        // teacherName: '姓名',
        // teacherInfo: '基本信息',
        // teacherWord: '介绍',
        // gender: '年级',
        // phone: '联系电话',
        // schoolId: '学校ID',
        // account: '账户'
      },
      teacherInputDTO : {
        // teacherCode: '',
        // teacherName: '',
        // teacherInfo: '',
        // teacherWord: '',
        // gender: '',
        // phone: '',
        // schoolId: '',
        // account: '',
        "account": "",
        "faceFile": "",
        "name": "",
        "password": "",
        "phone": "",
        "teacherType": ""
      },
      teacherData: this.$store.getters.getTeachers
    }
  },
  computed: {
    getOptions() {
      return this.$store.getters.getOptions;
    },
    pickUp () {
      let data = this.$store.getters.getTeachers;
      let rule = this.rule.pick()
      if (rule.length) {
        this.currentPage = 1
      }
      console.log(rule);
      console.log(this.rule.teacherType)
      rule.forEach(e => {
        data = data.filter((v, i) => {
          if(v[e])
          return v[e].includes(this.rule[e])
        })
      })
      this.setData(rule, data);
      var prev = (this.currentPage - 1) * this.pageSize
      // this.labelInfo.total = data.length
      data = data.slice(prev, this.pageSize + prev)
      console.log(this.pageSize)
      // console.log(data);
      return data
    }
  },
  beforeMount () {
    this.$store.dispatch('getTeachersInfo');
  },
  mounted() {
    this.$store.dispatch('getClassSelect')
    .then(res => {
      this.showOptions = true;
    })
    // if(this.getOptions && this.getOptions.length) {
    //   this.showOptions = true;
    // }
  },
  methods: {
    setData (rule, data) {
      if (rule.length) {
        console.log('currentPage')
        this.currentPage = 1
      }
      this.labelInfo.total = data.length
    },
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
    sizeChange (val) {
      console.log('sizeChange ' + val)
      this.pageSize = val
    },
    currentChange (val) {
      console.log('currentChage ' + val)
      this.currentPage = val
    },
    handleChange (arr) { // 教师添加选框
      console.log(arr);
      if(arr && arr.length) {
        if(arr.length > 1) {
          this.teacherInputDTO.gradeId = arr[0];
          this.teacherInputDTO.classId = arr[1];
        }else{
          this.teacherInputDTO.gradeId = arr[0];
        }
      }
    },
    handleChange_ (arr) { // 教师筛选选框
      console.log(arr);
      if(arr && arr.length) {
        if(arr.length > 1) {
          this.rule.gradeId = arr[0];
          this.rule.classId = arr[1];
        }else{
          this.rule.gradeId = arr[0];
        }
      }else{
        this.rule.gradeId = '';
        this.rule.classId = '';
      }
      console.log(this.rule)
    },
    clearSearch () {
      this.classroom = '';
      this.rule.gradeId = '';
      this.rule.classId = '';
      this.rule.teacherType = '';
      this.rule.name = '';
    },
    handleRemove(file, fileList) { //照片移除回调
        console.log(file, fileList);
        // this.hideUpload = false;
        this.fileList = {};
      },
    handlePreview(file) { //
      console.log(file);
      this.photoImageUrl = file.url;
      this.photoVisible = true;
    },
    photoChange(file) {
      console.log(file)
      this.fileList = file;
      // this.hideUpload = true;
    },
    submit (formName, teacher) { // 提交添加教师信息
    let that = this;
    console.log(teacher)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let file = this.fileList.raw;
          console.log(file)
          let formData = new FormData();
          if(this.fileList.name) {
            formData.append('file', file);
            this.$store.dispatch('uploadImage', formData)
            .then(res => {
              console.log(res)
              teacher.faceFileId = res;
              console.log(teacher);
              this.$store.dispatch('addTeacher', teacher)
              .then(() => {
                this.dialogVisible = false;
                that.teacherInputDTO = {};
              })
            }).catch(err => {
              console.log(err)
              this.$message.error('图片上传失败');
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    dialogClose() {
      // this.hideUpload = false;
      console.log('close');
      this.teacherInputDTO = {}
    },
    updateAssign(row) {
      this.fileList = '';
      this.teacherInputDTO = JSON.parse(JSON.stringify(row));
      console.log(row)
      this.updateVisible = true;
    },
    updateTeacher(form, teacher) {
      this.$refs[form].validate( valid => {
        if(valid) {
          console.log(teacher);
          this.$store.dispatch('updateTeacher', teacher)
          this.updateVisible = false;
          this.teacherInputDTO = {};
          // let file = this.fileList.raw;
          // let formData = new FormData();
          // if(file) {
          //   formData.append('file', file);
          //   this.$store.dispatch('uploadImage', formData)
          //   .then(res => {
          //     console.log(res)
          //     teacher.faceFileId = res;
          //     console.log(teacher);
          //     this.$store.dispatch('updateTeacher', teacher)
          //     .then(() => {
          //       this.dialogVisible = false;
          //       that.teacherInputDTO = {};
          //     })
          //   }).catch(err => {
          //     console.log(err)
          //     this.$message.error('图片上传失败');
          //   })
          // }
        }else{
          return false;
        }
      })
    },
    deletes (id) {
      this.$confirm('此操作将清除该老师数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
          this.$store.dispatch('deleteTeacher', id);
      }).catch(() =>{

      })
    },
    deleteBatch() {
      if(this.selection.length){
          this.$confirm('此操作将批量删除老师信息，是否继续？', '警告', {
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
  }
}
</script>
<style lang="scss">
.pickInput {
  width: 120px !important;
  margin:0 6px;
}
.hide .el-upload--picture-card {
  display: none;
}
.age_margin_distance{
  margin-top:-20px;
}
</style>
