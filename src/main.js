import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap/dist/css/bootstrap.css";

import "./assets/main.css";

import { BootstrapVue3 } from "bootstrap-vue-3";

import { createApp } from "vue";
import App from "./App.vue";

createApp(App).use(BootstrapVue3).mount("#app");
