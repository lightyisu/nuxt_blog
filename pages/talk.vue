<template>
  <div class="wrapper">
    <div class="talk">
        <Backto/>
    <h1> 简言(TALK) <i class="el-icon-chat-line-round"></i></h1>
      <el-card shadow="hover" v-for='(talk,index) in res.data' :key="index">
        <div slot="header">
            <i :class="{douban_logo:talk.cite_site=='douban',icon_logo:true}"></i>
            <a :href="talk.cite_link" target="_blank">查看原文(豆瓣)</a>
             <span class="time">{{talk.created_time}}</span>
            </div>
            <pre>{{talk.content}}</pre>
      </el-card>
    <!--  <pre>{{res}}</pre>-->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    async asyncData(){
       let {data:res}= await axios.get('https://asop2rq5.directus.app/items/talk')
        return {
            res
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
.talk {
  @media (max-width: 800px){
      &{
        width: 93vw;
        padding: 0;
      }
  }
  width: 750px;
  padding: 40px 70px;
}
.el-card {
  margin: 20px 0;
}
pre {
  font-family: "MISANS";
  white-space: pre-wrap;
  position: relative;
  padding-left: 15px;
  &::before{
          content: "";
    display: inline-block;
    position: absolute;
    top: 0px;
    left: -14px;
    width: 24px;
    height: 20px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-color: transparent;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd' opacity='.15'%3E%3Cg transform='translate(1 4)'%3E%3Ccircle fill='%23494949' cx='5' cy='10' r='5'/%3E%3Cpath d='M1.726 7.698L9 0' stroke='%23494949' stroke-width='2'/%3E%3C/g%3E%3Cg transform='translate(13 4)'%3E%3Ccircle fill='%23494949' cx='5' cy='10' r='5'/%3E%3Cpath d='M1.726 7.698L9 0' stroke='%23494949' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
}
.time{
    vertical-align: super;
    color: rgb(125, 125, 125);
    font-weight: bold;
    font-size: 12px;

}
a{
    text-decoration: none;
    color: black;
    vertical-align: super;
}
</style>
