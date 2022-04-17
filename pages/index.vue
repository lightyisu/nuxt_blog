<template>
<div>
    <h1>blog post</h1>
  <ul>
 <li v-for='article in articles' :key="article.slug">
   <nuxt-link :to="{name:'blog-slug',params:{slug:article.slug}}">
     <div>
       <h2>{{article.slug}}</h2>
       
     </div>
   </nuxt-link>
  </li>
  </ul>
  <pre>
    {{articles}}
  </pre>
</div>

 
  
</template>

<script>
export default {
  name: "IndexPage",

  async asyncData({app,$content,parames}) {
    if (process.server) {
          const fs = require("fs");
        let {data}=await app.$axios.get('https://asop2rq5.directus.app/items/article');
         console.log('向服务器请求post')
        data.data.forEach(async (item)=>{
        const {title,content}=item;
        await fs.writeFile("content/articles/"+title+'.md',content,(err)=>{
          console.log(err)
        })
        })


      // some code with fs
    }
    const articles=await $content('articles').only(['title','slug']).fetch();
    return {
      articles
    }
  },
};
</script>
<style >
*{
  margin: 0;
  padding: 0;
}
body{
  height: 1200px;
}
</style>
