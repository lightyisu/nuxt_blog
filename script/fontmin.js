const Fontmin = require("fontmin");
const filePath = "./dist/_nuxt/fonts/*.ttf";
const exportPath = "./dist/_nuxt/fonts/";
const fs = require("fs");

async function generateFontMin() {
  fs.readFile("./static/font.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }

  
    var fontmin = new Fontmin()
      .src(filePath)
      .use(
        Fontmin.glyph({
          text: data,
        })
      )
      .dest(exportPath);
    fontmin.run(function (err, files, stream) {
      if (err) {
        // 异常捕捉
        console.error(err);
      }

      console.log("done"); // 成功
    });
  });
}
generateFontMin();
