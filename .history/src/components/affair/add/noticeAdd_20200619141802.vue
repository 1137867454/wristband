<template>
  <div class="mainIn">
      <el-form style="width:90%;margin:0 auto;padding:10px;"
       ref="noticeForm" :model="notification" :rules="rules"
        label-width="110px">
        <el-form-item label="标题" prop="title" style="display:inline-block;">
          <el-input clearable size="small" style="width:400px;" v-model="notification.title"></el-input>
        </el-form-item>
        <el-form-item label="导语"  style="display:inline-block;">
          <el-input clearable size="small" style="width:400px;" v-model="notification.explains"></el-input>
        </el-form-item>
        <p>
          <el-form-item label="年级" prop="gradeId" style="display:inline-block;">
            <el-select clearable size="small" style="font-size:12px !important;" v-model="notification.gradeId" placeholder="请选择活动区域">
              <el-option v-for="(v,i) in getGrade" :key="i"
               :label="v.gradeName" :value="v.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优先等级" prop="level" style="display:inline-block;">
            <el-select clearable size="small" 
            v-model="notification.level" 
            placeholder="请选择活动区域">
              <el-option label="倒计时" value="3"></el-option>
              <el-option label="普通" value="4"></el-option>
              <el-option label="紧急" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期限" prop="time"  style="display:inline-block;">
          <el-date-picker clearable :picker-options="pickerOptions"
          v-model="notification.time" value-format="yyyy-MM-dd HH:mm"
          size="small" style="width:340px;" format="yyyy-MM-dd HH:mm"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateChange">
        </el-date-picker>
        </el-form-item>
        </p>
        <form id="uploadForm" action="http://192.168.1.238:8777/brand/setNotificationPicture" method="post" enctype="multipart/form-data">
          <input id="File1" name="uploadFile" accept="image/gif, image/jpeg" multiple="multiple" type="file" value="" />
        </form>
        <el-form-item label="内容" style="width:90%;">
          <el-input type="textarea" rows="16" 
           v-model="notification.content"></el-input>
        </el-form-item>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="onSubmit('noticeForm', notification)">确定</el-button>
          <el-button size="medium" round @click="noticeVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    name: 'mainIn',
    data() {
        return {
            noticeVisible: false,  //公告添加,
            rules: {
                gradeId: {required: true, message: '请输入年级', trigger: 'blur'},
                level: { required: true, message: '请输入通知等级', trigger: 'blur' },       //通知等级 /普通/紧急/倒计时
                startTime: {required: true, message: '请输入开始时间', trigger: 'blur'},      //开始时间
                subject: { required: true, message: '请输入考试科目', trigger: 'blur'},      //学科
                title: { required: true, message: '请输入标题', trigger: 'blur'},      //学科
                time: { required: true, message: '请输入起始&结束时间', trigger: 'blur'},      //学科
                id: { required: true, message: '请至少选择一位老师', trigger: 'blur' },
                uploadFile: { required: true, message: '请选择微课视频', trigger: 'blur' },
                name: { required: true, message: '请填写微课名称', trigger: 'blur' },
                subjects: { required: true, message: '请填写考试科目', trigger: 'blur'}
            },
        }
    }
}
</script>

<style>

</style>