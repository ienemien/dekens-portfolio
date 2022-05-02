import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import dayjs from "dayjs";
import nl from "dayjs/locale/nl";

dayjs.locale(nl);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
