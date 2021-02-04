const VueRouteGenPlugin = require("./webpack_script/VueRouteGenPlugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-demo/" : "/",
  configureWebpack: {
    plugins: [new VueRouteGenPlugin()]
  }
};
