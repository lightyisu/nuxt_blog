<template>
  <div>
    <nav>
     
      <ul v-for="(item, index) in article.toc" :key="index">
        <nuxt-link :to="`#${item.id}`">{{item.text}}</nuxt-link>
      </ul>
    </nav>
    <article>
      <nuxt-content :document="article" />
      <pre>
          {{ article }}
      </pre>
      dwadw
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

<style scoped>
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
</style>
