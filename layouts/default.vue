<template>
  <div>
    <div class="frosted"></div>
    <nav>
      <i class="icon-logo"></i>
    </nav>
    
    <div class="nuxt-slot">
          <Nuxt />
    </div>
 
  </div>
</template>

<script>
export default {
  data(){
    return{
    
    }
  },


};
</script>

<style >

.frosted{
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
 border-bottom: 1px solid rgb(207, 199, 199);

}

nav {
 display: flex;
   left: 0;
  top: 0;
    justify-content: center;
    align-items: center; 
  position: fixed;
  width: 100%;
  height: 70px;
 
  z-index: 10;
}

.icon-logo {
  background: url("~/assets/Blog.png");
  display: inline-block;
  height: 40px;
  width: 80px;
  background-size: 100%;
  background-repeat: no-repeat;
}
.loading-page{
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
}

</style>
