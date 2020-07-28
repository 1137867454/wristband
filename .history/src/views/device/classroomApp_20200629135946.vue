<template>
  <div
    id="classroom"
    class="wrapper"
  >
    <!-- 箭头盒子 -->
    <labelTop
      :label-info="labelInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <div class="button">
      <!-- <el-button
        size="mini"
        type="primary"
        round
        @click="dialogVisible = true"
      >
        <i class="el el-icon-circle-plus-outline" />添加
      </el-button> -->
      <el-button type="primary" size="mini" round @click="bindVisible = true;"><i class="el el-icon-paperclip" style="font-size:14px;" />绑定</el-button>
      <!-- <el-button
        size="mini"
        type="danger"
        round
        @click="deletes"
      >
        <i class="el el-icon-delete" />删除
      </el-button> -->
      <!-- <el-button
        size="mini"
        type="success"
        round
      >
        <i class="el el-icon-finished" />升级
      </el-button> -->
      <!-- <el-button size="mini" round class="right"><i class="el-icon-search"></i>查询</el-button> -->
      <!-- <el-input class="right" v-model="search" size="mini"
      placeholder="输入关键字搜索"  style="width:180px;" />-->
      <span class="right">
        <!-- <label style="margin-left:4px;">
        班级
        <el-cascader
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
      <label>
        教室Id
        <el-input
          v-model="rule.id"
          class="pickInput"
          size="mini"
          placeholder="根据教室id查询"
        />
      </label>
      <label>
        教室名
        <el-input
          v-model="rule.name"
          class="pickInput"
          size="mini"
          placeholder="根据教室名查询"
        />
      </label>
      <label>
        地点信息
        <el-input
          v-model="rule.comment"
          class="pickInput"
          size="mini"
          placeholder="根据备注查询"
        />
      </label>
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
    <!-- 蓝牙绑定 -->
      <el-dialog
      custom-class="dialog"
      width="500px" 
      top="10vh" 
      :modal="false"
      :visible.sync="bindVisible"
      :destroy-on-close="true"
      center
      title="蓝牙绑定"
    >
      <el-form :rules="rules"
        class="form refuseCopy"
        size="small"  ref="bluetoothBind"
        :model="bluetoothAp"
        label-width="100px"
      >
        <el-form-item label="蓝牙场景" prop="bluetoothAPId">
          <!-- <el-input
            v-model="bluetoothAp.bluetoothAPId"
            style="width:240px"
            autocomplete="off"
          /> -->
           <el-select v-model="bluetoothAp.bluetoothAPId" clearable placeholder="请选择">
            <el-option
              v-for="item in getBlueTooth"
              :key="item.id"
              :label="item.scenario"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        
        <!-- <el-form-item label="教室Id" prop="placeId">
          <el-input
            v-model="bluetoothAp.placeId"
            style="width:240px"
            autocomplete="off"
          /> -->
          <el-form-item label="教室" prop="placeId">
           <el-select v-model="bluetoothAp.placeId"
            placeholder="请选择教室">
            <el-option
              v-for="item in getClassroomSelect"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item>
          <el-button
            type="primary"
            @click="bind('bluetoothBind', bluetoothAp)"
          >
            确 定
          </el-button>
          <el-button @click="bindVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
    <!-- App信息列表 -->
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
         <el-table-column align="center" type="index" :index="table_index" width="70" label="序数" />
         <el-table-column type="expand" width="24">
      <template slot-scope="props">
        <el-table :data="props.row.bluetoothAPOutputDTOList" border>
          <el-table-column
            type="index"
            width="50" />
            <!-- <el-table-column
            align="center"
            prop="mac"
            label="蓝牙id"
          /> -->

            <el-table-column
            align="center"
            prop="scenario"
            label="场景"
          />
            <el-table-column
            align="center"
            prop="mac"
            label="mac地址"
          />
            <!-- <el-table-column
            align="center"
            prop="scenario"
            label="场景"
          /> -->
        </el-table>
        <!-- <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item v-for="(item,i) in props.row.bluetoothAPOutputDTOList" :key="props.$index +i" >
            <span style="margin-left:10px;">{{i+1}}</span>
            <span style="margin-left:10px;">蓝牙Id:{{ item.id }}</span>
            <span style="margin-left:10px;">mac地址:{{ item.mac }}</span>
            <span style="margin-left:10px;">Ap场景:{{ item.scenario }}</span>
          </el-form-item>
        </el-form> -->
      </template>
    </el-table-column>
        <el-table-column
          v-for="(v,k,i) in classroom_"
          :key="i"
          :resizable="true"
          align="center"
          :prop="k"
          :label="v"
        />
        <el-table-column
            align="center"
            prop="bluetoothAPOutputDTOList.length"
            label="绑定个数"
          />
        <el-table-column
          align="center"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini"
             @click="bluetoothAp.placeId=scope.row.placeOutputDTO.id;bindVisible = true;">
              <i style="font-size:13px;" />&nbsp;绑定</el-button>
              <!-- class="el-icon-paperclip" -->
            <!-- <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              round
              @click="deletes(scope.$index,scope.row)"
            >删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- {{sdata}} -->
    </template>
    </div>
    <!-- 教室信息修改框 -->
    <!-- <el-dialog
      custom-class="dialog"
      width="500px"
      top="10vh" :modal="false"
      :visible.sync="updateVisible"
      :destroy-on-close="true"
      center
      title="修改"
    >
      <el-form
        class="form refuseCopy"
        size="small"
        :model="classroom"
        label-width="100px"
      >
        <el-form-item label="教室">
          <el-input
            v-model="classroom.classroom"
            style="width:120px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="班级">
          <el-input
            v-model="classroom.class"
            style="width:120px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="入学日期">
          <el-date-picker
            v-model="classroom.date"
            align="right"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="updateVisible = false;"
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
        avatar: 'el-icon-set-up',
        level1: '设备管理',
        level2: '网关绑定',
        total: 0
      },
      expands: [], //展开行,
      getRowKey(row) {
        return row.placeOutputDTO.id;
      },
      rowKey: '',
      search: '',
      selection: [],
      dialogVisible: false,
      updateVisible: false,
      bindVisible: false,
      bluetoothAp: {
        bluetoothAPId: '',
        placeId: ''
      },
      classId: '', // 修改用户信息所需的classId
      options: this.$store.getters.getOptions, // 班级列表
      classroom: {
        // classId: '', // 班级号：唯一ID
        name: '',
        comment: ''
        // headMaster: '', // 班主任
        // classroomName: "",
        // nextclassroomId: '',
        // classroom: '',
        // num: '', // 人数
        // date: '',
      },
      rules: {
        mac: {required: true, message: '请输入mac地址', trigger: 'blur'},
        id:  {required: true, message: '请输入教室Id', trigger: 'blur'},
        scenario: {required: true, message: '请输入scenario', trigger: 'blur'},
        bluetoothAPId: {required: true, message: '蓝牙Id', trigger: 'blur'},
        placeId:  {required: true, message: '请输入教室Id', trigger: 'blur'}
      },
      rule: {
        id: '', // 班级号：唯一ID
        name: '',
        comment: '',
        // "placeOutputDTO.id":'教室id',
        // "placeOutputDTO.name":'教室名称',
        // "placeOutputDTO.comment":'地点信息',
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
      classroom_: {
        // 学生对象 >> 属性
        // id: 'id',
        // name: '教室名称',
        // comment: '备注',
        // "bluetoothAPOutputDTOList.id": '蓝牙列表',
        // "placeOutputDTO.id":'教室id',
        "placeOutputDTO.name":'教室名称',
        // "placeOutputDTO.comment":'地点信息',
        // classId: '班级ID', // 班级号：唯一ID
        // classroomId: '教室id',
        // classroom: '教室',
        // classroomName: '教室',
        // headMaster: '教室主任', // 教室主任
        // num: '人数' // 人数
      },
      currentPage: 1,
      pageSize: 50
    }
  },
  computed: {
    getBlueTooth() {
      let data = this.$store.getters.getBlueTooth;
      return data;
    },
    sdata () {
      let data = this.$store.getters.get_bindingList;
      let rule = this.rule.pick()
      console.log(rule);
      console.log(this.rule)
      if (rule.length) {
        this.currentPage = 1
      }
      rule.forEach(e => {
        data = data.filter((v, i) => {
          console.log(v["placeOutputDTO"][e]);
          if(v["placeOutputDTO"][e] != null){
            return v["placeOutputDTO"][e].includes(this.rule[e])
          }
        })
      })
      this.setData(rule, data)
      var prev = (this.currentPage - 1) * this.pageSize
      data = data.slice(prev, this.pageSize + prev)
      console.log(data);
      return data;
    },
    getClassroomSelect() {
      return this.$store.getters.get_ClassroomList;
    }
  },
  mounted () {
    // this.$store.dispatch('getClassroomList');
    this.$store.dispatch('bluetoothData');
    this.$store.dispatch('getBindingList');
    this.$store.dispatch('getClassroomList');
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
      if (this.expands.includes(row.placeOutputDTO.id)) {
        this.expands = this.expands.filter(val => val !== row.placeOutputDTO.id);
      } else {
        this.expands.splice(0,1,row.placeOutputDTO.id)
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
    handleChange (e) {
      // console.log(e)
    },
    clearSearch () {
      this.rule.classId = '' // 班级号：唯一ID
      this.rule.name = ''
      this.rule.headMaster = '' // 班主任
      this.rule.classroom = ''
    },
    sizeChange (val) {
      console.log('sizeChange ' + val)
      this.pageSize = val
    },
    currentChange (val) {
      console.log('currentChage ' + val)
      this.currentPage = val
    },
    submit (formName, classroom_) {
      // 提交添加教室信息
      console.log(classroom_)
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.$store.dispatch('addClassroom', classroom_)
          .then(() => {
            that.classroom = {};
          })
        } else {
          return false;
        }
      });
    },
    bind (formAdd, info) { // 蓝牙绑定
      let that = this;
      this.$refs[formAdd].validate((valid) => {
        if (valid) {
          this.bindVisible = false;
          this.$store.dispatch('bluetoothBind', info)
          .then(() => {
            that.bluetoothAp = {};
          })
        } else {
          return false;
        }
      });
    },
    deletes (index, row) {
      // 删除教室
      var arr = []
      // console.log(i);
      // console.log(s);
      if (row) {
        arr.push(row.classId)
      } else {
        this.selection.forEach(v => {
          arr.push(v.classId)
        })
      }
      this.$store.dispatch('deleteclassroom_', arr)
    },
    updateclassroom_ () {
      // 教室信息修改
      this.classes.cid = this.cid
      // console.log('cid' + this.classes.cid)
      this.$store.dispatch('updateclassroom_', this.classes)
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
#classroom{
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
