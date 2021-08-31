module.exports = {
  publicPath: '/simple_markdown_notetaker/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/_helpers.scss";
          @import "@/scss/_variables.scss";
          @import "@/scss/_base.scss";
        `
      }
    }
  }
}
