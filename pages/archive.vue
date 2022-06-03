<template>
  <div class="wrapper">
    <div class="content">
      <h2>  <Backto/>归档 (Timeline) <i class="rocket"></i></h2>
      <el-collapse  v-model="activeNames">
        <el-collapse-item  v-for='(group,index) in assembleArr' :name='index' :key="index" :title="group.group" > 
          <ul class="posts">
            <li v-for="post in group.sub" :key="post.slug">
              <Nuxt-link :to="'/blog/'+post.slug">
                 {{post.title}} <small class="time">{{post.updateDate}}</small>
              </Nuxt-link>  
            </li>
          </ul>

        </el-collapse-item>
      </el-collapse>
  
  <!--
      <pre>{{assembleArr}}</pre>-->
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data(){
    return{
       activeNames: [0]
    }
  },
  async asyncData({ app, $content, parames }) {
    let res = await $content("articles")
      .only(["title", "slug", "updateDate"])
      .fetch();
    //时间倒序
    res.sort((a, b) => {
      return (
        dayjs(b.updateDate, "YYYY/MM/DD").unix() -
        dayjs(a.updateDate, "YYYY/MM/DD").unix()
      );
    });
    res.map(
      (item) =>
        (item.year = dayjs(item.updateDate, "YYYY/MM/DD").format("YYYY"))
    );
    let yearArr=[...new Set(res.map((item)=>item.year))];
    let assembleArr=yearArr.map((item)=>{return {group:item,sub:[]}})
    res.map((item)=>{
       let {0:groupObj}= assembleArr.filter((nest_item)=>{
           return nest_item.group==item.year
        })
        groupObj.sub.push(item)
    })

    return {
      res,
   
      assembleArr
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
.content {
  ::v-deep .el-collapse-item__header {
    font-size: 17px;
    padding: 0px 20px;
    font-weight: bold;
  }
  margin: 40px 0;
  width: 800px;
  display: inline-block;
  .rocket {
    display: inline-block;
    width: 30px;
    vertical-align: sub;
    height: 30px;
    background: url("~/assets/icon-archive.svg");
    background-size: contain;
  }
  .posts{
    list-style: none;
    font-size: 16px;
    li{
    
      &::before{
        content: '>';
        color: rgb(247, 71, 71);
        font-weight: bold;
        margin-right: 10px;
      }
      &:hover{
        background:rgb(247, 71, 71) ;
     
       a{
          color: #fff !important;
       } 
      }
    }
    a{
      text-decoration: none;
      color: black;
    
    }
  }
}

.time{
  margin: 0 10px;
}

</style>
