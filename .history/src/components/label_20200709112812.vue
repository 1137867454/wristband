<template>
  <div id="label" class="refuseCopy">
    <i
      :class="labelInfo.avatar"
      style="font-size:16px;"
    />
    &nbsp;<span class="level1">{{ labelInfo.level1 }}</span>
    &nbsp;>&nbsp;
    <span class="level2">{{ labelInfo.level2 }}</span>
    <!-- <slot name="pagination"></slot> -->
    <div style="position:absolute;top:0;right:0;">
      <el-pagination
        :current-page="labelInfo.currentPage"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="10"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="labelInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
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
    handleSizeChange (val) { // 分页数量改变
      console.log(`每页 ${val} 条`)
      this.$emit('sizeChange', val)
    },
    handleCurrentChange (val) { // 当前页切换
      console.log(`当前页: ${val}`)
      this.labelInfo.currentPage = val;
      this.$emit('currentChange', val)
    }
  },
  // watch: {
  //   labelInfo:{
  //     immediate: true,
  //     current(prev, now){
  //       alert(11)
  //       console.log('watch')
  //       console.log(prev);
  //       console.log(now);
  //     }
  //   }
  // }
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
