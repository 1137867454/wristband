<template>
  <div id="uploadFile" class="refuseCopy">
    <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
             accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :limit="3"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="warning" @click="submitUpload">上传到服务器</el-button>
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
      fileList: []
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
  }
}
</script>
<style lang="scss" scoped>
  #uploadFile{

  }
</style>
