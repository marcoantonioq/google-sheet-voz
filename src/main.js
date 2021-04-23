import { createApp } from "vue";
import App from "./App.vue";
import { ModelAnalyzer } from "./components/Model/ModelAnalyzer.js";
import mitt from "mitt";

const emitter = mitt();

const app = createApp(App);

app.config.globalProperties.emitter = emitter;
app.mixin(ModelAnalyzer)

app.mount("#app");
