module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/sass/_variables.scss";`
      }
    }
  }
};
