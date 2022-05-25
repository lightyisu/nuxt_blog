<template>
  <div class="outer">
    <Search ref="search" />
    <div class="toolbar">
      <div class="content">
        <el-button
          @click.native="openSearch"
          round
          icon="el-icon-search"
          size="small"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="wrapper">
      <div class="content-row">
        <el-card
          v-for="(item, index) in col1Arr"
          :key="index"
          class="box-card"
          shadow="never"
        >
          <h2>
            {{ item.title }}
          </h2>
          <p>{{ item.description }}</p>
          <nuxt-link :to="'/blog/' + item.slug">
            <el-button>GO</el-button>
          </nuxt-link>
        </el-card>
      </div>
      <div class="content-row">
        <el-card class="box-card text-cover" shadow="never">
          <h1>Today is a good day</h1>
          <p>
            今天是美好的<span class="highlight-red">星期{{ getDay }}</span>
          </p>
        </el-card>

        <el-card
          v-for="(item, index) in col2Arr"
          :key="index"
          class="box-card"
          shadow="never"
        >
          <h2>
            {{ item.title }}
          </h2>
          <p>{{ item.description }}</p>

          <nuxt-link :to="'/blog/' + item.slug">
            <el-button>GO</el-button></nuxt-link
          >
        </el-card>
        <!--  <el-card shadow="never" class="card-info box-card">
          <el-image src="/nuxt-logo.svg" fit="contain" />
          <span :style="{ fontSize: '16px' }">SSG/Directus Cloud</span>
        </el-card>-->
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :page-size="3"
        @current-change="updatePostList"
        layout="prev, pager, next"
        :total="posts_length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      date: "",
      col1Arr: "",
      col2Arr: "",
    };
  },

  created() {
    this.date = new Date().getDay();
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
    async updatePostList(num) {
      const offset = 3;
      const articles = await this.$content("articles")
        .only(["title", "slug", "description"])
        .skip(offset * (num - 1))
        .limit(offset)
        .fetch();

      this.col1Arr = articles.filter((item, index) => {
        if (index % 2 == 0) {
          return true;
        }
      });
      this.col2Arr = articles.filter((item, index) => {
        if (index % 2 != 0) {
          return true;
        }
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
      .only(["title", "slug", "description"])
      .skip(0)
      .limit(3)
      .fetch();
    
    const { length: posts_length } = await $content("articles")
      .only(["title"])
      .fetch();
   
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
      posts_length,
      articles,
      col1Arr,
      col2Arr,
    };
  },
};
</script>

<style lang="scss" scoped>
.outer {
  margin-top: 80px;
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
    width: 620px;
    display: inline-block;
  }
}
.wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  .content-row {
    @media screen and (max-width: 600px) {
      &:nth-of-type(2) {
        margin-top: 0px;
      }
    }
    flex-direction: column;
    display: flex;

    flex-wrap: wrap;
    justify-content: flex-start;
    margin-right: 10px;

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
  .highlight-red {
    color: rgb(252, 65, 65);
  }
}
.box-card {
  ::v-deep .el-button {
    background: #1e1d1d;
    display: block;
    margin: 20px 0px;
    padding: 10px 30px;
    color: #fff;
    border: none;
    border-radius: 20px;
  }

  margin-bottom: 20px;
  width: 300px;

  display: inline-block;
  border-radius: 10px;
}
.pagination {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  .el-pagination {
    display: inline-block;
  }
}
</style>
