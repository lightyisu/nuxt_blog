<template>
  <div class="wrapper">
    <article>
      <nuxt-link to="/">
        <i class="backto"></i>
      </nuxt-link>
      <h1>
        {{ article.title }}
      </h1>
      <h4 class="time">
        <span class="time-wrapper">created At : </span>{{ article.createdDate }}
      </h4>
      <h4 class="time">
        <span class="time-wrapper">updated At : </span>{{ article.updateDate }}
      </h4>

      <br />
  <el-collapse>
    <el-collapse-item title="目录">
       <div class="toc">
       
             <ul>
            <li v-for='link in article.toc' :class="{'ml-2':link.depth==3}" :key='link.id'>
          
                  <NuxtLink :to="`#${link.id}`">{{link.text}}</NuxtLink>
      
            
            </li>
          </ul>
         
         
        </div>
    </el-collapse-item>
  </el-collapse>
  <br/>
        
        <el-card class="content-card">
          <nuxt-content :document="article" />
          <!-- <pre>
          {{ article }}
           </pre>
          <pre>
         {{ article.toc }}
         </pre
          >-->
        </el-card>
      
    </article>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
  async asyncData({ $content, params }) {
    const article = await $content("articles", params.slug).fetch();
    return { article };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 70px;
  display: flex;
  justify-content: center;
  article {
    display: inline-block;
    padding-top: 20px;
    .content{
      display: flex;

    }
 
    .content-card {
      text-align: justify;
      width: 800px;
      @media screen and (max-width: 600px) {
        width: 95vw;
        margin-bottom: 100px;
      }
    }
  }
}

::v-deep .icon.icon-link {
  background-image: url("~assets/icon-hashtag.svg");
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
.backto {
  display: inline-block;
  width: 20px;
  margin: 10px 0;

  height: 20px;
  background-image: url("~assets/icon-arrow-left.svg");
}


.time{
   margin: 8px 0px;

  &::before{
    content: '|';
    color: rgb(240, 40, 40);
    font-weight:800;
    margin-right: 10px;
  }

}
::v-deep .el-collapse-item__header{
  padding: 0px 10px;
}
.toc {
  display: inline-block;
  ul{
    padding:0px 10px;
    list-style: none;
    li{
      margin: 4px 0;
    }
  }
  a{
    text-decoration: none;
    color: black;
    font-size: 14px;
  }
  .ml-2{
    margin-left: 6px;
  }
}

</style>
