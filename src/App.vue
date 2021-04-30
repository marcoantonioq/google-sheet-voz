<template>
  <!--
    Desenvolvido por: Marco Antônio Queiroz
    https://github.com/marcoantonioq/google-sheet-voz
  -->

  <div v-if="transcript" class="transcript">
    {{ transcript }}
  </div>

  <Form @pushValues="pushValues" />

  <Values @remove="removeValue" @send="sendGoogleSheet" :values="values" />

  <ClearAll @clearAll="clearAll" :size="values.length" />

  <Menu
    @transcript="(e) => (this.transcript = e)"
    @sendGoogleSheet="sendGoogleSheet"
    @phrase="setPhrase"
    :values="values"
  />

  <Footer></Footer>
</template>

<script>
import Values from "./components/Sheets/ShowValues.vue";
import Menu from "./components/Menu.vue";
import Form from "./components/Sheets/SheetForm.vue";
import ClearAll from "./components/Clear.vue";
import Footer from "./components/Footer.vue";

import { Analyzer } from "./components/Model/ModelAnalyzer.js";
import { Sheet } from "./components/Helpers/GoogleSheet.js";

export default {
  name: "App",
  components: {
    Values,
    Form,
    Menu,
    ClearAll,
    Footer,
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
      Analyzer.analyzer(text.trim());
    },
    getOthers(npat) {
      return this.cache
        .find((el) => el[0] == npat)
        ?.filter((v) => v)
        ?.join("<br>");
    },
    pushValues(values) {
      values.others = this.getOthers(values.npat);
      let obj = JSON.parse(JSON.stringify(values));
      this.values.unshift(obj);
      this.saveStorage("values", this.values);
    },
    removeValue(key) {
      let msg = `Remover ${this.values[key].npat} item?`;
      if (confirm(msg)) {
        this.values.splice(key, 1);
        this.saveValues();
      }
    },
    saveValues: async function () {
      this.saveStorage("values", this.values);
    },
    syncCache: async function () {
      Sheet.getCache((el) => {
        this.cache = JSON.parse(el);
        this.emitter.emit("msg", "Cache atualizada!!!");
      });
    },
    sendGoogleSheet: async function (key, remove = true) {
      this.values[key].lock = true;
      let value = Object.values(this.values[key]);
      console.log("App sendGoogle:", value);
      this.values[key].icosent = "cloud_upload";
      Sheet.pushValues(
        value,
        (data) => {
          this.emitter.emit("msg", "Enviado com sucesso!!!");
          this.values[key].lock = false;
          this.values[key].icosent = "cloud_done";
          data.status && remove && this.removeValue(key);
          this.saveValues();
        },
        () => {
          this.values[key].lock = false;
          this.emitter.emit("msg", "Erro ao enviar!!!");
          this.values[key].icosent = "cloud_off";
        }
      );
    },
    getGoogleSheet(npat) {
      Sheet.getInfo(npat);
    },
    saveStorage: function (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    readStorage: function (key) {
      return JSON.parse(localStorage.getItem(key));
    },
    clearStorage: function () {
      localStorage.clear();
    },
    clearAll: function () {
      if (confirm("Deseja limpar tudo?")) {
        this.values = [];
        this.clearStorage();
      }
    },
  },
  created() {
    this.syncCache();

    let values = this.readStorage("values");
    if (values) {
      this.values = values;
    } else {
      this.clearStorage();
    }

    this.emitter.on("msg", (text) => {
      // eslint-disable-next-line no-undef
      M.toast({ html: text });
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    });
  },
};
</script>

<style>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #fafbfc;
}

a {
  cursor: pointer;
  color: #000801;
}

i {
  color: #000801;
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
  background-color: #15842a;
  color: #fff;
  border-radius: 0px 0px 0px 5px;
  z-index: 100;
  box-shadow: 1px 6px 16px 2px rgba(0, 0, 0, 0.3);
}
</style>
