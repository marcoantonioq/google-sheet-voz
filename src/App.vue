<template>
  <!--
    Desenvolvido por: Marco Antônio Queiroz
    https://github.com/marcoantonioq/google-sheet-voz
  -->

  <div class="transcript">
    {{ transcript }}
  </div>

  <Form @pushValues="pushValues" />

  <Values @remove="removeValue" @send="sendGoogleSheet" :values="values" />

  <Menu
    @transcript="(e) => (this.transcript = e)"
    @phrase="setPhrase"
    :values="values"
  />
</template>

<script>
import Values from "./components/Sheets/ShowValues.vue";
import Menu from "./components/Menu.vue";
import Form from "./components/Sheets/SheetForm.vue";

import { Analyzer } from "./components/Model/ModelAnalyzer.js";
import { Sheet } from "./components/Helpers/GoogleSheet.js";

export default {
  name: "App",
  components: {
    Values,
    Form,
    Menu,
  },
  data() {
    return {
      name: "App",
      values: [],
      transcript: "",
      cache: [],
    };
  },
  watch: {},
  methods: {
    mensage(text) {
      console.log("Recebido texto em app: ", text);
    },
    setPhrase(text) {
      Analyzer.analyzer(text);
    },
    pushValues(values) {
      let obj = JSON.parse(JSON.stringify(values));
      this.values.unshift(obj);
      this.saveStorage("values", this.values);
      this.emitter.emit("msg", "Salvo com sucesso!!!");
    },
    removeValue(key) {
      let msg = `Remover ${this.values[key].npat} item?`;
      if (confirm(msg)) {
        this.values.splice(key, 1);
        this.saveStorage("values", this.values);
      }
    },
    sendGoogleSheet(e) {
      console.log("App sendGoogle:", e);
    },
    getGoogleSheet(npat) {
      Sheet.getInfo(npat);
    },
    readStorage: function (key) {
      return JSON.parse(localStorage.getItem(key));
    },
    clearStorage: function () {
      localStorage.clear();
    },
    saveStorage: function (key, value) {
      console.log(`Salvar ${key}:`, value);
      localStorage.setItem(key, JSON.stringify(value));
    },
  },
  created() {
    let values = this.readStorage("values");
    console.log(values);
    if (values) {
      this.values = values;
    } else {
      this.clearStorage();
    }

    this.emitter.on("msg", (text) => {
      console.log(text);
    });
  },
};
</script>

<style>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#app {
  min-height: 100vh;
  margin-bottom: 120px;
}

.transcript {
  font-size: 1.2rem;
  max-width: 50%;
  padding: 0.9rem;
  position: fixed;
  right: 0;
  text-align: right;
  background-color: #ffeded;
  border-radius: 0px 0px 0px 5px;
  z-index: 1;
}
</style>
