<template>
  <div
    id="stundent"
    class="wrapper"
  >
    <el-table
      size="mini"
      row-class-name="table"
      header-cell-class-name="tableHeader"
      :data="data"
      :border="true"
      :height="h"
      @select="select"
      @select-all="selectAll"
    >
      <el-table-column
        align="center"
        type="selection"
      />
      <el-table-column
        v-for="(v,i) in form"
        :key="i"
        align="center"
        :prop="v[0]"
        :label="v[1]"
      />
      <el-table-column
        align="center"
        label="操作"
        width="200"
      >
        <el-button
          size="small"
          type="primary"
        >
          编辑
        </el-button>
        <el-button size="small">
          详情
        </el-button>
        <slot
          :d="d"
          @click="test"
        />
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10,20,50]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="200"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  name: 'Student',
  props: [
    'role',
    'data',
    'h'
  ],
  data () {
    return {
      currentPage: 1,
      d: {
        name: 'liu',
        age: 23
      }
    }
  },
  computed: {
    form () {
      return Object.entries(this.$props.role)
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {
    select (selection, row) {
      console.log(selection)
      console.log(row)
    },
    selectAll (selection) {
      console.log(selection)
    },
    test () {
      console.log(2)
    },
    handleSizeChange (index) {
      console.log(index)
    },
    handleCurrentChange (index) {
      console.log(index)
    }
  }
}
</script>
<style lang="scss">
    .tableHeader{
        background: #eef1f6 !important;
        color: #606266;
        font-size:14px;
        font-weight: bold;
    }
    .table{
        font-size:14px;
    }
    // props: {
//     msg: String
//   }
</style>
