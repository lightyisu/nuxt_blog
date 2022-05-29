<template>
  <div class="wrapper">
    <div class="content">
      <h2>归档 <i class="rocket"></i></h2>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="2022" name="2022"> dw </el-collapse-item>
      </el-collapse>
      <pre>{{ res }}</pre>
      <pre>{{yearGroup}}</pre>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
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


    return {
      res,
 
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
}
</style>
