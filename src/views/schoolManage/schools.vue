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
      <div class="right">
      <!-- <label style="margin-left:16px;">班级
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
        /></label> -->
        <label>名称<el-input
          v-model="rule.name"
          class="pickInput"
          size="mini" clearable
          placeholder="根据班主任查询"
        /></label>
        <el-button
          type="primary"
          size="mini"
          round
          @click="clearSearch"
        >
          清空
        </el-button>
      </div>
    </div>
    <!-- dialogVisible 学生添加弹窗 el-dialog -->
    <el-dialog top="8vh" width="500px"
      custom-class="dia"
      :modal="false"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      center
      title="添加"
    >
      <el-form ref="school"
        class="form refuseCopy"
        size="small" :rules="rules"
        :model="school"
        label-position="left"
        label-width="100px"
      >
      <el-form-item prop="schoolInputDTO.name" label=" 学校名称">
          <el-input clearable
            v-model="school.schoolInputDTO['name']"
            class="input_220"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item required label="  11">
          <el-upload ref="uploadLogo"
            class="upload-demo"
            action=""
            :limit="1"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :http-request="uploadLogo"
            accept="image/*"
            :auto-upload="false"
            list-type="picture">
            <el-button style="position:absolute;top:0;left:-90px;" size="small" type="primary">图片上传</el-button>
            <div style="position:absolute;top:-6px;right:40px;" slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item :label=" '. ' + '添加日期'">
          <el-date-picker class="input_220"
            v-model="school.date"
            align="right"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item> -->
        <el-form-item prop="schoolInputDTO.manageEmail" label=" 管理员邮箱">
          <el-input clearable
            v-model="school.schoolInputDTO['manageEmail']"
            class="input_220"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="schoolInputDTO.managePhone" label=" 联系电话">
          <el-input clearable
            v-model="school.schoolInputDTO['managePhone']"
            class="input_220"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="schoolInputDTO.address" label=" 学校地址">
          <el-input clearable @keydown.native.enter="dialogVisible = false;"
            v-model="school.schoolInputDTO['address']"
            class="input_220"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="schoolManagerInputDTO.account" label=" 管理员账号">
          <el-input clearable @keydown.native.enter="dialogVisible = false;"
            v-model="school.schoolManagerInputDTO['account']"
            class="input_220"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="schoolManagerInputDTO.password" label=" 管理员密码">
          <el-input type="password" @keydown.native.enter="dialogVisible = false;submit(school)"
            v-model="school.schoolManagerInputDTO['password']"
            class="input_220"
            autocomplete="off"
          />
        </el-form-item>
        <!-- <el-form-item required label=" 图片上传">
          <input type="file" v-on:change="onAvatar" style="width:200px;" accept="image/jpeg, image/png, image/jpg" name="file" id="file"/>
          
        </el-form-item>
        <el-form-item label=" 图片" style="width:100%;" >
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="mini" type="primary">点击上传</el-button>
        </el-upload>
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="primary"
            @click="submit('school', school)"
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
            <span>{{ props.row.schoolInputDTO.name }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
        <!-- <el-table-column
          v-for="(v, k, i) in school_"
          :key="i"
          :resizable="true"
          align="center"
          :prop="k"
          :label="v"
        /> -->
        <el-table-column align="center" prop="schoolInputDTO.name" label="学校名称"></el-table-column>
            <el-table-column align="center" prop="date" label="添加日期"></el-table-column>
            <el-table-column align="center" prop="schoolInputDTO.address" label="学校地址"></el-table-column>
            <el-table-column align="center" prop="schoolInputDTO.managePhone" label="管理员电话"></el-table-column>
            <el-table-column align="center" prop="schoolInputDTO.manageEmail" label="管理员邮箱"></el-table-column>
            <el-table-column align="center" prop="schoolManagerInputDTO.account" label="用户名"></el-table-column>
            <el-table-column align="center" prop="schoolManagerInputDTO.password" label="密码"></el-table-column>

        <el-table-column
          align="center"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-circle-plus-outline"
              round
              @click="updateVisible = true;sid = scope.row.sid"
            />
            <el-button
              size="mini"
              type="warning"
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
    </div>
  </div>
</template>
<script>
import { getItem } from '../../util/localStorage'
import labelTop from '../../components/label'
export default {
  name: 'school_',
  components: {
    labelTop
  },
  data () {
    return {
      labelInfo: {
        avatar: 'iconfont icon-xuexiao6',
        level1: '学校管理',
        // level2: '学生管理',
        total: 0
        // handleSizeChange:
      },
      fileList: [],
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
      school: {
        schoolInputDTO: {
        address: "",
        manageEmail: "",
        managePhone: "",
        name: ""
      },
      schoolManagerInputDTO: {
        account: "",
        password: ""
      }
      // date:''
      },
      rules: {
        schoolInputDTO:{
          'name': {required: true, message: '学校名为必填项', trigger: 'blur'},
          'address': {required: true, message: '请填写学校地址', trigger: 'blur'},
          'manageEmail': {required: true, message: '邮箱为必填项', trigger: 'blur'},
          'managePhone': {required: true, message: '联系方式为必填项', trigger: 'blur'}
        },
        schoolManagerInputDTO: {
          'account': {required: true, message: '用户名为必填项', trigger: 'blur'},
          'password': {required: true, message: '密码为必填项', trigger: 'blur'}
        }
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
      school_: { // 学校对象 >> 属性
        "schoolInputDTO": {
          "address": "学校地址",
          "manageEmail": "学校邮箱",
          "managePhone": "联系电话",
          "name": "学校名称",
        },
        "schoolManagerInputDTO": {
          "account": "用户名",
          "password": "密码"
        }
      },
      currentPage: 1,
      pageSize: 10,
      school_Data: []
    }
  },
  computed: {
    sdata () {
      let data = this.$store.getters.getSchool;
      console.log(data)
      let rule = this.rule.pick()
      rule.forEach(e => {
        data = data.filter((v, i) => {
          if (Array.isArray(this.rule[e])) {
            return v[e].includes(this.rule[e].join(''))
          } else {
            return v[e].includes(this.rule[e])
          }
        })
      })
      // console.log(rule)
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
    this.school_Data = this.$store.getters.getschool;
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
    onAvatar(e) {
      console.log(e)
      var files = e.target.files || e.dataTransfer.files;
      console.log(e.target.files);
      if (!files.length)
        return;
        this.school.avatar = files[0];
      // this.createImage(files[0]);
    },
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
    uploadLogo(file) {
      console.log(file);
      this.fileList.push(file.file);
    },
    submit (school, school_) { // 提交添加学生信息
      console.log(school_)
      this.$refs[school].validate(valid => {
        if(valid) {
          this.$refs['uploadLogo'].submit();
          let formData;
          if(this.fileList.length) {
            let formData = new FormData();
            formData.append('file', this.fileList[0]);
            this.$store.dispatch('uploadImage', formData)
            .then(res => {
              school_.schoolInputDTO.logoImageId = res;
              this.$store.dispatch('addSchool', school_)
              .then(() => {
                this.dialogVisible = false;
                this.school = {
                  schoolInputDTO: {
                  // address: "",
                  // manageEmail: "",
                  // managePhone: "",
                  // name: ""
                },
                schoolManagerInputDTO: {
                  // account: "",
                  // password: ""
                }
                // date:''
                }
              }).catch(() => {

              })
              // console.log(res);
            }).catch(err => {

            })
          }
        }else{
          return false;
        }
      })
      
      // this.$store.dispatch('addschool_', school_)
      // this.$store.dispatch('addSchool', school_)
    },
    deletes (index, row) { // 删除学校
      var arr = []
      if (row) {
        arr.push(row.sid)
      } else {
        this.selection.forEach(v => {
          arr.push(v.sid)
        })
      }
      this.$store.dispatch('deleteschool_', arr)
    },
    updateschool_ () { // 学生信息修改
      this.school.sid = this.sid
      // console.log('sid' + this.school.sid)
      this.$store.dispatch('updateschool_', this.school)
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
    .form{
      padding: 0 10%;
      font-size: 18px !important;
      // text-align: center;
      margin:0 auto;
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
    // .el-dialog__header{
    //   // padding: 10px;
    //   background: #6df;
    //   letter-spacing:2em;
    //   text-indent:2em;
    //   .el-dialog__title{
    //     color:#fff !important;
    //   }
    // }
    // .el-dialog--center .el-dialog__body{
    //   padding:0 !important;
    // }
    .el-dialog--center{

      background: #000;
    }
     .el-dialog__body{
      // padding:0 !important;
      // text-align:center !important;
      background: #000;
      // margin:0 auto !important;
    }
    .el-form-item{
      margin:0 auto;
    }
    .pickInput{
      width:120px !important;
      margin:0 8px;
      font-size:12px;
    }
    .dia{
      color:#ff0;
      // text-align:center;
    }
    // .el-popup-parent--hidden {
    //   padding: 0 !important;
    // }
    .upload-demo{
      width:220px;
    }
    .input_220{
      width:220px;
    }
</style>
