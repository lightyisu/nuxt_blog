<template>
  <div>
    <div class="bg-cover" ref="bg_cover"></div>

    <div class="outer">
      <!-- <Search ref="search" />
      <div class="toolbar">
        <div class="content">
          <el-button
            @click.native="openSearch"
            round
            icon="el-icon-search"
            size="small"
            >搜索</el-button
          >
          <el-button
            @click.native="goArchive"
            size="small"
            icon="el-icon-files"
            round
          >
            归档 (TimeLine)
          </el-button>
          <el-button
            @click.native="goTalk"
            size="small"
            icon="el-icon-chat-line-round"
            round
          >
            简言
          </el-button>
        </div>
      </div> -->
      <div class="wrapper">
        <!-- <div class="content-row">
          <el-card
            v-for="(item, index) in articles"
            :key="index"
            class="box-card"
            shadow="never"
          >
            <h2>
              {{ item.title }}
            </h2>
            <p class="time">
              {{ item.updateDate }}
            </p>
            <p class="desc">{{ item.description }}</p>
            <nuxt-link :to="'/blog/' + item.slug">
              <el-button size="mini">GO</el-button>
            </nuxt-link>
          </el-card>
        </div> -->
        <el-card shadow="hover" class="box-card">
          <div v-for="(item, index) in articles" :key="index" class="text item">
            <nuxt-link :to="'/blog/' + item.slug">
          <p class="title">  {{ item.title }} <span class="title_time">     {{ item.updateDate }}</span></p>
          </nuxt-link>
          <el-divider />
          </div>
          <div class="pagination">
            <el-pagination background :page-size="10" @current-change="updatePostList" layout="prev, pager, next"
              :total="posts_length">
            </el-pagination>
          </div>
        </el-card>
      </div>

    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";

import dayjs from "dayjs";
export default {
  name: "IndexPage",
  data() {
    return {
      date: "",
      col1Arr: "",
      col2Arr: "",
      articles: "",
    };
  },

  created() {
    this.date = new Date().getDay();
  },
  mounted() {
    //异步加载图片 不阻塞首屏
    setTimeout(() => {
      let imageSrc =
        "";
      const realImg = new Image();
      realImg.src = imageSrc;
      realImg.onload = () => {
        let url = `url('${imageSrc}')`;
        setTimeout(() => {
          this.$refs.bg_cover.style.filter = "none";
          this.$refs.bg_cover.style.backgroundImage = url;
        }, 50);
      };
    }, 2000);
  },
  computed: {
    getDay() {
      const numberToCN = ["日", "一", "二", "三", "四", "五", "六"];
      return numberToCN[this.date];
    },
  },
  methods: {
    openSearch() {
      this.$refs.search.show = true;
    },
    goArchive() {
      this.$router.push("/archive");
    },
    goTalk() {
      this.$router.push("/talk");
    },
    async updatePostList(num) {
      const offset = 10;
      let loadingInstance = Loading.service({ fullscreen: true, lock: true });
      const articles = await this.$content("articles")
        .only(["title", "slug", "description", "updateDate"])
        .skip(offset * (num - 1))
        .limit(offset)
        .fetch();
      const delay = await new Promise((res, rej) => {
        setTimeout(() => {
          res(2);
        }, 400);
      });
      this.$nextTick(() => {
        loadingInstance.close();
        window.scrollTo(0, 0);
      });
      this.articles = articles;
      this.articles.sort((a, b) => {
        return (
          dayjs(b.updateDate, "YYYY/MM/DD").unix() -
          dayjs(a.updateDate, "YYYY/MM/DD").unix()
        );
      });
    },
  },

  async asyncData({ app, $content, parames }) {
    if (!process.client) {
      let res = await $content("articles").fetch();

      const fs = require("fs");
      await fs.writeFile("static/font.txt", JSON.stringify(res), (err) => {
        console.log(err);
      });
    }
    const articles = await $content("articles")
      .only(["title", "slug", "description", "updateDate"])
      .skip(0)
      .limit(10)
      .fetch();

    const { length: posts_length } = await $content("articles")
      .only(["title"])
      .fetch();

    articles.sort((a, b) => {
      return (
        dayjs(b.updateDate, "YYYY/MM/DD").unix() -
        dayjs(a.updateDate, "YYYY/MM/DD").unix()
      );
    });

    return {
      posts_length,
      articles,
    };
  },
};
</script>

<style lang="scss" scoped>
.title{
  font-size: 40rpx !important;
}
.bg-cover {

  background-size: 100%;
  min-width: 1200px;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -100;
  top: 0;
  overflow: hidden;
  filter: blur(4px);
}

.outer {
  padding-bottom: 70px;
  display: flex;

  width: 100%;
  flex-direction: column;
  justify-content: center;
}

.toolbar {
  display: flex;
  margin: 20px 0;
  justify-content: center;

  .content {
    @media only screen and (max-width: 640px) {
      & {
        width: 322px;
      }
    }

    width: 670px;
    display: inline-block;
  }
}

.wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;

  .content-row {
    width: 660px;

    @media screen and (max-width: 600px) {
      width: 80vw;
    }

    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    margin-right: 10px;

    h2 {
      margin: 0;
    }

    .text-cover {
      height: auto;
    }

    a {
      text-decoration: none;
      color: black;
    }
  }

  .highlight-red {
    color: rgb(252, 65, 65);
  }
  .item{
    margin: 40px 20px;
    a {
      text-decoration: none;
      color: black;
    }
  }
}

.box-card {

  ::v-deep .el-button {
    background: #1e1d1d;
    display: block;
    margin: 10px 0px;
    padding: 10px 30px;
    color: #fff;
    border: none;
    border-radius: 20px;

    &:hover {
      background: rgb(68, 68, 68);
    }
  }

  @media only screen and (max-width: 640px) {
    & {
      width: 80vw;
    }
  }

  margin-bottom: 20px;
  width: 40vw;
  min-height: 800px;
  margin-top: 70px;
  display: inline-block;
  border-radius: 8px;
}

.pagination {
  margin-top: 40px;
  display: flex;
  justify-content: center;

  .el-pagination {
    display: inline-block;
  }
}

.time {
  font-size: 14px;
  color: rgb(138, 135, 135);

  &::before {
    content: "|";
    color: rgb(249, 49, 49);
    font-weight: bold;
  }
}
.title_time{
  color: #ee8a8a;
  font-size: 16px;
  float: right;
}
.desc {
  color: rgb(96, 96, 96);
}</style>
