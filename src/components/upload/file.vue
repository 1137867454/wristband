<template>
  <div id="uploadFile" class="refuseCopy">
            <!-- accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" -->
            <!-- {{fileInfo}} -->
    <el-upload
      class="upload-demo"
      ref="upload"
      :accept="fileInfo.accept"
      :action="fileInfo.action"
      :headers="header"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :limit="fileInfo.limit" multiple="multiple"
      :on-error="handleError"
      :on-success="handleSuccess"
      :file-list="fileList"
      :auto-upload="false"
      >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" :type="fileInfo.type" @click="submitUpload">上传文件</el-button>
      <slot name="template"></slot>
      <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2M</div>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'uploadFile',
  props: [
    'fileInfo'
  ],
  data () {
    return {
      fileList: [],
      header: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  methods: {
    handlePreview(file, fileList) {
      console.log(file, fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleExceed() {
      this.$message.warning('请一次上传一个Excel文件');
    },
    handleSuccess(res) {
      if(res.code) {
        this.fileList = [];
        this.$message.success(res.msg)
      }else{
        this.fileList = [];
        this.$message.error(res.msg + "  " + res.data)
      }
    },
    handleError() {

    },
    submitUpload(file, fileList) {
      console.log(file);
      // console.log(fileList)
      console.log('submitUpload')
      this.$refs.upload.submit();
    }
  }
}
</script>
<style lang="scss" scoped>
  #uploadFile{
    overflow: hidden;
    white-space: nowrap;
    .upload-demo{
      padding:0px 10px 0;
    }
  }
</style>
