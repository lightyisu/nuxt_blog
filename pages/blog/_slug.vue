<template>
  <div class="wrapper">
  
    <article>
         <nuxt-link to='/'>
           <i class="backto"></i> 
         </nuxt-link>  
       <h1> 
   
        {{article.title}}</h1>
       <br/>
      <el-card class="content-card">
         <nuxt-content :document="article" />
     <!-- <pre>
          {{ article }}
      </pre>-->
      </el-card>
     
  
    </article>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content("articles", params.slug).fetch();
    return { article };
  },
};
</script>

<style lang="scss" scoped>
.wrapper{
  margin-top: 70px;
  display: flex;
  justify-content: center;
  article{
    display: inline-block;
    padding-top: 20px;
    .content-card{
      width: 800px;
    @media screen and (max-width:600px){
          width: 90vw;
          margin-bottom: 100px;
        }
    }
  }
}
.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}
.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}
.nuxt-content p {
  margin-bottom: 20px;
}
::v-deep .icon.icon-link {
  background-image: url("~assets/icon-hashtag.svg");
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
.backto{
  display: inline-block;
  width: 20px;
  margin: 10px 0;

  height: 20px;
  background-image: url('~assets/icon-arrow-left.svg');
}
</style> 


