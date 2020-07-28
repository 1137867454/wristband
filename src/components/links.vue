<template>
  <div
    class="links"
    :style="{background: linkInfo}"
  >
    <div
      class="linkTop"
      :style="{color: linkInfo}"
    >
      <slot name="header" />
    </div>
    <div style="line-height:50px;">
      <slot name="main" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Links',
  props: {
    'linkInfo': {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss">
    .links{
          // border:solid 1px;
          height:80px;
          width:120px;
          display: inline-block;
          color:#fff;
          text-align:center;
          .linkTop{
            box-sizing: border-box;
            height:30px;
            width:100%;
            line-height:30px;
            background:rgba(240,240,240,0.8);
          }
        }
</style>
