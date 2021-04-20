<template>
  <Speech @setText="setText" />

  <Form />
</template>

<script>
import Speech from "./SpeechRecognition.vue";
import Form from "./Sheets/SheetForm.vue";

import { match } from "./Helpers/Validations.js";
// import { toNumber } from "./Helpers/ConvertValues.js";
import { Analyzer } from "./Helpers/VoiceAnalyzer.js";


export default {
  components: {
    Speech,
    Form,
  },
  emits: ["setText", "remove"],
  data() {
    return {
      text: "",
    };
  },
  methods: {
    setText(text) {
      // Analyzer.analyzer(text);
      this.$emit("setText", text);
    },
  },
  created() {
    Analyzer.registerEvent(match(/^SEM PATRIMÔNIO$/), () => {
      console.log("Inserir sem patrimênio!");
    });

    Analyzer.registerEvent(match(/^APAGAR$/), () => {
      console.log("Apagar ultimo item!");
      this.$emit("remove", 12333333);
    });

    Analyzer.analyzer("APAGAR")
    Analyzer.analyzer("SEM PATRIMÔNIO")
  },
};
</script>

<style>
</style>