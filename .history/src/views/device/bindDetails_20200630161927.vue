<template>
  <div
    id="wristband"
    class="wrapper"
    style="overflow-y: auto;"
  >
    <!-- wristband -->
    <article style="padding:6px; 0px;height:calc(100% - 36px);">
      <div id="header">
        <labelTop
          :label-info="labelInfo"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
        />
        <p id="button" class="clearfix">
            <el-button type="success" size="mini" @click="dialogVisible = true;" round><i class="el el-icon-circle-plus-outline" />添加</el-button>
            <!-- <el-button type="primary" size="mini" round @click="bindVisible = true;"><i class="el el-icon-paperclip" />绑定</el-button> -->
            <el-button type="danger" @click="deleteBatch" size="mini" round><i class="el el-icon-delete" />删除</el-button>
          <span class="right" style="margin:4px;display:inline-block;">
            <!-- {{getOptions}} -->
            <el-input v-model="rule.name"
            placeholder="请输入姓名"
            size="mini" style="width:120px;">

            </el-input>
          <label style="">
        年级
        <el-select v-model="classifyObj" 
          class="pickInput" clearable
          @change="gradeChange" value-key="id"
          placeholder="请选择年级" size="mini">
            <el-option 
              v-for="item in getOptions"
              :key="item.id"
              :label="item.gradeName"
              :value="item">
            </el-option>
          </el-select>
      </label>
            <label style="">
        班级
        <el-select v-model="rule.className" class="pickInput" clearable
           placeholder="请选择班级" size="mini" no-data-text="请先确定年级">
            <el-option 
              v-for="item in classList"
              :key="item.id"
              :label="item.className"
              :value="item.className">
            </el-option>
          </el-select>
      </label>
          <!-- <label v-if="getOptions && getOptions.length" style="margin-right:12px;">班级
          <el-cascader
            v-model="classifyArr"
            style="width:140px;"
            size="mini" :multiple="true"
            :options="getOptions"
            clearable
            placeholder="请选择班级"
            :props="{ checkStrictly: true }"
            @change="handleChange"
          />
          </label> -->
          <!-- <label>手环编号<el-input
            v-model="rule.bandId"
            size="mini" clearable
            style="width:140px;"
            placeholder="请输入手环编号"
            @keydown.enter.native="wristSearch"
          /></label> -->
          <label>mac<el-input
            v-model="rule.mac"
            size="mini" clearable
            style="width:110px;"
            placeholder="请输入mac"
          /></label>
          <el-button
            type="primary"
            size="mini"
            round
            @click="clearSearch"
          >
            清空
          </el-button>
          </span>
          
        </p>
      </div>
      <!-- 手环添加 -->
      <el-dialog
      custom-class="dialog"
      width="500px"
      top="10vh" v-el-drag-dialog
      :modal="false"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      center
      title="添加"
    >
      <el-form :rules="rules"  @submit.native.prevent
        class="form refuseCopy"
        size="small" ref="formAdd"
        :model="wristband" style="width:80%;margin:0 auto;"
        label-width="100px"
      >
        <el-form-item label="mac" prop="mac">
          <el-input
            v-model="wristband.mac"
            style="width:240px"
            autocomplete="off"
            @keydown.enter.native="submit('formAdd', wristband)"
          />
        </el-form-item>
         <el-form-item>
          <el-button
            type="primary"
            @click="submit('formAdd', wristband)"
          >
            确 定
          </el-button>
          <el-button @click="dialogVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
      <!-- 手环绑定 -->
      <el-dialog
      custom-class="dialog"
      width="500px"
      top="10vh" v-el-drag-dialog
      :modal="false"
      :visible.sync="bindVisible"
      :destroy-on-close="true"
      center 
      title="绑定"
    >
      <el-form :rules="rules"
        class="form refuseCopy"
        size="small" ref="formBind"
        :model="bandBind" style="width:80%;margin:0 auto;"
        label-width="100px"
      >
        <!-- <el-form-item label="手环Id" prop="bandId">
          <el-input
            v-model="bandBind.bandId"
            style="width:240px"
            autocomplete="off"
          />
        </el-form-item> -->
        <!-- {{getOptions}} -->
        <!-- <el-form-item label="班级" prop="classInfo">
          <el-cascader
          v-model="bandBind.classInfo"
          size="mini" style="width:200px;"
          :options="getOptions"
          clearable
          placeholder="请选择班级"
          :props="{expandTrigger: 'hover'}"
          @change="handleChange_student"
        />
        </el-form-item> -->
        <el-form-item label="年级" prop="">
          <el-select v-model="bandBind.gradeId"
           placeholder="请选择" 
           @change="gradeBindChange">
            <el-option
              v-for="item in getOptions"
              :key="item.id"
              :label="item.gradeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- {{classListBinds}} -->
        <el-form-item label="班级" prop="">
        <el-select v-model="bandBind.classId" 
        class="" clearable
          placeholder="请选择班级"
          size="mini" @change="handleChange_student"
          no-data-text="请先确定年级">
            <el-option 
              v-for="item in classListBinds"
              :key="item.id"
              :label="item.className"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学生姓名" prop="studentId">
          <el-select size="mini" v-model="bandBind.studentId"
          filterable placeholder="请选择学生姓名"
          clearable no-data-text="请先选择班级">
              <el-option
                v-for="item in getStudentName"
                :key="item.id"
                :label="item.id?item.studentName:''"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="学生Id" prop="studentId">
          <el-input
            v-model="bandBind.studentId"
            style="width:240px"
            autocomplete="off"
          />
        </el-form-item> -->
         <el-form-item class="center" label-width="0">
          <el-button
            type="primary"
            @click="bind('formBind', bandBind)"
          >
            确 定
          </el-button>
          <el-button @click="bindVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
      <template>
        <el-table
          size="mini"
          row-class-name="table"
          header-cell-class-name="tableHeader"
          :data="sdata"
          height="89%"
          class="animated fadeInUp"
          @select="select"
          @select-all="selectAll"
        >
          <el-table-column
            :resizable="true"
            align="center"
            type="selection"
          />
           <el-table-column type="index" :index="table_index" width="70" label="序数" />
          <!-- <el-table-column :resizable="true" v-for="(v,i) in form" align="center" :prop="v[0]" :label="v[1]" v-bind:key="i"></el-table-column> -->
          <!-- <el-table-column
            align="center"
            prop="id"
            label="手环ID"
          /> -->
          <el-table-column
            align="center"
            prop="mac"
            label="mac地址"
          />
          <el-table-column
            align="center"
            label="状态"
          >
          <template slot-scope="scope">
            {{scope.row.activeStatus?'使用中' : '静态'}}
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="挂失状态"
          >
          <template slot-scope="scope">
            {{scope.row.lostStatus?'已挂失' : '正常'}}
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="姓名"
          />
          <el-table-column
            align="center"
            prop="studentCode"
            label="卡号"
          />
          <el-table-column
            align="center"
            prop="gradeName"
            label="年级"
          />
          <el-table-column
            align="center"
            prop="className"
            label="班级"
          />
          <!-- <el-table-column
            align="center"
            prop="address"
            label="地址"
          />
          <el-table-column
            align="center"
            prop="date"
            label="绑定日期"
          /> -->
          <el-table-column
            align="center"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="bandBind.bandId= scope.row.bandId;bindVisible = true;"
              >
              <!-- {{scope.row}} -->
                修改 
              </el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="remove(scope.row.bandId)"
              >
                解绑
              </el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
    </article>
  </div>
