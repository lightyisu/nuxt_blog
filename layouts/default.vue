<template>
  <div>
    <div>
      <div>

        <nav :class="{ invisible: !showNav }">
          <Nuxt-link to='/'>
            <i class="icon-logo"></i>
          </Nuxt-link>

        </nav>
      </div>

      <div class="nuxt-slot">
        <Nuxt />
      </div>
      <footer>
        <div class="logo">
          <img src="/rdna-logo.png" width="140px" />
          <span> | 想法,代码与日常 <small>&copy;2022-2023</small></span>

        </div>
        <div class="gallery">
          <p class="friend_links">
          <p class="enable_font">
            Fonts Enhanced By
            <a style="color: rgb(15, 136, 15);font-weight: bold;" href="http://www.hanyi.com.cn/weixin/h5/CustomizedFont/OPPOSans.php">
              OPPO Sans 3.0
            </a>
          </p>
          <p class="upyun">
            本网站由
            <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral">
              <i class="upyun_logo"></i>
            </a>
            提供CDN加速/云存储服务
          </p>
          <p class="friend_links">
            本站图床域名提供 <a href="https://sltplan.com">Sltplan.com</a>
          </p>
          <p class="friend_links">
            友情链接:<a href="https://tylk.cc/">Likai's Blog</a>
          </p>


          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageYOffset: "",
      showNav: true,
    };
  },
  created() {
    if (process.client) {
      var _hmt = _hmt || [];
      (function () {
        var hm = document.createElement("script");

        hm.src = "https://hm.baidu.com/hm.js?256819b8e1b83e81b6d489dfe92f4316";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    }
  },
  mounted() {
    this.pageYOffset =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    /* console.log("mounted");
    let that = this;
    if(document.readyState=='complete'){
         that.loading = false;
    }else{
          document.onreadystatechange = function () {
      if (document.readyState == "complete") {
        console.log(that);
        //that的作用存储vue示例 在此函数本来是this=document
        //通过that间接访问Vue实例
        that.loading = false;

        // 页面加载完毕
        console.log("complete");
      }
    };
    }*/

    window.onscroll = () => {
      let pageYOffset =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      if (pageYOffset > this.pageYOffset) {
        if (this.showNav) {
          this.showNav = false;
        }
      } else {
        if (!this.showNav) {
          this.showNav = true;
        }
      }
      this.pageYOffset = pageYOffset;
    };
  },
};
</script>

<style lang="scss" scoped>
.invisible {
  transform: translateY(-70px);
}

nav {
  transition: all 0.5s ease-in-out;
  display: flex;
  left: 0;
  background: #fff;
  top: 0;


  align-items: center;
  position: fixed;
  width: 100%;
  height: 75px;

  z-index: 10;
}

.nuxt-slot {
  margin: 70px 0px;


}

.icon-logo {
  background: url("/headlogo.png");
  display: inline-block;
  height: 50px;
  width: 190px;
  margin-left: 8vw;
  margin-top: 1vh;
  background-size: contain;
  background-repeat: no-repeat;
}

.loading-page {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
}

footer {
  background: #fff;
  height: 180px;

  display: flex;
  align-items: center;
  padding: 20px 0;
}

footer .logo {
  margin-left: 240px;
  @media screen and (max-width:800px) {
   margin-left: 20px;
  }
}

span {
  vertical-align: super;
}

.enable_font {
  margin: 0;
  margin-top: 10px;
  padding: 0;
  font-size: 14px;

  a {
    color: black;
  }
}

.upyun {
  font-size: 12px;
  margin: 0;

  .upyun_logo {
    display: inline-block;
    width: 70px;
    height: 25px;
    vertical-align: bottom;
    background: url('~assets/又拍云_logo2.png');
    background-repeat: no-repeat;
    background-size: 100%;
  }
}

.friend_links {

  font-size: 12px;

  a {
    color: black;
  }
}

//移动端暂不显示
.gallery {
  color: rgb(151, 150, 150);
  a {
    color: rgb(151, 150, 150);
  }
  @media screen and (max-width:800px) {
    & {
      display: none;
    }
  }

  margin-left: auto;
  margin-right: 200px;
  display: inline-block;
}</style>
