<template>
  <div class="wrapper">
    <div class="content-row">
      <el-card class="box-card cover-card" shadow="never">
        <video width="100%" autoplay muted loop>
          <source src="~/assets/welcome.mp4" />
        </video>
      </el-card>
      
      <el-card v-for='(item,index) in col1Arr' :key="index" class="box-card" shadow="never"> 
        <h2>
           {{item.title}}
        </h2>
        <p>{{item.description}}</p>
        <nuxt-link :to="'/blog/'+item.slug">
        <el-button>GO</el-button>
        </nuxt-link>
         </el-card>
         <el-card shadow="never" class="card-info box-card">
        
            <el-image src="/nuxt-logo.svg" fit='contain' />
            <span :style="{fontSize:'16px'}">SSG/Directus Cloud</span>
         </el-card> 

     <!-- <pre>
      {{ articles }}
      {{col1Arr}}
      {{col2Arr}}
     </pre
      >-->
      <p>本站采用OPPP SANS字体</p>
      <p>©2022 github.com/lightyisu</p>
    </div>
    <div class="content-row">
      <el-card class="box-card text-cover" shadow="never">
        <h1>Today is a good day</h1>
        <p>今天是美好的<span class="highlight-red">星期{{getDay}}</span></p>
      </el-card>
      
      <el-card v-for='(item,index) in col2Arr' :key="index" class="box-card" shadow="never"> 
        <h2>
           {{item.title}}
        </h2>
        <p>{{item.description}}</p>
       
       <nuxt-link :to="'/blog/'+item.slug">
       <el-button>GO</el-button></nuxt-link>
         </el-card>

    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data(){
    return{
      date:''
    }
  },
  
  created(){
    this.date=new Date().getDay();
  },
  computed:{
    getDay(){
        const numberToCN=['一','二','三','四','五','六','日']
         return  numberToCN[this.date-1]
    }
  },

  async asyncData({ app, $content, parames }) {
    if (process.server) {
      const fs = require("fs");
      let { data } = await app.$axios.get(
        "https://asop2rq5.directus.app/items/article"
      );
      console.log("向服务器请求post");
      data.data.forEach(async (item) => {
        const { title, content } = item;
        await fs.writeFile(
          "content/articles/" + title + ".md",
          content,
          (err) => {
            console.log(err);
          }
        );
      });

      // some code with fs
    }
    const articles = await $content("articles").only(["title", "slug","description"]).fetch();
    const col1Arr = articles.filter((item, index) => {
      if (index % 2 == 0) {
        return true;
      }
    });
    const col2Arr = articles.filter((item, index) => {
      if (index % 2 != 0) {
        return true;
      }
    });

    return {
      articles,
      col1Arr,
      col2Arr
    };
  },
};
</script>
<style lang="scss" scoped>

.wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  .content-row {
    margin-top: 80px;
    flex-direction: column;
    display: flex;

    flex-wrap: wrap;
    justify-content: flex-start;
    margin-right: 10px;
    .box-card {
      ::v-deep .el-button{
        background: rgb(0, 47, 167);
        display: block;
        margin: 20px 0px;
        border: non;
        color: #fff;
        &:hover{
          background: black;
        }
      }
      margin: 20px 0;
      width: 300px;
      
      display: inline-block;
      border-radius: 10px;
    }
    .cover-card {
      height: 200px;
      ::v-deep .el-card__body {
        padding: 0;
      }
    }
    .text-cover {
      height: auto;
    }
    a {
      text-decoration: none;
      color: black;
    }
  }
  .highlight-red{
    color: rgb(252, 65, 65);
  }
}
</style>
