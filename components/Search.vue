<template>
  <div class="modalMask" v-show="show">
    <el-card>
      <div slot="header" class="clearfix">
        <span>搜索</span>
        <i @click="show = false" class="close"></i>
      </div>
      <el-input placeholder="请输入内容" v-model="searchQuery">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div class="result">
          <ul>
            <li v-for="(post,index) in results" :key="index">
            <router-link :to="'/blog/'+post.slug">
              {{post.title}}
              </router-link>  
          
            </li>
          </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      searchQuery: "",
      results: [],
    };
  },
  watch: {
    async searchQuery(query) {
      if(!query){
        this.results=[];
        return 
      }
      this.results=await this.$content("articles").limit(5).search(query).fetch();

    },
  },
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
     @media screen and (max-width: 600px) {
        width: 80vw;
        height: 350px;
      }
}
.close {
  float: right;
  background: url("~/assets/icon-close.svg");
  width: 20px;
  height: 20px;
  cursor: pointer;
}
ul{
  list-style: none;
  padding: 0;
  li{
    
    padding: 10px;
    cursor: pointer;
    border-radius: 6px;
    &:hover{
      background: rgb(220, 218, 218);
    }
  }
}
a{
  text-decoration: none;
  color: black;
}
</style>
