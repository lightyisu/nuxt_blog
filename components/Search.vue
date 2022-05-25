<template>
  <div class="modalMask" v-show="show">
    <el-card>
      <div slot="header" class="clearfix">
        <span>搜索</span>
        <i @click="show=false" class="close"></i>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            show:false
        }
    }
};
</script>

<style lang="scss" scoped>
.modalMask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  justify-content: center;
}
::v-deep .el-card {
  width: 400px;
  height: 400px;
  display: inline-block;
  margin-top: 40px;
}
.close{
    float: right;
    background: url('~/assets/icon-close.svg');
    width: 20px;
    height: 20px;
    cursor: pointer;

}
</style>
