import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import { createPinia } from "pinia";
import mitt from "mitt";
const emitter = mitt();

// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";

// jQuery (مطلوب لـ Bootstrap 4)
// import $ from "jquery";
// window.$ = $;
// window.jQuery = $;

// Popper.js
// import "popper.js";

// Bootstrap JS
// import "bootstrap/dist/js/bootstrap.min.js";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
const vuetify = createVuetify({
  components,
  directives,
});
createApp(App)
  .use(createPinia())
  .provide("emitter", emitter)
  .use(vuetify)
  .use(router)
  .mount("#app");
