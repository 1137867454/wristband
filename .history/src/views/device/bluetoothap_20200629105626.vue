<template>
  <div
    id="bluetooth"
    class="wrapper"
    style="overflow-y: auto;"
  >
    <!-- bluetooth -->
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
            <el-button type="danger" size="mini" @click="deleteBatch" round><i class="el el-icon-delete" />删除</el-button>
          <span class="right" style="margin:4px;display:inline-block;">
          <!-- <label style="">班级 -->
          <!-- <el-cascader
            v-model="rule.classroom"
            size="mini"
            style="width:120px;margin-right:6px;"
            :options="options"
            clearable
            placeholder="请选择班级"
            :props="{expandTrigger: 'hover'}"
            @change="handleChange"
          /> -->
          <!-- </label> -->
          <label>场景<el-input
            v-model="rule.scenario"
            size="mini"
            style="width:110px;"
            placeholder="请输入Ap场景"
          /></label>
          <!-- <label>学号<el-input
            v-model="rule.sid"
            size="mini"
            style="width:110px;"
            placeholder="请输入学号"
          /></label> -->
          <label>mac<el-input
            v-model="rule.mac"
            size="mini"
            style="width:100px;"
            placeholder="根据mac查询"
          /></label>
          <label>蓝牙Id
            <el-input
            v-model="rule.id"
            size="mini"
            style="width:118px;"
            placeholder="根据蓝牙Id查询"
            @keydown.enter.native="wristSearch"
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
      <!-- 蓝牙添加 -->
      <el-dialog
      custom-class="dialog"
      width="500px"
      top="10vh"
      :modal="false"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      center
      title="蓝牙添加"
    >
      <el-form :rules="rules" style="width:80%;margin:0 auto;"
        class="form refuseCopy"
        size="small" ref="bluetoothAdd"
        :model="bluetooth" label-position="left"
        label-width="100px"
      >
        <el-form-item label="场景" prop="scenario">
          <el-input
            v-model="bluetooth.scenario"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="mac地址" prop="mac">
          <el-input
            v-model="bluetooth.mac"
            style="width:200px"
            autocomplete="off"
            @keydown.enter.native="submit('bluetoothAdd', bluetooth)"
          />
        </el-form-item>
        <!-- <el-form-item label="教室" prop="id">
           <el-select v-model="bluetooth.id" placeholder="请选择">
            <el-option
              v-for="item in getClassroomSelect"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
         <el-form-item>
          <el-button
            type="primary"
            @click="submit('bluetoothAdd', bluetooth)"
          >
            确 定
          </el-button>
          <el-button @click="dialogVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
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
        <!-- <el-form-item label="蓝牙Id" prop="bluetoothAPId">
          <el-input
            v-model="bluetoothAp.bluetoothAPId"
            style="width:240px"
            autocomplete="off"
          />
        </el-form-item> -->
        <!-- <el-form-item label="教室Id" prop="placeId">
          <el-input
            v-model="bluetoothAp.placeId"
            style="width:240px"
            autocomplete="off"
          />
        </el-form-item> -->
        <el-form-item label="教室" prop="placeId">
           <el-select v-model="bluetoothAp.placeId"
            placeholder="请选择教室" style="width:240px">
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
      <template>
        <el-table
          size="mini"
          row-class-name="table"
          header-cell-class-name="tableHeader"
          :data="sdata"
          height="90%"
          class="animated fadeInUp"
          @select="select"
          @select-all="selectAll"
        >
          <el-table-column
            :resizable="true"
            align="center"
            type="selection"
          />
          <!-- <el-table-column :resizable="true" v-for="(v,i) in form" align="center" :prop="v[0]" :label="v[1]" v-bind:key="i"></el-table-column> -->
           <el-table-column type="index" :index="table_index" width="70" label="序数" />
          <!-- <el-table-column
            align="center"
            prop="id"
            label="蓝牙Id"
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
            prop="schoolId"
            label="学校Id"
          /> -->
          <!-- <el-table-column
            align="center"
            prop="lostStatus"
            label="lost状态"
          /> -->
          <!-- <el-table-column
            align="center"
            prop="classroom"
            label="班级"
          />
          <el-table-column
            align="center"
            prop="address"
            label="地址"
          /> -->
          <!-- <el-table-column
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
                @click="bluetoothAp.bluetoothAPId=scope.row.id;bindVisible=true;"
              >
                绑定
              </el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="remove(scope.row.id)"
              >
                解绑
              </el-button> -->
              <el-button
                size="mini"
                type="danger"
                @click="deletes(scope.row.id)"
              >
                删除
              </el-button>
              <!-- {{scope.row}} -->
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
  name: 'bluetooth',
  components: { labelTop },
  data () {
    return {
      dialogVisible: false,
      bindVisible: false,
      labelInfo: {
        avatar: 'el-icon-set-up',
        level1: '设备管理',
        level2: '蓝牙管理',
        total: 0
      },
      bluetooth: {
        mac: ''
      },
      bluetoothAp: {
        bluetoothAPId: '',
        placeId: ''
      },
      selection: [],
      pageSize: 50,
      currentPage: 1,
      rules: {
        mac: {required: true, message: '请输入mac地址', trigger: 'blur'},
        id:  {required: true, message: '请输入教室Id', trigger: 'blur'},
        scenario: {required: true, message: '请输入scenario', trigger: 'blur'},
        bluetoothAPId: {required: true, message: '蓝牙Id', trigger: 'blur'},
        placeId:  {required: true, message: '请输入教室Id', trigger: 'blur'}
      },
      rule: {
        id: '',
        mac: '',
        scenario: '',
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
      options: this.$store.getters.getOptions,
      bluetoothData: this.$store.getters.getWristData
    }
  },
  computed: {
    getClass () {
      return this.$store.getters.getClass
    },
    getWristData () {
      return this.$store.getters.getWristData
    },
    getClassroomSelect() {
      return this.$store.getters.get_ClassroomList;
    },
    sdata() {
      let data = this.$store.getters.getBlueTooth;
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
      return data
    },
    // pickUp: {
    //   get () {
    //     let rule = this.rule.pick()
    //     let data = this.getWristData
    //     rule.forEach(e => {
    //       // if(e == 'name'){
    //       data = data.filter((v, i) => {
    //         return v[e].includes(this.rule[e])
    //       })
    //     })
    //     data = data.slice((this.currentPage - 1) * this.pageSize, this.pageSize * this.currentPage)
    //     this.setData()
    //     console.log(data)
    //     return data
    //   },
    //   set () {
    //     let data = this.$store.getters.getBlueTooth
    //     this.labelInfo.total = data.length
    //   }
    // }
  },
  mounted () {
    this.$store.dispatch('bluetoothData');
    this.$store.dispatch('getClassroomList');
  },
  methods: {
    setData () {
      let data = this.$store.getters.getBlueTooth
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
    handleChange (classroom) {
      console.log(classroom)
    },
    table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
    },
    sizeChange (v) {
      this.pageSize = v
    },
    currentChange (v) {
      this.currentPage = v
    },
    clearSearch () {
      // this.rule.classroom = ''
      // this.rule.cardId = ''
      this.rule.scenario = ''
      this.rule.mac = ''
      this.rule.bluetoothAPId = ''
    },
    submit(formName, w) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          console.log(w.mac);
          this.$store.dispatch('bluetoothAdd', w)
          .then(() => {
            that.bluetooth = {};
          })
        } else {
          return false;
        }
      });
      
    },
    remove (id) {
      this.$confirm('此操作将使该蓝牙设备与当前教室解绑，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
          console.log('continue')
      }).catch(() =>{

      })
    },
    deletes(bluetoothId) {
      this.$confirm('此操作将删除该蓝牙信息，是否继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
      }).then(() => {
        if(bluetoothId) {
          this.$store.dispatch('deleteBluetooth', bluetoothId);
        }
      }).catch(() => {

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
    pick (parameter) { // 根据条件筛选：
      console.log('keydown')
    }
  }
}
</script>
<style lang="scss">
  #bluetooth{
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
