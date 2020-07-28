import home from '../views/Home/Home'
import student from '../views/role/student'
import status from '../views/admin/status'
import setup from '../views/admin/setup'
import announcement from '../views/admin/announcement'
import teacher from '../views/role/teacher'
import class_ from '../views/role/class_'
import grade from '../views/role/grade'
import schoolGate from '../views/check/schoolGate'
import classAttendance from '../views/check/classAttendance'
import PEAttendance from '../views/check/PEAttendance'
import activityAttendance from '../views/check/activityAttendance'
// import platform from '../views/check/platform'
import info from '../views/queryInfo/info'
import dailyInfo from '../views/constitution/dailyInfo'
import dataComparison from '../views/constitution/dataComparison'
import groupDetails from '../views/constitution/groupDetails'
import classInfo from '../views/constitution/classInfo'
// import sportsResult from '../views/result/sportsResult'
import wristband from '../views/device/wristband'
import bluetooth from '../views/device/bluetoothap'
import schools from '../views/schoolManage/schools'
import classroom from '../views/role/classroom'
export const asyncRouterMap = [
  {
    path: '/check',
    component: home,
    redirect: '/check/schoolGate',
    name: 'check',
    meta: { title: '考勤管理', icon: 'el-icon-guide el red' },
    menu: ['schoolManager', 'teacher', 'PEteacher'],
    children: [{
      path: 'schoolGate',
      name: 'schoolGate',
      meta: { title: '校门考勤', icon: 'el ' },
      component: () => import('../views/check/schoolGate')
    },
    {
      path: 'classAttendance',
      name: 'classAttendance',
      meta: { title: '班级考勤', icon: 'el' },
      component: () => import('../views/check/classAttendance')
    },
    {
      path: 'PEAttendance',
      name: 'PEAttendance',
      meta: { title: '全校考勤', icon: 'el' },
      component: () => import('../views/check/PEAttendance')
    }
    // ,{
    //   path: 'activityAttendance',
    //   name: 'activityAttendance',
    //   meta: { title: '活动考勤', icon: 'el' },
    //   component: () => import('../views/check/activityAttendance')
    // }
  ]},
  {
    path: '/constitution',
    name: 'constitution',
    meta: { title: '体育监测', icon: 'el-icon-pie-chart orangeColor' },
    component: () => import('../views/Home/Home'),
    redirect: '/constitution/dailyInfo',
    menu: ['schoolManager', 'PEteacher'],
    children: [
      {
        path: 'dailyInfo',
        name: 'dailyInfo',
        meta: { title: '日常监测', icon: '' },
        component: () => import('../views/constitution/dailyInfo')
      },
      // {
      //   path: 'groupDetails',
      //   name: 'groupDetails',
      //   component: () => import('../views/constitution/groupDetails'),
      //   meta: { title: '小组活动', icon: '' }
      // },
      {
        path: 'classInfo',
        name: 'classInfo',
        component: () => import('../views/constitution/classInfo'),
        meta: { title: '班级信息', icon: '' }
      }
      ,{
        path: 'dataComparison',
        name: 'dataComparison',
        component: () => import('../views/constitution/dataComparison'),
        meta: { title: '心率图像', icon: 'fa fa-bar-chart' }
      }
    ]
  },
  {
    path: '/classManager',
    name: '/classManager',
    component: () => import('../views/Home/Home'),
    redirect: '/classManager/info',
    meta: { title: '班级管理', icon: 'iconfont icon-banji blueColor' },
    menu: ['schoolManager', 'teacher', 'student',],
    children: [
      {
        path: 'info',
        name: 'info',
        component: () => import('../views/queryInfo/info'),
        meta: { title: '班级主页', icon: '' }
      },
      {
        path: 'teacher_Affair',
        name: 'teacher_Affair',
        redirect: 'teacher_Affair/affair_center',
        component: () => import('../views/teacherAffair/teacher_Affair'),
        meta: { title: '教师中心', icon: '' },
        children: [{
          path: 'affair_center',
          path: 'affair_center',
          component: () => import('../components/teacher_affair/affair_center'),
          mata: { title: '教师主页', icon: '' }
        },{
          path: 'affair_info',
          name: 'affair_info',
          component: () => import('../components/teacher_affair/affair_info'),
          mata: {}
        },
        {
          path: 'classTeacher',
          path: 'classTeacher',
          component: () => import('../components/teacher_affair/classTeacher'),
          mata: { title: '任课老师', icon: '' }
        },
        {
          path: 'leader',
          path: 'leader',
          component: () => import('../components/teacher_affair/leader'),
          mata: { title: '班干委员', icon: '' }
        },
        {
          path: 'dutyList',
          path: 'dutyList',
          component: () => import('../components/teacher_affair/dutyList'),
          mata: { title: '值日信息', icon: '' }
        },
        {
          path: 'classPictures',
          path: 'classPictures',
          component: () => import('../components/teacher_affair/classPictures'),
          mata: { title: '班级相册', icon: '' }
        },
        {
          path: 'classWorks',
          path: 'classWorks',
          component: () => import('../components/teacher_affair/classWorks'),
          mata: { title: '班级作品', icon: '' }
        },
        {
          path: 'classHonor',
          path: 'classHonor',
          component: () => import('../components/teacher_affair/classHonor'),
          mata: { title: '班级荣誉', icon: '' }
        }]
      },
      // {
      //   path: 'classAttendance',
      //   name: 'classAttendance',
      //   meta: { title: '班级考勤', icon: '' },
      //   component: () => import('../views/check/classAttendance')
      // },
      {
        path: 'class_',
        name: 'class_',
        component: () => import('../views/role/class_'),
        meta: { title: '班级管理', icon: '' },
        menu: ['schoolManager']
      },
      {
        path: 'schedule',
        name: 'schedule',
        menu: ['schoolManager'],
        meta: { title: '课表管理', icon: '' },
        component: () => import('../views/role/schedule')
      }]
  },
  // {
  //   path: '/classroom',
  //   name: 'classroom',
  //   component: () => import('../views/Home/Home'),
  //   menu:['schoolManager'],
  //   meta: { title: '教室管理', icon: 'iconfont icon-jiaoshi1 darkBlueColor' },
  //   children: [
  //     {
  //       path: 'classroom',
  //       name: 'classroom',
  //       component: () => import('../views/role/classroom'),
  //       meta: { title: '教室管理', icon: ''}
  //     }
  //   ]

  // },
  {
    path: '/device',
    name: 'device',
    component: () => import('../views/Home/Home'),
    redirect: '/device/wristband',
    meta: { title: '设备管理', icon: 'el-icon-set-up greenColor' },
    menu: ['schoolManager'],
    children: [{
      path: 'classroom',
      name: 'classroom',
      component: () => import('../views/role/classroom'),
      meta: { title: '教室管理', icon: ''}
    },
    {
      path: 'wristband',
      name: 'wristband',
      component: () => import('../views/device/wristband'),
      meta: { title: '手环管理', icon: '' }
    },
    {
      path: 'bindDetails',
      name: 'bindDetails',
      component: () => import('../views/device/bindDetails'),
      meta: { title: '手环绑定', icon: '' }
    },
    {
      path: 'bluetooth',
      name: 'bluetooth',
      component: () => import('../views/device/bluetoothap'),
      meta: { title: '蓝牙Ap管理', icon: '' }
    },
    {
      path: 'classroomApp',
      name: 'classroomApp',
      component: () => import('../views/device/classroomApp'),
      meta: { title: '蓝牙Ap绑定', icon: ''}
    }]
  },
  // {
  //   path: '/grade',
  //   name: 'grade',
  //   meta: { title: '年级管理', icon: 'iconfont icon-guanli blueColor' },
  //   component: () => import('../views/Home/Home'),
  //   redirect: '/grade/gradeManager',
  //   menu: ['schoolManager'],
  //   children:[
  //     {
  //       path: 'gradeManager',
  //       name: 'gradeManager',
  //       component: () => import('../views/role/grade'),
  //       meta: { title: '年级管理', icon: '' }
  //     }
  //   ]
  // },
  {
    path: '/Manager',
    component: () => import('../views/Home/Home'),
    redirect: '/Manager/student',
    name: 'Manager',
    meta: { title: '师生管理', icon: 'el-icon-user blackColor' },
    menu: ['schoolManager'],
    children: [{
      path: 'grade',
      name: 'grade',
      component: () => import('../views/role/grade'),
      meta: { title: '年级管理', icon: '' }
    },
    {
      path: 'student',
      name: 'student',
      component: () => import('../views/role/student'),
      meta: { title: '学生管理', icon: '' }
    },
    {
      path: 'teacher',
      name: 'teacher',
      component: () => import('../views/role/teacher'),
      meta: { title: '教师管理', icon: '' }
    }]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Home/Home'),
    redirect: '/admin/status',
    meta: { title: '管理模块', icon: 'el-icon-key pinkColor' },
    menu: ['schoolManager'],
    children: [
    //   {
    //   path: 'status',
    //   name: 'status',
    //   component: () => import('../views/admin/status'),
    //   meta: { title: '出入状态', icon: '' }
    // },
    {
      path: 'attendence',
      name: 'attendence',
      component: () => import('../views/admin/attendence'),
      meta: { title: '考勤管理', icon: '' }
    },
    // {
    //   path: 'announcement',
    //   name: 'announcement',
    //   component: () => import('../views/admin/announcement'),
    //   meta: { title: '公告管理', icon: '' }
    // },
    {
      path: 'setup',
      name: 'setup',
      component: () => import('../views/admin/setup'),
      meta: { title: '信息录入&设置', icon: '' }
    }
  ]
},
  {
    path:'/schoolAffair',
    name: 'schoolAffair',
    redirect: '/schoolAffair/AffairManage/adminHome',
    component: () => import('../views/Home/Home'),
    meta: {title: '学校事务', icon: 'iconfont icon-tubiaozhizuomobanyihuifu- icon darkBlueColor'},  
    menu: ['schoolManager'],
    children: [{
      path: 'AffairManage',
      redirect: '/schoolAffair/AffairManage/adminHome',
      name: 'AffairManage',
      component: () => import('../views/affair/AffairManage'),
      meta: { title: '学校事务', icon: ''},
      children: [{
        path: 'adminHome',
        name: 'adminHome',
        component: () => import('../components/affair/adminHome'),
        meta: { title: '主页', icon: ''}
      },
      {
        path: 'schoolHonor',
        name: 'schoolHonor',
        component: () => import('../components/affair/schoolHonor'),
        meta: { title: '学校荣誉', icon: ''}
      },
      {
        path: 'goodTeacher',
        name: 'goodTeacher',
        component: () => import('../components/affair/goodTeacher'),
        meta: { title: '优秀教师', icon: ''}
      },{
        path: 'notice',
        name: 'notice',
        component: () => import('../components/affair/notice'),
        meta: { title: '公告管理', icon: ''}
      },
      {
        path: 'examination',
        name: 'examination',
        component: () => import('../components/affair/examination'),
        meta: { title: '公告管理', icon: ''}
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('../components/affair/video'),
        meta: { title: '视频', icon: ''}
      },
      {
        path: 'text',
        name: 'text',
        component: () => import('../components/affair/text'),
        meta: { title: '详情', icon: ''}
      },
      {
        path: 'noticeAdd',
        name: 'noticeAdd',
        component: () => import('../components/affair/add/noticeAdd'),
        meta: { title: '公告添加', icon: ''}
      },
      {
        path: 'examAdd',
        name: 'examAdd',
        component: () => import('../components/affair/add/examAdd'),
        meta: { title: '公告添加', icon: ''}
      }]
    }]
  },
  {
    path:'/schoolManage',
    name: 'schoolManage',
    redirect: '/schoolManage/schools',
    component: () => import('../views/Home/Home'),
    meta: {title: '学校管理', icon: 'iconfont icon-xuexiao6 icon darkBlueColor'},  
    menu: ['sysManager'],
    children: [{
      path: 'schools',
      name: 'schools',
      component: () => import('../views/schoolManage/schools'),
      meta: { title: '学校管理', icon: ''}
    }]
  }
  // ,{
  //   path: '/result',
  //   name: 'result',
  //   component: home,
  //   meta: { title: '成绩查询', icon: 'el-icon-medal-1' },
  //   children: [
  //     {
  //       path: 'sportsResult',
  //       name: 'sportsResult',
  //       meta: { title: '体育成绩', icon: 'el' },
  //       component: sportsResult
  //     }
  //   ]
  // }
]
