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
  name: 'LabelTop',
  props: [
    'labelInfo'
  ],
  data () {
    return {
      // currentPage: 2
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
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
</style>
