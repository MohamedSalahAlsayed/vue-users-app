const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // أضف السطر اللي تحت ده باسم المستودع بتاعك على جيت هاب
  publicPath: process.env.NODE_ENV === "production" ? "/DashboardUser/" : "/",
});
