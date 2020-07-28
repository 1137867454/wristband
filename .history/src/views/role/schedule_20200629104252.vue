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
        <i class="el el-icon-circle-plus-outline" />课程表
      </el-button>
      <el-button
        size="mini"
        type="danger"
        round
        @click="deleteBatch"
      >
        <i class="el el-icon-delete" />删除
      </el-button>
      <!-- <el-button v-if="courseTableVisible" type="warning" v-text="overviewVisible?'课程表总览':'返回'" size="mini" @click="overviewVisible = !overviewVisible" round plain>
      </el-button> -->
      <el-button
        size="mini"
        type="success"
        round
        @click="courseVisible = true"
        plain
      >
        课程添加
      </el-button>
      <el-button type="primary" v-text="courseTableVisible?'课程查询':'返回'" size="mini" @click="courseTableVisible = !courseTableVisible" round plain>
      </el-button>
      <!-- <el-button size="mini" round class="right"><i class="el-icon-search"></i>查询</el-button> -->
      <!-- <el-input class="right" v-model="search" size="mini"
      placeholder="输入关键字搜索"  style="width:180px;" />-->
      <span class="right" :hidden="!courseTableVisible">
        <!-- <label v-if="showOptions">年级
          <el-select v-model="rule.gradeId" class="pickInput" clearable
           placeholder="请选择年级" size="mini">
            <el-option 
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </label> -->
        <!-- {{getGrade}}
        <label style="margin-left:4px;">
        年级
        <el-select v-model="rule.id" 
        clearable 
        filterable placeholder="请选择">
          <el-option
            v-for="item in getGrade"
            :key="item.id"
            :label="item.gradeName"
            :value="item.id">
          </el-option>
          </el-select>
        </label> -->
        <label style="margin-left:4px;">
        年级&班级
        <el-cascader v-if="getOptions && getOptions.length"
          v-model="classifyArr"
          class="pickInput"
          size="mini"
          :options="getOptions"
          clearable
          placeholder="请选择班级"
          :props="{expandTrigger: 'hover'}"
          @change="handleChange"
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
    <!-- dialogVisible schedule新建弹窗 el-dialog -->
    <el-dialog :modal="false"
      custom-class="dialog"
      width="500px"
      top="10vh"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      center
      title="新建"
    >
      <el-form :rules="rules" ref="formName"
        class="form"
        size="small" label-position="left"
        :model="schedule"
        label-width="100px"
      >
        <el-form-item label="作息表" prop="activityTableId">
          <el-select v-model="schedule.activityTableId" placeholder="请选择">
            <el-option
              v-for="item in getSchedule"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classifyArr_add">
          <el-cascader
            v-model="schedule.classifyArr_add"
            size="mini" :multiple="true"
            :options="getOptions"
            clearable
            placeholder="请选择班级"
            @change="transformId"
          />
        </el-form-item>
        <el-form-item label="课表名" prop="name">
          <el-input size="mini"
            v-model="schedule.name"
            style="width:200px;font-size:12px;"
            @keydown.native.enter="submit('formName', schedule);"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submit('formName', schedule)"
          >
            确 定
          </el-button>
          <el-button @click="dialogVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- courseVisible 课程新建弹窗 el-dialog -->
    <el-dialog :modal="false"
      custom-class="dialog"
      width="500px"
      top="10vh"
      :visible.sync="courseVisible"
      :destroy-on-close="true"
      center
      title="课程添加"
    >
      <el-form :rules="rules" ref="course"
        class="form" @submit.native.prevent
        size="small" label-position="left"
        :model="table"
        label-width="100px"
      >
        <el-form-item label="课程名" prop="name">
          <el-input size="mini"
            v-model="table.name"
            style="width:200px"
             @keydown.native.enter="submitCourse('course', table);"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitCourse('course', table)"
          >
            确 定
          </el-button>
          <el-button @click="courseVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 学生信息列表 -->
    <div style="height:calc(100% - 80px);background:rgba(255,255,255,0.6);">
      <div class="height_100" v-if="courseTableVisible">
        <template v-if="overviewVisible" style="height:90%">
        <el-table
          size="mini"
          row-class-name="table"
          header-cell-class-name="tableHeader"
          :data="sdata"
          height="100%" ref="refTable"
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
              <!-- {{itemList.perDayCourseList[6]}} -->
              <div class="scheduleCard"  style="height:390px;">
                <p style="position:absolute;top:0;color:#39f;">修改时，点击对应课程，输入新课程名，随后敲击回车即可</p>
                <ul v-if="itemList" class="timetable  refuseCopy animated fadeIn">
                  <li class="weekCourse center" style="">
                    <ul class="" style="">
                      <li>节数</li>
                      <li v-for="(time, ti) in itemList.perDayCourseList[0].dayCourseList" :key="ti">
                        第{{ti + 1}}节
                      </li>
                    </ul>
                    <ul class="" style="flex:2;">
                      <li>
                        课时
                      </li>
                      <li style="height:30px;line-height:30px;font-size:14px;" v-for="(time, ti) in itemList.perDayCourseList[0].dayCourseList" :key="ti">
                        {{time.startTime.substring(0,time.startTime.length-3)}}——{{time.endTime.substring(0,time.startTime.length-3)}}
                      </li>
                    </ul>
                     <ul class="" style="" v-for="(v, i) in itemList.perDayCourseList" :key="i">
                      <li>{{v.weekday}}</li>
                      <!-- <li style="flex:2;">8:00</li> -->
                      <li v-for="(vc, index) in v.dayCourseList" :key="index">
                        <input :class="vc.courseName.length>5?'font10':'refInput'" :ref="'input' + vc.id" type="text" style="border:none;"
                        v-model="vc.courseName" onkeyup="if(window.event.keyCode == 13){this.blur();}"
                          @keydown.enter="updateCourseItem(vc.id)">
                      </li>
                    </ul>
                    <!-- <span class="borderBottom">{{v.name}}</span>
                    <span class="borderBottom">{{v.startTime.slice(0,5)}} —— {{v.endTime.slice(0,5)}}</span>
                    <span class="borderBottom">
                      <el-button style="margin-top:5px;" @click="remove(v, props.row)" size="mini" type="danger" plain>删除</el-button>
                      <el-button style="margin-top:5px;" size="mini" type="primary" plain @click="itemUpdateAssign(v, props.row)">修改</el-button>
                    </span> -->
                  </li>
                  <!-- <el-button v-if="!itemShow"  @click="itemShow=true;" style="position:absolute;right:-50px;bottom:0px;" type="success" circle size="mini">
                    <i class="el-icon-circle-plus-outline"></i>
                  </el-button> -->
                  <li class="table_content" v-if="itemShow">
                    <ul class="week">
                      <li>2</li>
                      <li style="flex:2;">2</li>
                      <li>3</li>
                      <li>4</li>
                      <li>5</li>
                      <li>6</li>
                      <li>7</li>
                      <li>8</li>
                      <li>8</li>
                      <li><i :class="hoverSuccess?'el-icon-success':'el-icon-circle-check'"
                       @mouseover="hoverSuccess=true"  @mouseleave="hoverSuccess=false"
                       @click="addItem(props.row.id)" style="color:#0c6;font-size:22px;margin-right:0px;"></i>
                      <i :class="hoverError?'el-icon-error':'el-icon-circle-close'"
                       @mouseover="hoverError=true"  @mouseleave="hoverError=false"
                       @click="cancel" style="color:#f56c6c;font-size:22px;margin-left:0px;"></i></li>
                    </ul>
                    <!-- <span class="show">
                      <el-input class="text" size="mini" style="border:none;font-size:14px;text-align:center;width:100px;border:none !important;" >第{{itemList.length + 1}}节</el-input>
                    </span>
                    <span class="show">
                      <el-input class="text" size="mini" style="font-size:14px;text-align:center;width:100px;border:none !important;" >第{{itemList.length + 1}}节</el-input>
                    </span>
                    <span class="show">
                      <el-input class="text" size="mini" style="font-size:14px;text-align:center;width:100px;border:none !important;" >第{{itemList.length + 1}}节</el-input>
                    </span>
                    <span class="show">
                      <el-input class="text" size="mini" style="font-size:14px;text-align:center;width:100px;border:none !important;" >第{{itemList.length + 1}}节</el-input>
                    </span> -->
                    <!-- <span class="show">
                       <el-time-picker value-format="HH:mm:ss" format="HH:mm" style="width:116px;"
                        v-model="workRest_Item.startTime" size="mini"
                        default-value="" placeholder="开始">
                        </el-time-picker> ——
                       <el-time-picker value-format="HH:mm:ss" format="HH:mm" style="width:116px;"
                        v-model="workRest_Item.endTime" size="mini"
                        default-value="" placeholder="结束">
                        </el-time-picker>
                    </span>
                    <span class="show">
                      <i :class="hoverSuccess?'el-icon-success':'el-icon-circle-check'"
                       @mouseover="hoverSuccess=true"  @mouseleave="hoverSuccess=false"
                       @click="addItem(props.row.id)" style="color:#0c6;font-size:22px;margin-right:20px;"></i>
                      <i :class="hoverError?'el-icon-error':'el-icon-circle-close'"
                       @mouseover="hoverError=true"  @mouseleave="hoverError=false"
                       @click="cancel" style="color:#f56c6c;font-size:22px;margin-left:20px;"></i>
                    </span> -->
                  </li>
                </ul>
              </div>
            </template>
          </el-table-column>
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
          <!-- <el-table-column
            align="center"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="updateVisible = true;"
              >
              <!-- {{scope.row}} -->
                修改 
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deletes(scope.row.id, 'schedule')"
              >
                删除
              </el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </template>
      <div  v-else id="overviewTimeTable" class="refuseCopy animated fadeIn">
            <!-- {{itemList.perDayCourseList[0]}} -->
            <div class="tableWrapper">    <!-- 课表总览外边框 -->
              <ul class="timetableRow ">  <!-- 课表总览内框 -->
                <li class="classifyClass">班别</li>
                <li class="timetableHeader">
                  <p class="timetableWeek">星期一</p>
                  <ul class="itemClassify">
                    <li class="timetableNumber" v-for="v in 12" :key="v">{{v}}</li>
                  </ul>
                </li>
                <li class="timetableHeader">
                  <p class="timetableWeek">星期一</p>
                  <ul class="itemClassify">
                    <li class="timetableNumber" v-for="v in 12" :key="v">{{v}}</li>
                  </ul>
                </li>
                <li class="timetableHeader">
                  <p class="timetableWeek">星期一</p>
                  <ul class="itemClassify">
                    <li class="timetableNumber" v-for="v in 12" :key="v">{{v}}</li>
                  </ul>
                </li>
                <li class="timetableHeader">
                  <p class="timetableWeek">星期一</p>
                  <ul class="itemClassify">
                    <li class="timetableNumber" v-for="v in 12" :key="v">{{v}}</li>
                  </ul>
                </li>
                <li class="timetableHeader">
                  <p class="timetableWeek">星期一</p>
                  <ul class="itemClassify">
                    <li class="timetableNumber" v-for="v in 12" :key="v">{{v}}</li>
                  </ul>
                </li>
                <li class="timetableHeader">
                  <p class="timetableWeek">星期一</p>
                  <ul class="itemClassify">
                    <li class="timetableNumber" v-for="v in 12" :key="v">{{v}}</li>
                  </ul>
                </li>
                <li class="timetableHeader">
                  <p class="timetableWeek">星期一</p>
                  <ul class="itemClassify">
                    <li class="timetableNumber" v-for="v in 12" :key="v">{{v}}</li>
                  </ul>
                </li>
              </ul>
              <!-- 班级对应课程表 -->
              <ul class="timetableRow">  <!-- 课表总览内框 -->
                <li class="everyClass">班别</li>
                <li class="timetableHeader" style="height:20px;">
                  <!-- <p class="timetableWeek">星期一</p> -->
                  <ul class="itemClassify">
                    <li class="timetableNumber" v-for="v in 12" :key="v">{{v}}</li>
                  </ul>
                </li>
              </ul>
            <!-- <ul class="timetableRow">
              <li class="className">初一1班</li>
              <li>
                <ul class="itemClassify">
                  <li class="timetableNumber" v-for="v in 12" :key="v">语</li>
                </ul>
              </li>
            </ul> -->
            </div>
          <!-- </li>
        </ul> -->
      </div>
      </div>
      <!-- v-if="overviewVisible" -->
      <template v-else style="height:90%">
        <el-table
          size="mini"
          row-class-name="table"
          header-cell-class-name="tableHeader"
          :data="sdata_"
          height="100%" 
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
           <!-- <el-table-column type="expand" width="24">
            <template slot-scope="props">
              {{props.row.name}}
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            align="center"
            prop="id"
            label="课程id"
          /> -->
          <el-table-column
            align="center"
            prop="name"
            label="课程"
          />
          <!-- <el-table-column
            align="center"
            prop="startAt"
            label="起始时间"
          />
          <el-table-column
            align="center"
            prop="endAt"
            label="结束时间"
          /> -->
          <el-table-column
            align="center"
            label="操作"
            width="160"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="updateVisible = true;"
              >
                修改
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deletes(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 学生信息修改框 -->
    <el-dialog
      custom-class="dialog"
      width="500px"
      top="10vh" :modal="false"
      :visible.sync="updateVisible"
      :destroy-on-close="true"
      center @close="updateClose"
      title="修改"
    >
      <el-form :rules="rules" ref="updateCourse"
        class="form"
        size="small" label-position="left"
        :model="schedule"
        label-width="100px"
      >
        <el-form-item label="作息表" prop="activityTableId">
          <el-select v-model="schedule.activityTableId" placeholder="请选择">
            <el-option
              v-for="item in getSchedule"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classifyArr_add">
          <el-cascader
            v-model="schedule.classifyArr_add"
            size="mini" :multiple="true"
            :options="getOptions"
            clearable
            placeholder="请选择班级"
            @change="transformId"
          />
        </el-form-item>
        <el-form-item label="课表名" prop="name">
          <el-input size="mini"
            v-model="schedule.name"
            style="width:200px;font-size:12px;"
            @keydown.native.enter="updateClass_('updateCourse', schedule);"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="updateClass_('updateCourse', schedule)"
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
        level1: '班级管理',
        level2: '课表管理',
        total: 0
      },
      expands: [], //展开行,
      getRowKey(row) {
        return row.id;
      },
      classifyArr: [], //通过年级和班级分类查询
      table: {
        name: ''
      },
      rowKey: '',
      search: '',
      selection: [],
      dialogVisible: false,
      courseVisible: false,
      updateVisible: false,
      overviewVisible: true,
      courseTableVisible: true,
      itemShow: false,
      classId: '', // 修改用户信息所需的classId
      // options: this.$store.getters.getOptions, // 班级列表
      itemList: '',
      hoverSuccess: false,
      hoverError: false,
      newCourseName: '',
      schedule: {
        "classId": "", // 班级号：唯一ID
        "name": "",
        // gradeId: "",
        classifyArr_add: [],
        "activityTableId": "",
        // headMaster: '', // 班主任
        // num: '', // 人数
        // date: ''
      },
      rules: {
        activityTableId: {required: true, message: '请输入班级内部id', trigger: 'blur'},
        name: {required: true, message: '该信息不能为空', trigger: 'blur'},
        classInfo: {required: true, message: '请选择所在年级', trigger: 'blur'},
        classifyArr_add: {required: true, message: '请选择班级', trigger: 'blur'}
      },
      rule: {
        classId: '', // 班级号：唯一ID
        gradeName: '',
        headMaster: '', // 班主任
        id: '',
        pick: function () {
          var pickArr = [];
          for (let i in this) {
            if (this[i] !== '' && typeof this[i] != 'object') {
              pickArr.push(i)
            }
          }
          pickArr.pop()
          return pickArr
        }
      },
      class_: {
        // 学生对象 >> 属性
        name: '课程'
        // gradeName: '年级',
        // className: '班名',
        // gradeId: '年级id', //
        // id: '班级id', //
        // internalClassId: '内部id', //
        // headMaster: '班主任', // 班主任
        // classId: '班级', // 班级号：唯一ID
        // num: '人数', // 人数
        // date: '创建日期'
      },
      currentPage: 1,
      pageSize: 50
    }
  },
  computed: {
    getOptions() {
      // let data = this.$store.getters.getOptions;
      // data.push({id: '0', gradeName: '无'});
      return this.$store.getters.getOptions;
    },
    getGrade() {
      return this.$store.getters.getGrade;
    },
    getSchedule() {
      return this.$store.getters.get_schedule;
    },
    sdata () {
      this.courseTableVisible;
      let data = this.$store.getters.getCourseTable;
      let rule = this.rule.pick();
      console.log(rule)
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
      console.log(this.pageSize)
      console.log(data);
      return data
    },
    sdata_() {
      this.courseTableVisible;
      let data = this.$store.getters.get_CourseList;
      console.log('data_', data)
      let rule = this.rule.pick()
      // console.log(rule)
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
      console.log(this.pageSize)
      console.log(data);
      return data
    }
  },
  beforeMount() {
  },
  mounted () {
    this.$store.dispatch('getCourseTable');
    this.$store.dispatch('getActivityTableList');
    // this.$store.dispatch('GradeList');
    // this.$store.dispatch('getClassSelect')
    // .then(res => {
    //   this.showOptions = true;
    //   this.res = res
    // });
    this.$store.dispatch('getCourseList');
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
    expandChange(row, expandedRows) {
      var that = this;
      this.itemShow = false;
      console.log(row.classId);
      this.$store.dispatch('getCourseTableItem', row.classId)
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
      console.log('.....', row);
      this.itemShow = false;
      this.$store.dispatch('getCourseTableItem', row.classId)
      .then(res => {
        this.itemList = res;
        console.log(res);
        if(timer) clearTimeout(timer);
        let timer = setTimeout(() => {
          let input = document.querySelectorAll('.refInput');
          for(let v of input) {
            v.onclick = null
          }
        },100)
      })
      if (this.expands.includes(row.id)) {
        this.expands = this.expands.filter(val => val !== row.id);
      } else {
        this.expands.splice(0,1,row.id)
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
      if(e && e.length>1){
        // this.rule.gradeId = e[0];
        this.rule.classId = e[1];
      }else{
        this.rule.classId = ''
        this.rule.gradeId = '';
        this.rule.id = '';
      }
    },
    transformId(arr) {
      if(arr && arr.length){
        if(arr.length > 1){
          this.schedule.classId = arr[1];
          this.schedule.gradeId = arr[0];
        }else{
          this.schedule.gradeId = arr[0];
        }
      }
      console.log(arr);
    },
    clearSearch () {
      this.rule.id = '' // 班级号：唯一ID
      // this.rule.name = ''
      this.classifyArr = [];
      this.rule.gradeId = ''
      this.rule.classId = ''
      this.rule.grade = ''
      this.rule.name = '';
    },
    sizeChange (val) {
      console.log('sizeChange ' + val)
      this.pageSize = val
    },
    currentChange (val) {
      console.log('currentChage ' + val)
      this.currentPage = val
    },
    submit (formName, schedule) {
      // 提交添加学生信息
      console.log(schedule);
      // this.$store.dispatch('addschedule', schedule);
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
        this.$store.dispatch('scheduleAdd', schedule)
          .then(() => {
            that.dialogVisible = false;
            that.schedule = {};
            that.schedule.classifyArr_add = '';
          })
        } else {
          return false;
        }
      });
    },
    submitCourse(formName, table) {
      // this.$store.dispatch('addtable', table);
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
        this.$store.dispatch('courseAdd', table)
          .then(() => {
            that.courseVisible = false;
            that.table = {};
          })
        } else {
          return false;
        }
      });
    },
    addItem() {
      console.log('addItem')
    },
    cancel() {
      // console.log('cancel')
      this.itemShow = false;
    },
    deletes (id, command) {
      // 删除课程表
      console.log(id);
      this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if(command){ //schedule

        console.log(command)
        }else{ //course
        console.log(command)
        
        }
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
      this.schedule = {};
    },
    updateCourseItem(id) {
      // console.log(id, newCourseName);
      let input = 'input' + id;
      console.log(this.$refs[input]);
      let newCourseName = this.$refs[input][0].value;
      // this.$refs[input].onblur();
      console.log(this.$store.getters.get_CourseList)
      if(newCourseName.trim()){
        let list = this.$store.getters.get_CourseList;
        this.$store.dispatch('updateCourseItem', {id, newCourseName})
        .then(() => {
          this.$store.dispatch('getCourseTableItem', this.itemList.classId)
          .then((res) =>{
            this.itemList = res;
          })
        })
      }else{
        this.$message.error('数据不能为空')
      }
    },
    updateClass_ (form, schedule) {
      // 信息修改
      this.$refs[form].validate( valid => {
        if(valid) {
          console.log(schedule);
          this.updateVisible = false;
          // this.$store.dispatch('updateClass_', this.schedule)
          // .then(res => {

          // })
        }else{
          return false;
        }
      })
    },
    setData (rule, data) {
      console.log('setData')
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
  width: 140px !important;
  margin: 0 6px;
  font-size: 12px;
}
.scheduleCard{
  font-size:13px;
  // max-height:100%;
  // overflow-y:auto;
  // border:solid 1px;
  .timetable{
    position:relative;
    width:80%;
    min-width:780px;
    margin:0 auto;
    border-top:solid 1px #aaa;
    border-left:solid 1px #aaa;
    color:#333;
    .table_header{
      background:rgb(233,237,241);
      
      // display:flex;text-align:center;
      }
    // .table_content{

    // }
    .weekCourse{
      display:flex;
      &>ul{
        flex:1;
        li{
          &:first-child{
            background:rgb(233,237,241);
          }
          height:30px;line-height:30px;
          border-bottom:solid 1px #aaa;
          border-right:solid 1px #aaa;
        }
      }
    }
    .week{
      display:flex;text-align:center;
      &>li{
        // padding:8px;
        flex:1;
        border-bottom:solid 1px #aaa;
        border-right:solid 1px #aaa;
      }
      span{
        border-bottom:solid 1px #aaa;
        padding:10px;
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
        padding:10px;
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
          padding:0 10px;
        }
      }
    }
    .itemShow{
      display:flex;text-align:center;
      // border-top:solid 1px #aaa;
      .show{
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
  #overviewTimeTable{
    height:100%;
    width:100%;
    overflow-x: auto;
    // border:solid 1px;
    padding:10px;
    background: #fff;
    .tableWrapper{
      border:solid 1px;
      border-top:none;
      // border-right:none;
      .timetableRow{
          text-align:center;
          border-right:none;
          display: flex;
          .classifyClass{
            border-top:solid 1px;
            border-bottom:solid 1px;
            flex:1;
            height:50px;
            line-height:50px;
          }
          .everyClass{
              height:20px;
              line-height:20px;
              flex:1;
          }
          .timetableHeader{
            border:solid 1px;
            border-right:none;
            flex:2;
            height:50px;
            // background:rgb(233,237,241);
            p.timetableWeek{
              height:30px;
              line-height:30px;
              border-bottom:solid 1px;
            }
            .itemClassify{ //一星期课程
              height:19px;
              line-height:19px;
              display:flex;
              border-right:none;
              &>li{
                flex:1;
                border-right:solid 1px;
                &:last-child{
                  border:none;
                }
              }
            }
          }
        }
    }
  }
    .refInput{
      height:24px;
      width:84px;
      box-sizing: border-box;
      text-align:center;padding:0 8px;
        // text-align:center;
      }
      .font10{
        width:90px;
        font-size:13px;
        text-align:center;
      }
    // input.text{
    //   padding:0 10px;
    //   text-align: center;
    // }
input.text{text-align:center;padding:10px 20px;width:300px;}
input[disabled]{background: #fff;opacity:1}
</style>
