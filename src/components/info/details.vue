<template>
    <el-table-column type="expand">
      <template slot-scope="user">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ user.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ user.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ user.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ user.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ user.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ user.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ user.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
</template>
<script>
export default {
  name: 'userDetails',
  user: [
    'user'
  ],
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (val) { // 分页数量改变
      console.log(`每页 ${val} 条`)
      this.$emit('sizeChange', val)
    },
    handleCurrentChange (val) { // 当前页切换
      console.log(`当前页: ${val}`)
      this.$emit('currentChange', val)
    }
  }
}
</script>
<style lang="scss" scoped>
  #userDetails{
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
