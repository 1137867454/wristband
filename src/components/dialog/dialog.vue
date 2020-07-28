<template>
    <div id="dialogDefined">
        <el-dialog width="500px" top="10vh" 
        center :title="dialogInfo.title" custom-class="dialog"
        :visible.sync="dialogInfo.Visible"
        :modal="false"
        >
        <el-form  :rules="dialogInfo.rules" ref="formName"
        class="form refuseCopy formStandard"
        size="small" label-position="left"
        :model="dialogInfo.submits" label-width="90px"
      >
        <el-form-item></el-form-item>
        <slot name="message"></slot>
        <el-form-item style="text-align:center;">
          <el-button
            type="primary"
            @click="submitInfo('formName', dialogInfo.submits)"
          >
            确 定
          </el-button>
          <el-button @click="dialogInfo.Visible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'dialogDefined',
    props: [
        'dialogInfo'
    ],
    data() {
        return {
            submits: {
                
            }
        }
    },
    methods: {
        submitInfo(form, submit) {
            let arr = submit.classroom;
            if(arr && arr.length) {
                if(arr.length > 1) {
                    submit.gradeId = arr[0];
                    submit.classId = arr[1];
                }else{
                    submit.gradeIde = arr[0];
                }
            }
            console.log(arr);
            console.log(submit)
        }
    }
}
</script>
<style lang="scss" scoped>
#dialogDefined{
    .formStandard{
        width:80%;
        // border:solid 1px;
        margin:0 auto;    
    }
}
</style>