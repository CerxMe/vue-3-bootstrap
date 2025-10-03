import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import "./assets/reset.css";

createApp(App).use(router).mount("#app");
