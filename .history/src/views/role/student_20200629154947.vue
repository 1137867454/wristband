<template>
  <div
    id="stundent"
    class="wrapper"
  >
  <!-- {{selects}} -->
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
      <div class="right">
        <!-- <label v-if="showOptions" style="margin-left:16px;">年级
          <el-select size="mini" v-model="rule.gradeId"
          placeholder="请选择年级" class="pickInput" :clearable="true"
          >
              <el-option
                v-for="item in getOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </label> -->
        <label v-if="getOptions && getOptions.length" style="margin-left:16px;">班级
        <el-cascader
          v-model="classifyArr"
          class="pickInput"
          size="mini" :multiple="true"
          :options="getOptions"
          clearable
          placeholder="请选择班级"
          :props="{ checkStrictly: true }"
          @change="handleChange"
        />
        <!-- , expandTrigger: true  -->
      </label>
      <label>学号<el-input
        v-model="rule.studentCode"
        class="pickInput"
        size="mini" clearable
        placeholder="根据学号查询"
      /></label>
      <label>姓名<el-input
        v-model="rule.studentName"
        class="pickInput"
        size="mini" clearable
        placeholder="根据姓名查询"
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
      </el-button></div>
    </div>
    <!-- dialogVisible 学生添加弹窗 el-dialog -->
    <el-dialog v-el-drag-dialog
      custom-class="dialoger"
      top="8vh" width="500px"
      :modal="false" 
      :visible.sync="dialogVisible"
      center :close-on-click-modal="false"
      title="添加" @close="photoClose"
    >
    <!-- :inline="true" -->
      <el-form  style="margin-left:60px;"
        class="form refuseCopy" :rules="rules" ref="ruleForm"
        size="small" label-position="left"
        :model="students"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input clearable
            v-model="students.name"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
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
        <el-form-item label-width="0">
          <el-upload ref="uploadAlbum"
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
            <!-- :before-upload="beforeUpload" -->
        <el-form-item label="学号"  prop="studentCode" :class="hideUpload?'age_margin_distance':''">
          <el-input clearable
            v-model="students.studentCode"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <!-- <el-form-item label="出生日期">
          <el-date-picker style="width:200px"
            v-model="students.date"
            align="right"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item> -->
        <!-- <el-form-item label="内部id" prop="internalClassId">
          <el-input
            v-model="students.internalClassId"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item> -->
        <el-form-item label="班级" prop="classInfo">
          <el-cascader
          v-model="students.classInfo"
          size="mini" style="width:200px;"
          :options="getOptions"
          clearable 
          placeholder="请选择班级"
          :props="{expandTrigger: 'hover'}"
        />
        </el-form-item>
        <el-form-item label="家长姓名" prop="parentName">
          <el-input clearable
            v-model="students.parentName"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="联系电话" prop="parentPhone">
          <el-input @keydown.native.enter="sda('ruleForm', students)"
            v-model="students.parentPhone" show-word-limit
            autocomplete="off" maxlength="11" clearable
            style="width:200px" 
          />
        </el-form-item>
        <el-form-item label-width="0" style="text-align:center;width:100%;">
          <el-button
            type="primary"
            @click="submit('ruleForm', students)"
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
    <div style="height:calc(100% - 90px);width:100%;">
      <template>
        <el-table style="background:rgba(243,249,248,0.8);"
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
          <el-table-column type="index" :index="table_index" align="center" width="60" label="序数" />
          <el-table-column type="expand" width="24">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="Id">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                  <span>{{ props.row.studentName }}</span>
                </el-form-item>
                <el-form-item label="年级ID">
                  <span>{{ props.row.gradeId }}</span>
                </el-form-item>
                <el-form-item label="班级ID">
                  <span>{{ props.row.classId }}</span>
                </el-form-item>
                <!-- <el-form-item label="内部班级ID">
                  <span>{{ props.row.internalClassId }}</span>
                </el-form-item> -->
              </el-form>
            </template>
          </el-table-column>
      <!-- <el-table-column align="center" prop="id" label="ID" ></el-table-column> -->
      <!-- <el-table-column align="center" prop="cardNo" label="卡号" ></el-table-column> -->
      <el-table-column align="center" prop="studentCode" label="学号" ></el-table-column>
      <el-table-column align="center" 
      :default-sort = "{prop: 'studentName'}" 
      :sort-method="sortDevName"
      sortable
       prop="studentName" label="姓名" ></el-table-column>
      <el-table-column align="center" label="性别" width="50" >
        <template slot-scope="scope">
          {{scope.row.gender=='1'?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="gradeName" label="年级"></el-table-column>
      <el-table-column align="center" prop="className" label="班级" ></el-table-column>
      <!-- <el-table-column align="center" prop="gradeId" label="年级ID"  ></el-table-column> -->
      <!-- <el-table-column align="center" prop="classId" label="班级ID" ></el-table-column> -->
      <!-- <el-table-column align="center" prop="internalClassId" label="班内id" ></el-table-column> -->
      <el-table-column align="center" prop="parentName" label="家长" ></el-table-column>
      <el-table-column align="center" prop="parentPhone" label="家长电话" ></el-table-column>
          <!-- <el-table-column
            v-for="(v, k, i) in student"
            :key="i"
            :resizable="true"
            align="center"
            :prop="k"
            :label="v"
          /> -->
          <el-table-column
            align="center"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <!-- {{scope.row}} -->
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                round
                @click="updateAssign(scope.row)"
              />
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                round
                @click="deleteStudent(scope.row.id)"
              />
              <!-- <el-button
                size="mini"
                type="info"
                icon="el-icon-more"
                round
              /> -->
              <!-- <el-button size="mini" type="primary"  round>编辑</el-button>
                <el-button size="mini" type="danger" round>删除</el-button>
                <el-button size="mini" type="info" round>详情</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- {{sdata}} -->
    </div>
    <!-- 学生信息修改框 -->
    <el-dialog title="修改" v-el-drag-dialog
      :visible.sync="updateVisible"
      custom-class="dialoger"
      top="8vh" width="500px"
      :modal="false"  @close="updateClose"
      center :close-on-click-modal="false"
    >
      <el-form  style="margin-left:60px;"
        class="form refuseCopy" :rules="rules" ref="updateStudent"
        size="small" label-position="left"
        :model="students"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="students.name"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio style="width:58px;"
            v-model="students.gender"
            :label="1"
          >
            男
          </el-radio>
          <el-radio
            v-model="students.gender"
            :label="2"
          >
            女
          </el-radio>
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
            <!-- :before-upload="beforeUpload" -->
        <el-form-item label="学号"  prop="studentCode" :class="hideUpload?'age_margin_distance':''">
          <el-input clearable
            v-model="students.studentCode"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <!-- <el-form-item label="学号"  prop="studentCode">
          <el-input
            v-model="students.studentCode"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item> -->
        <!-- <el-form-item label="出生日期">
          <el-date-picker style="width:200px"
            v-model="students.date"
            align="right"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item> -->
        <!-- <el-form-item label="班级" prop="classInfo">
          <el-cascader
          v-model="students.classInfo"
          size="mini" style="width:200px;"
          :options="getOptions"
          clearable
          placeholder="请选择班级"
          :props="{expandTrigger: 'hover'}"
        />
        </el-form-item> -->
        <el-form-item label="家长姓名" prop="parentName">
          <el-input
            v-model="students.parentName"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="联系电话" prop="parentPhone">
          <el-input @keydown.native.enter="sda('ruleForm', students)"
            v-model="students.parentPhone" show-word-limit
            style="width:200px"  maxlength="11"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label-width="0" style="text-align:center;width:100%;">
          <el-button
            type="primary"
            @click="updateStudent('updateStudent', students)"
          >
            确 定
          </el-button>
          <el-button @click="updateVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- <el-dialog
      :modal="false"
      custom-class="dialog"
      :destroy-on-close="true"
      top="10vh"
      center
      width="500px"
      title="修改"
      :visible.sync="updateVisible"
    >
      <el-form
        class="form refuseCopy"
        size="small"
        :model="students"
        label-width="100px"
      >
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
    </el-dialog> -->
  </div>
</template>
<script>
import { getItem } from '../../util/localStorage'
import labelTop from '../../components/label'
import axios from 'axios'
export default {
  name: 'Student',
  components: {
    labelTop
  },
  data () {
    return {
      showOptions: false,
      res: [],
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
      classifyArr: [], //通过年级和班级分类查询
      rowKey: '',
      search: '',
      selection: [],
      dialogVisible: false,
      updateVisible: false,
      sid: '', // 修改用户信息所需的sid
      options: '', // 班级列表
      students: {
        "studentCode": "",
        "name": "",
        "gender": '',
        "classId": 0,
        "gradeId": 0,
        "internalClassId": "",
        "parentName": "",
        "parentPhone": "",
        "classInfo": []
      },
      photoImageUrl: '',
      photoVisible: false,
      hideUpload: false,
      fileList: [],
      // studentData: [],
      rules: { // 添加限制
        name: { required: true, message: '请输入学生姓名', trigger: 'blur' },
        studentCode: { required: true, message: '请输入该学生学号', trigger: 'blur' },
        gender: { required: true, message: '请输入性别', trigger: 'blur' },
        classInfo: { required: true, message: '请选中年级班级', trigger: 'blur' },
        internalClassId: { required: true, message: '请输入班级内部id', trigger: 'blur' },
        // parentName: { required: true, message: '请输入家长姓名', trigger: 'blur' },
        // parentPhone: { required: true, message: '请输入家长联系方式', trigger: 'blur' },
      },
      rule: {
        // sid: '',
        studentName: '',
        // sex: '',
        // age: '',
        gradeId: '',
        classId: '',
        studentCode: '',
        classroom: '',
        pick: function () {
          var pickArr = []
          for (let i in this) {
            if(typeof this[i] == 'string'){
              this[i] = this[i].trim();
            }
            if (this[i] !== '') {
              pickArr.push(i)
            }
          }
          pickArr.pop()
          return pickArr
        }
      },
      student: { // 学生对象 >> 属性
        "id": 'ID',
        "cardNo": '卡号',
        "studentCode": "学号",
        "name": "姓名",
        "gender": '性别',
        "gradeId": '年级ID',
        "gradeName": '年级',
        "classId":'班级ID',
        "className": '班级名称',
        "internalClassId": "班级内部id",
        "patriarchName": "家长",
        "phone": "家长电话"
      },
      currentPage: 1,
      pageSize: 50,
      studentData: [],
      selects:[]
    }
  },
  watch: {
    rule: {
      handler(new_, old) {
        this.currentPage = 1;
        // console.log('handle')
        // console.log(new_);
        // console.log(old);
      },
      deep: true
    }
    
  },
  computed: {
    sdata () {
      console.log('sdata触发')
      let data = this.$store.getters.getStudents;
      let rule = this.rule.pick()
      // if (rule.length) {
      //   this.currentPage = 1
      // }
      console.log(rule)
      rule.forEach(e => {
        data = data.filter((v, i) => {
          // console.log(v.gradeId == this.rule[e])
          if(v[e] != null){
            return v[e].includes(this.rule[e])
          }
        })
      })
      this.setData(rule, data)
      var prev = (this.currentPage - 1) * this.pageSize
      // this.labelInfo.total = data.length
      data = data.slice(prev, this.pageSize + prev)
      // console.log(prev)
      // console.log(this.pageSize)
      return data
    },
    // 得到班级
    getOptions() {
      return this.$store.getters.getOptions;
    }
  },
  mounted () {
    this.$store.dispatch('getStudentData')
    .then(res => {
      this.studentData = res;
    })
    // this.$store.dispatch('getClassSelect')
    // .then(res => {
    //   this.showOptions = true;
    //   this.res = res
    // })
  },
  methods: {
    sortDevName(str1, str2) {
       let res = 0
       res = str1['studentName'].localeCompare(str2['studentName']);
       return res;
    },
    photoClose() {
      // this.hideUpload = false;
    },
    photoChange(file) {
      console.log(file)
      this.fileList = file;
      // this.hideUpload = true;
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
    //翻页后序号连续
    table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
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
    handleChange (arr) {
      if(arr && arr.length){
        this.rule.gradeId = arr[0];
        this.rule.classId = '';
        if(arr.length > 1){
          this.rule.classId = arr[1];
        }
      }else{
        this.rule.gradeId = '';
        this.rule.classId = '';
      }
    },
    clearSearch () {
      // this.rule.sid = '' // 班级号：唯一ID
      this.rule.studentName = ''
      // this.rule.classroom = ''// 班主任
      this.rule.gradeId = ''
      this.rule.classId = '';
      this.classifyArr = [];
    },
    sizeChange (val) {
      console.log('sizeChange ' + val)
      this.pageSize = val
    },
    currentChange (val) {
      console.log('currentChage ' + val)
      this.currentPage = val
    },
    submit (formName, student) { // 提交添加学生信息
      this.$refs[formName].validate((valid) => {
        if (valid) {
      student.gradeId = student.classInfo[0];
      student.classId = student.classInfo[1];
      console.log(student)
      let that = this;
          let file = this.fileList.raw;
          console.log(file);
          let formData = new FormData();
          if(file) {
            formData.append('file', file);
          }
          this.$store.dispatch('uploadImage', formData)
          .then(res => {
            console.log(res);
            student.faceFileId = res;
            this.$store.dispatch('addStudent', student)
            .then(() => {
            that.dialogVisible = false;
              that.students = {};
            })
          }).catch(err => {
            console.log(err);
          })
        } else {
          return false;
        }
      });
    },
    deleteStudent (studentId) { // 删除学生
    this.$confirm('此操作将删除该学生，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
          this.$store.dispatch('deleteStudent', studentId);
      }).catch(() =>{

      })
    },
    deleteBatch() {
      if(this.selection.length){
          this.$confirm('此操作将批量删除学生信息，是否继续？', '警告', {
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
    updateAssign(value) {
      this.updateVisible = true;
      this.fileList = '';
      value.name = value.studentName;
      // delete value.gender;
      this.students = {...value};
      console.log(value);
    },
    updateClose() {
      this.students = {};
      // this.updateVisible = false;
      console.log('beforeClose');
    },
    updateStudent (form, student) { // 学生信息修改
      this.$refs[form].validate(valid => {
        if(valid) {
          let file = this.fileList.raw;
          console.log(file);
          let formData = new FormData();
          if(file) {
            formData.append('file', file);
          }
          this.$store.dispatch('uploadImage', formData)
          .then(res => {
            console.log(res);
            // student.faceFileId = res;
            // student.faceFile = res;
            delete student.studentName;
            delete student.classInfo;
            delete student.cardNo;
            this.$store.dispatch('updateStudent', student)
            .then(() => {
              this.dialogVisible = false;
              this.students = {};
            }).catch(() => {

            })
          }).catch(err => {
            console.log(err);
          })
            this.updateVisible = false;
            
        }else{
          return false;
        }
      })
      // this.$store.dispatch('updateStudent', this.students)
    },
    setData (rule, data) {
      // if (rule.length) {
      //   this.currentPage = 1
      // }
      this.labelInfo.total = data.length;
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
    .hide .el-upload--picture-card {
      display: none;
    }
    .age_margin_distance{
      margin-top:-20px;
    }
</style>
