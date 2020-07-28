<template>
  <div
    id="wristband"
    class="wrapper"
    style="overflow-y: auto;"
  >
    <!-- wristband -->
    <article style="padding:6px; 0px;height:calc(100% - 36px);">
      <div id="header">
        <div id="label">
    <i
      :class="labelInfo.avatar"
      style="font-size:16px;"
    />
    &nbsp;<span class="level1">{{ labelInfo.level1 }}</span>
    &nbsp;&nbsp;
    <!-- <el-button type="success" size="mini" @click="dialogVisible = true;" round><i class="el el-icon-circle-plus-outline" />添加</el-button>
    <el-button type="danger" size="mini" round><i class="el el-icon-delete" />删除</el-button> -->
    <span class="level2">{{ labelInfo.level2 }}</span>
  </div>
        <p id="button" class="clearfix">
            <el-button type="success" size="mini" @click="dialogVisible = true;" round><i class="el el-icon-circle-plus-outline" />添加</el-button>
            <!-- <el-button type="danger" size="mini" round>
              <i class="el el-icon-delete" />删除</el-button> -->
             <!-- @click="deleteTable" -->
          <span class="right" style="margin:4px;display:inline-block;">
          </span>
          
        </p>
      </div>
      <!-- 作息表添加 -->
      <el-dialog
      custom-class="dialog"
      width="500px"
      top="10vh"
      :modal="false"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      center
      title="添加"
    >
      <el-form :rules="rules"
        class="form refuseCopy"
        size="small" ref="formAdd"
        :model="workRest" label-position="left"
        label-width="100px" :inline="true"
      >
        <el-form-item label="作息表名称" prop="name">
            <el-input v-model="workRest.name" size="mini" style="width:220px;"></el-input>
          </el-form-item>
        <el-form-item label="期限" prop="time">
          <el-date-picker :picker-options="pickerOptions"
          v-model="workRest.time" value-format="yyyy-MM-dd HH:mm:ss"
          size="mini" style="width:340px;"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        </el-form-item>
        <i v-for="(v,i) in number" :key="i">
          <!-- {{workRest.items[i]}} --{{i}} -->
        <el-form-item :label="'作息表项 ' + v" prop="">
            <el-input v-model="workRest.items[i].name" size="mini" style="width:220px;"></el-input>
          </el-form-item>
        <el-form-item label="起始时间">
          <el-time-picker value-format="HH:mm:ss" format="HH:mm"
            v-model="workRest.items[i].startTime"
            placeholder="开始">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-time-picker value-format="HH:mm:ss" format="HH:mm"
            @keydown.native.enter="submit('formAdd', workRest)"
            v-model="workRest.items[i].endTime"
            :picker-options="{
              selectableRange: '0:00:00 - 23:59:59'
            }"
            placeholder="结束">
          </el-time-picker>
        </el-form-item>
        </i>
        <el-button style="margin-left:20px;" type="success" circle size="mini" @click="number++;workRest.items.push({})"><i class="el-icon-circle-plus-outline"></i></el-button>
        <el-button size="mini" type="danger" circle v-if="number>1" @click="number--;workRest.items.pop()"><i class="el-icon-delete"></i></el-button>
         <el-form-item style="text-align:center;display:inline-block;width:100%;">
          <el-button
            type="primary"
            @click="submit('formAdd', workRest)"
          >
            确 定
          </el-button>
          <el-button @click="dialogVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
      <!-- 作息表修改 -->
      <el-dialog
      custom-class="dialog"
      width="500px"
      top="10vh"
      :modal="false"
      :visible.sync="updateVisible"
      :destroy-on-close="true"
      center
      title="修改"
    >
      <el-form :rules="rules"
        class="form refuseCopy"
        size="small" ref="formUpdate"
        :model="workRest_" label-position="left"
        label-width="100px" :inline="true"
      >
        <el-form-item label="作息表名称" prop="name">
            <el-input v-model="workRest_.name" size="mini" style="width:220px;"></el-input>
          </el-form-item>
        <el-form-item label="期限" prop="time">
          <el-date-picker :picker-options="pickerOptions"
          v-model="workRest_.time" value-format="yyyy-MM-dd HH:mm:ss"
          size="mini" style="width:340px;"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        </el-form-item>
         <el-form-item style="text-align:center;display:inline-block;width:100%;">
          <el-button
            type="primary"
            @click="update('formUpdate', workRest_)"
          >
            确 定
          </el-button>
          <el-button @click="updateVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
      <el-dialog
      custom-class="dialog"
      width="500px"
      top="10vh"
      :modal="false"
      :visible.sync="update_Item_Visible"
      :destroy-on-close="true"
      center
      title="作息表项修改"
    >
      <el-form :rules="rules"
        class="form refuseCopy"
        size="small" ref="formUpdateItem"
        :model="update_Item" label-position="left"
        label-width="100px" :inline="true"
      >
        <el-form-item label="名称" prop="name">
            <el-input v-model="update_Item.name" size="mini" style="width:200px;"></el-input>
          </el-form-item>
        <el-form-item label="起始时间" prop="startTime">
        <el-time-picker value-format="HH:mm:ss" format="HH:mm" style="width:200px;"
        v-model="update_Item.startTime" size="mini"
        default-value="" placeholder="开始">
        </el-time-picker>
        </el-form-item>
        <el-form-item label="结束" prop="endTime">
           <el-time-picker value-format="HH:mm:ss" format="HH:mm" style="width:200px;"
                        v-model="update_Item.endTime" size="mini"
                        default-value="" placeholder="结束"
                        @click="('formUpdateItem', update_Item)">
           </el-time-picker>
        </el-form-item>
          
         <el-form-item style="text-align:center;display:inline-block;width:100%;">
          <el-button
            type="primary"
            @click="updateItem('formUpdateItem', update_Item)"
          >
            确 定
          </el-button>
          <el-button @click="update_Item_Visible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
      <template style="height:90%">
        <el-table
          size="mini"
          row-class-name="table"
          header-cell-class-name="tableHeader"
          :data="sdata"
          height="90%" ref="refTable"
          class="animated fadeInUp"
          :row-key="getRowKey"
          :expand-row-keys="expands"
          @row-dblclick="dblclick"
          @select="select"
          @select-all="selectAll"
          @expand-change="expandChange"
        >
          <el-table-column
            :resizable="true"
            align="center"
            type="selection"
          />
           <el-table-column type="index" :index="table_index" width="50" label="序数" />
           <el-table-column type="expand" width="24">
            <template slot-scope="props">
              <div class="scheduleCard">
                <ul class="timetable">
                  <li class="table_header">
                    <span>节数</span>
                    <span>课时</span>
                    <span>操作</span>
                  </li>
                  <li class="loop" v-for="(v,i) in itemList" :key="i" style="display:flex;text-align:center;">
                    <span class="borderBottom">{{v.name}}</span>
                    <span class="borderBottom">{{v.startTime.slice(0,5)}} —— {{v.endTime.slice(0,5)}}</span>
                    <span class="borderBottom">
                      <el-button style="margin-top:5px;" @click="remove(v, props.row)" size="mini" type="danger" plain>删除</el-button>
                      <el-button style="margin-top:5px;" size="mini" type="primary" plain @click="itemUpdateAssign(v, props.row)">修改</el-button>
                    </span>
                  </li>
                  <el-button v-if="!itemShow"  @click="itemShow=true;" style="position:absolute;right:-50px;bottom:0px;" type="success" circle size="mini">
                    <i class="el-icon-circle-plus-outline"></i>
                  </el-button>
                  <li class="itemShow" v-if="itemShow">
                    <span class="show">
                      <el-input class="text" size="mini" style="font-size:14px;text-align:center;width:100px;border:none !important;" v-model="number_">第{{itemList.length + 1}}节</el-input>
                    </span>
                    <span class="show">
                       <el-time-picker value-format="HH:mm:ss" format="HH:mm" style="width:116px;"
                        v-model="workRest_Item.startTime" size="mini"
                        default-value="" placeholder="开始">
                        </el-time-picker> ——
                       <el-time-picker value-format="HH:mm:ss" format="HH:mm" style="width:116px;"
                        v-model="workRest_Item.endTime" size="mini"
                        default-value="" placeholder="结束">
                        <!-- :picker-options="{
                          selectableRange: '18:30:00 - 20:30:00'
                        }" -->
                        </el-time-picker>
                    </span>
                    <span class="show">
                      <i :class="hoverSuccess?'el-icon-success':'el-icon-circle-check'"
                       @mouseover="hoverSuccess=true"  @mouseleave="hoverSuccess=false"
                       @click="addItem(props.row.id)" style="color:#0c6;font-size:22px;margin-right:20px;"></i>
                      <!-- <i class="el-icon-success" style="color:#0c6;font-size:20px;"></i> -->
                      <i :class="hoverError?'el-icon-error':'el-icon-circle-close'"
                       @mouseover="hoverError=true"  @mouseleave="hoverError=false"
                       @click="cancel" style="color:#f56c6c;font-size:22px;margin-left:20px;"></i>
                      <!-- <i class="el-icon-error" style="color:#f56c6c;font-size:20px;"></i> -->
                    </span>
                  </li>
                </ul>
                <!-- {{props.row.name}} -->

              <!-- <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="Id">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                  <span>{{ props.row.studentName }}</span>
                </el-form-item> -->
              </div>
                <!-- <el-form-item label="内部班级ID">
                  <span>{{ props.row.internalClassId }}</span>
                </el-form-item> -->
              <!-- </el-form> -->
            </template>
          </el-table-column>
          <!-- <el-table-column :resizable="true" v-for="(v,i) in form" align="center" :prop="v[0]" :label="v[1]" v-bind:key="i"></el-table-column> -->
          <!-- <el-table-column
            align="center"
            prop="id"
            label="作息表ID"
          /> -->
          <el-table-column
            align="center"
            prop="name"
            label="作息表名"
          />
          <el-table-column
            align="center"
            prop="startAt"
            label="起始时间"
          />
          <el-table-column
            align="center"
            prop="endAt"
            label="结束时间"
          />
          <el-table-column v-if="role == 'schoolManager'"
            align="center"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="workRest_.id= scope.row.id;updateVisible = true;"
              >
              <!-- {{scope.row}} -->
                修改
              </el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="deleteTable(scope.row.id)"
              >
                删除
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
      number: 1, // 添加表项
      number_: '',
      role: '',
      dialogVisible: false,
      updateVisible: false,
      update_Item_Visible: false,
      showOptions: false,
      classifyArr: [],
      expands: [], //展开行,
      getRowKey(row) {
        return row.id;
      },
      labelInfo: {
        avatar: 'el-icon-date',
        level1: '作息管理',
        level2: '',
        total: 0
      },
      pickerOptions: {
       disabledDate: (time) => {
         let nowData = new Date()
         nowData = new Date(nowData.setDate(nowData.getDate() - 1))
         return time < nowData;
       }
      },
      workRest: {
        time: '',
        timeIn: [],
        "startAt": "",
        "endAt": "",
        "name": "",
        // "name": "", //作息表名称
        "items": [{
            "name": '',
            "endTime": '',
            'startTime': ''
          }]
      },
      workRest_: {
        time: '',
        "startAt": "",
        "endAt": "",
        "name": "",
      },
      workRest_Item: {
        "name": '',
        "endTime": '',
        'startTime': ''
      },
      update_Item: {
        "endTime": "",
        "id": '',
        "name": "",
        "startTime": "",
        "tableId": ''
      },
      hoverSuccess: false,
      hoverError: false,
      itemList: [],
      itemShow: false,
      pageSize: 10,
      currentPage: 1,
      rules: {
        time: {required: true, message: '请输入使用期限', trigger: 'blur'},
        name: {required: true, message: '请输入作息表名称', trigger: 'blur'},
        "items[0].name": {required: true, message:'请输入学生Id', trigger: 'blur'},
        startTime: {required: true, message: '请输入开始时间', trigger: 'blur'},
        endTime: {required: true, message: '请输入结束时间', trigger: 'blur'}
      },
      rule: {
        classroom: '',
        name: '',
        id: '',
        cardId: '',
        mac: '',
        wristId: '', // 作息表编号
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
      wristbandData: this.$store.getters.getWristData
    }
  },
  computed: {
    getClass () {
      return this.$store.getters.getClass
    },
    getWristData () {
      return this.$store.getters.getWristData
    },
    getOptions() {
      return this.$store.getters.getOptions;
    },
    getStudentName() {
      let data = this.$store.getters.getStudents;
      console.log('.....')
      console.log(this.bandBind);
      console.log(data)
      let gradeId = '0';
      let classId = '0';
      if(this.bandBind.classInfo && this.bandBind.classInfo.length){
        gradeId = this.bandBind.classInfo[0];
        classId = this.bandBind.classInfo[1]
      }
      data = data.filter(v => {
        return v.gradeId == gradeId && v.classId == classId ;
      })
      return data
    },
    sdata () {
      console.log('sdata触发')
      let data = this.$store.getters.get_schedule;
      return data
    }
  },
  mounted () {
    this.$store.dispatch('getActivityTableList');
    this.role = localStorage.getItem('role')
  },
  methods: {
    setData () {
      let data = this.$store.getters.getWristData
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
    expandChange(row, expandedRows) {
      var that = this;
      this.itemShow = false;
      console.log(row.id)
      this.$store.dispatch('getActivityItemList', row.id)
      .then( res => {
        this.itemList = res;
      })
    if (expandedRows.length>1) {
//         that.expands = []
        if (row) {
//             that.expands.push(row);
        }
        this.$refs.refTable.toggleRowExpansion(expandedRows[0]);
    } else {
//         that.expands = [];
    }
    },
    dblclick(row, cloumn, event) {
      console.log(row);
      this.itemShow = false;
      this.$store.dispatch('getActivityItemList', row.id)
      .then(res => {
        console.log('dblclick')
        this.itemList = res;
        console.log(res);
      })
      if (this.expands.includes(row.id)) {
        this.expands = this.expands.filter(val => val !== row.id);
      } else {
        this.expands.splice(0,1,row.id)
        // this.expands.pop();
        // this.expands.push(row.sid);
      }
    },
    table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
    },
    handleChange (classroom) {
      console.log(classroom)
    },
    sizeChange (v) {
      this.pageSize = v
    },
    currentChange (v) {
      this.currentPage = v
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
      this.rule.gradeId = ''
      this.rule.classId = '';
      this.classifyArr = [];
      this.rule.id = '';
      this.rule.mac = '';
    },
    submit(formAdd, w) {
      let that = this;
      this.$refs[formAdd].validate((valid) => {
        if (valid) {
          let time = w.time;
          this.workRest.startAt = time[0];
          this.workRest.endAt = time[1];
          this.dialogVisible = false;
          this.$store.dispatch('workRestAdd', w)
          .then(() => {
            console.log('success')
            this.number = 1;
            this.workRest = {
            time: '',
            timeIn: [],
            "startAt": "",
            "endAt": "",
            "items": [{
                "name": '',
                "endTime": '',
                'startTime': ''
              }]
          };
            this.dialogVisible = false;
          })
        } else {
          return false;
        }
      });
      console.log(w);
    },
    deleteTable(id) {
      if(this.role == 'schoolManager') {
        this.$confirm('此操作将删除所选作息表,是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch('deleteWorkRest', id);
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '取消成功',
          duration: 1000
        })
      })
      }else{
        this.$message({
          type: 'error',
          message: '您的权限不够'
        })
      }
      
    },
    update(formUpdate, w) { //更新作息表
      console.log(w);
      let that = this;
      this.$refs[formUpdate].validate((valid) => {
        if (valid) {
          let time = w.time;
          this.workRest_.startAt = time[0];
          this.workRest_.endAt = time[1];
          this.dialogVisible = false;
          this.$store.dispatch('updateWorkRest', w)
          .then(() => {
            that.workRest_ = {};
            that.updateVisible = false;
          })
        } else {
          return false;
        }
      });
    },
    addItem(id) { //添加作息表项
      console.log(this.number_);
      this.workRest_Item.tableId = id;
        this.workRest_Item.name = this.number_;
      if(this.number_.trim()){
        this.workRest_Item.name = this.number_;
      }else{
        this.$message({
          type: 'error',
          message: '请输入表项名称'
        })
        return ;
        this.workRest_Item.name = '第'+ (this.itemList.length + 1) +'节'
      }
      console.log(this.workRest_Item)
      console.log('addItem');
      this.$store.dispatch('workRestItemAdd', this.workRest_Item)
      .then(() => {
        this.itemShow = false;
        this.$store.dispatch('getActivityItemList', id)
        .then(res => {
          console.log('dblclick')
          this.itemList = res;
        })
      })
    },
    cancel() {
      this.itemShow = false;
      this.workRest_Item = {};
      console.log('cancel')
    },
    remove (info, row) {
      if(this.role === 'schoolManager') {
        this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.dispatch('deleteItem', info.id)
        .then(() => {
          this.$store.dispatch('getActivityItemList', row.id)
          .then(res => {
            this.itemList = res;
            console.log(res);
          })
        })
      }).catch(() => {

      })
      }else{
        this.$message({
          type: 'error',
          message: '您的权限不够'
        })
      }
      
    },
    itemUpdateAssign(v, row) {
      if(this.role == 'schoolManager'){
        this.update_Item_Visible = true;
        this.update_Item.name = v.name;
        this.update_Item.startTime = v.startTime;
        this.update_Item.endTime = v.endTime;
        this.update_Item.id = v.id;
        this.update_Item.tableId = row.id;
      }else {

      }
    },
    updateItem(a, table) {
      console.log(a);
      this.$refs[a].validate((valid) => {
        if(valid) {
          console.log(table)
        this.$store.dispatch('updateItemList', table)
        .then((res) => {
          this.update_Item_Visible = false;
          this.itemList = res;
        })
        }else{
          return false;
        }
      })
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
        label{
          margin-right: 5px;
          .el-input{
            margin-left:3px;
              margin-right:4px;
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
  #label{
    background:#f5f5f5;border:solid 1px #f1f2f3;padding:8px 8px;font-size:12px;color:#909399;
    position:relative;
  .level1{
    color:#39f;
  }
  .level2{
    color:#666;
  }
}
.scheduleCard{
  font-size:14px;
  // border:solid 1px;
  .timetable{
    position:relative;width:80%;
    margin:0 auto;border:solid 1px #aaa;
    color:#333;border-bottom: none;
    .table_header{
      display:flex;text-align:center;
      background:rgb(233,237,241);
      span{
        border-bottom:solid 1px #aaa;
        padding:5px 6px;
        &:nth-child(1){
          flex:1;border-right:solid 1px #aaa;
        }
        &:nth-child(2){
          flex:2;border-right:solid 1px #aaa;
        }
        &:nth-child(3){
          flex:1;
        }
      }
    }
    .loop{
      display:flex;text-align:center;
      span.borderBottom{
        border-bottom:solid 1px #aaa;
        padding:5px 6px;
        &:nth-child(1){
          flex:1;
          border-right:solid 1px #aaa;
        }
        &:nth-child(2){
          flex:2;
          border-right:solid 1px #aaa;
        }
        &:nth-child(3){
          flex:1;
          padding:0 6px;
        }
      }
    }
    .itemShow{
      display:flex;text-align:center;
      // border-top:solid 1px #aaa;
      span.show{
        border-bottom:solid 1px #aaa;
        padding:10px;
        .text{
          text-align:center;
          border:none ;
        }
        &:nth-child(1){
          flex:1;padding:7px 10px 0;
          border-right:solid 1px #aaa;
        }
        &:nth-child(2){
          flex:2;padding:7px 10px 0;
          border-right:solid 1px #aaa;
        }
        &:nth-child(3){
          flex:1;padding:10px;
        }
      }
    }
  }
}
</style>