</template>
<script>
import labelTop from '../../components/label'
export default {
  name: 'Wristband',
  components: { labelTop },
  data () {
    return {
      dialogVisible: false,
      bindVisible: false,
      // showOptions: false,
      // classifyArr: [],
      classifyObj: {},
      classList: [],
      labelInfo: {
        avatar: 'el-icon-set-up',
        level1: '设备管理',
        level2: '绑定详情',
        total: 0
      },
      wristband: {
        mac: ''
      },
      classListBinds: [],
      bandBind: {
        bandId: '',
        studentId: '',
        classInfo: [],
        classId: '',
        gradeId: ''
      },
      selection: [],
      pageSize: 50,
      currentPage: 1,
      rules: {
        bandId: {required: true, message: '请输入手环id', trigger: 'blur'},
        mac: {required: true, message: '请输入mac地址', trigger: 'blur'},
        studentId: {required: true, message:'请输入学生Id', trigger: 'blur'},
        classInfo: {required: true, message: '请选择班级', trigger: 'blur'}
      },
      rule: {
        gradeName: '',
        className: '',
        name: '',
        bandId: '',
        cardId: '',
        mac: '',
        wristId: '', // 手环编号
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
      }
      // options: this.$store.getters.getOptions,
      // wristbandData: this.$store.getters.getWristData
    }
  },
  computed: {
    sdata () {
      let data = this.$store.getters.get_wristband_bindings;
      let rule = this.rule.pick()
      console.log(rule);
      // console.log(this.rule)
      if (rule.length) {
        this.currentPage = 1;
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
      // console.log(data);
      return data
    },
    getOptions() {
      return this.$store.getters.getGrade;
    },
    // getOptions() {
    //   return this.$store.getters.getOptions;
    // },
    getStudentName() {
      
      let data = this.$store.getters.get_class_student;
      // if(this.bandBind.classInfo && this.bandBind.classInfo.length){
      //     return data;
      //   }else{
      //     return [];
      //   }
      if(data.length) {
        return data;
      }
       return []; 
    },
  },
  created () {
    // this.$store.dispatch('WristbandData');
    this.$store.dispatch('getStudentBandList')
    // .then(res => {
    //   // console.log(res);
    // })
    // this.$store.dispatch('getClassSelect')
    // .then(res => {
    //   this.showOptions = true;
    // })//获取年级班级;
    // this.$store.dispatch('getStudentData');
  },
  methods: {
    setData (rule, data) {
      // let data = this.$store.getters.get_wristband_bindings
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
    table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
    },
    handleChange_student (classId) {

      this.$store.dispatch('getClassStudent_',classId)
      // console.log(classroom)
      // console.log(this.bandBind)
      // // this.$store.dispatch('getClassStudent_',classroom[1])
      // if(this.bandBind.classInfo && this.bandBind.classInfo.length){
      //   this.$store.dispatch('getClassStudent_',classroom[1])
      // }else {
      //   this.bandBind.studentId = '';
      // }
    },
    sizeChange (v) {
      this.pageSize = v
    },
    currentChange (v) {
      this.currentPage = v
    },
    gradeChange(v) {
      this.rule.gradeName = v.gradeName;
      if(v) {
        console.log(v);
        this.rule.className = '';
        this.$store.dispatch('getClassListByGradeId', v.id)
        .then(res => {
          this.classList = res;
        })
      }else{
        this.rule.gradeName = '';
        this.classList = [];
      }
    },
    gradeBindChange(v) {
      // this.rule.gradeName = v.gradeName;
      if(v) {
        console.log(v);
        this.classListBinds = [];
        this.$store.dispatch('getClassListByGradeId', v)
        .then(res => {
          this.classListBinds = res;
        })
      }else{
        this.classListBinds = [];
      }
    },
    handleChange (arr) {
      console.log(arr);
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
      console.log(this.rule)
    },
    clearSearch () {
      // this.rule.classroom = ''
      // this.rule.cardId = ''
      // this.rule.wristId = ''
      this.rule.gradeName = ''
      this.rule.className = '';
      this.classifyArr = [];
      // this.classifyObj = {};
      this.rule.name = '';
      this.rule.mac = '';
      // this.rule.name = ''
    },
    submit(formAdd, w) {
      let that = this;
      this.$refs[formAdd].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.$store.dispatch('wristbandAdd', w)
          .then(() => {
            that.wristband = {};
          })
        } else {
          return false;
        }
      });
    },
    remove (id) {
      this.$confirm('此操作将使该学生与当前手环解绑，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {

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
    bind (formAdd, info) { // 手环绑定
      let that = this;
      this.$refs[formAdd].validate((valid) => {
        console.log(info)
        if (valid) {
          this.bindVisible = false;
          this.$store.dispatch('wristBind', info)
          .then(() => {
            that.bandBind.studentId = '';
          })
        } else {
          return false;
        }
      });
    },
    pick (parameter) { // 根据条件筛选：
      console.log('keydown')
    }
  }
}
</script>
<style lang="scss">
  #wristband{
    background: rgb(243,249,248);
    #header{
      // height:80px;
      line-height:20px;
      background:#fff;
      margin-bottom:6px;
      position:relative;
      box-shadow:-2px -2px 2px #f0f0f0;
      #button{
        width:100%;
        padding:6px;
        // position:absolute;
        // right:40px;
        // top:44px;
        // text-align:center;
        // border:solid 1px;
        label{
          margin-right: 5px;
          .el-input{
            // width:118px;
            margin-left:3px;
            // &:nth-last-child(1){
              margin-right:4px;
            // }
          }
        }
      }
    }
    .table{
      width:95%;
    }
    .tableHeader{
      background: #fff !important;
    }
  }
</style>
