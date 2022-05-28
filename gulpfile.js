const axios = require("axios");
const fs = require("fs");
function delDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
    
  }
}



async function getSeverData() {
  delDir("content/articles")
  let { data } = await axios.get("https://asop2rq5.directus.app/items/article");
  console.log("向服务器请求post");
  data.data.forEach(async (item) => {
    const { title, content } = item;
    await fs.writeFile("content/articles/" + title + ".md", content, (err) => {
      if(err){
        console.log(err);
      }
     
    });
  });
}

exports.default = getSeverData;
