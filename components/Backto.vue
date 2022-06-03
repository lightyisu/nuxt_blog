<template>
  <div class="back_wrapper">
        <i @click="goback" class="backto"></i> 
  </div>
</template>

<script>
export default {
    methods:{
        goback(){
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>