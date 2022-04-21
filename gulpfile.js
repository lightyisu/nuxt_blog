const axios = require("axios");
const fs = require("fs");

async function getSeverData() {
  let { data } = await axios.get("https://asop2rq5.directus.app/items/article");
  console.log("向服务器请求post");
  data.data.forEach(async (item) => {
    const { title, content } = item;
    await fs.writeFile("content/articles/" + title + ".md", content, (err) => {
      console.log(err);
    });
  });
}

exports.default = getSeverData;
