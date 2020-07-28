<template>
  <div
    id="check"
    class="wrapper"
  >
    <el-row :gutter="10">
      <el-col :span="5">
        <div class="card cardTop">
          123
        </div>
        <p style="height:2%;" />
        <div class="card cardBottom">
          未到校人员
        </div>
      </el-col>
      <el-col :span="14">
        <div class="card height_100">
          123
        </div>
      </el-col>
      <el-col :span="5">
        <div class="card height_100">
          到校排名
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
  #check{
    background: #6df;
    padding:10px;
    .el-row{
      height:100%;
      .el-col{
        height:100%;
      }
    }
  }
  main{
      padding:0 !important;
    }

  .card{
    padding:8px;
    background: rgba(255,255,255,0.7);
    box-shadow: -2px 2px 4px #aaa;
    border-radius:4px;
  }
  .cardTop{
    height:44%;
    // margin-bottom:10%;
    // margin-bottom: 20%;
  }
  .cardBottom{
    height:54%;
  }
</style>
