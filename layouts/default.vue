<template>
  <div>
    <div class="frosted"></div>
    <nav>
      <i class="icon-logo"></i>
    </nav>

    <div class="nuxt-slot">
      <Nuxt />
    </div>
        <footer>
    <div class="logo">
       <img src="/blog.png" width="80px"/>
       <span> | 想法,代码与日常 <small>2022  </small></span>
    </div>
  
  </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    if(process.client){
         var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?256819b8e1b83e81b6d489dfe92f4316";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    }
 
  },
};
</script>

<style lang='scss' scoped >
.frosted {
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
  background: url('/blog.png');
  display: inline-block;
  height: 40px;
  width: 80px;
  background-size: 100%;
  background-repeat: no-repeat;
}
.loading-page {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
}
footer{
  background: #fff;
  height: 140px;
  margin-top: 80px;
  display: flex;
  align-items: center;
}
footer .logo{
    margin-left: 40px;
  }
span{
  vertical-align: super;
}
  

</style>
