<template>
  <SynthesizerVoz @remove="removeValue" @setText="setItem" />

  <Values @remove="removeValue" @send="sendGoogleSheet" :values="values" />

  <Footer />
</template>

<script>
// import Materialize from './components/Materialize.vue';
import SynthesizerVoz from "./components/SynthesizerVoz.vue";
import Values from "./components/Sheets/ShowValues.vue";
import Footer from "./components/Footer.vue";

let val = [
  {
    npat: 1,
    local: "Local123",
    obs: "Observações 1...",
    lock: false,
  },
  {
    npat: 2,
    local: "Local123",
    obs: "Observações 2...",
    lock: false,
  },
  {
    npat: 3,
    local: "Local3",
    obs: "Observações 3...",
    lock: false,
  },
];

export default {
  name: "App",
  components: {
    SynthesizerVoz,
    Values,
    Footer,
  },
  data() {
    return {
      values: val,
    };
  },
  methods: {
    mensage(text) {
      console.log("Recebido texto em app: ", text);
    },
    setItem(text) {
      console.log("Ok, vamos setar o item: ", text);
    },
    removeValue(e) {
      confirm(`Remover remover item?`) && console.log("App remove:", e);
    },
    sendGoogleSheet(e) {
      console.log("App sendGoogle:", e);
    },
  },
};
</script>

<style>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
</style>
