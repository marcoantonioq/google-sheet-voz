<template>
  <Speech @setText="setText" />

  <Form />
</template>

<script>
import Speech from "./SpeechRecognition.vue";
import Form from "./Sheets/SheetForm.vue";

import { Analyzer } from "./Model/ModelAnalyzer.js";

export default {
  name: "Synthesizer",
  components: {
    Speech,
    Form,
  },
  emits: ["setText", "remove"],
  data() {
    return {
      name: "SynthesizerVoz",
      text: "",
    };
  },
  methods: {
    setText(text) {
      Analyzer.analyzer(text);
    },
    setNoPat(text) {
      console.log("Inserir sem patrimônio", text);
      this.values.unshift({
        npat: "",
        local: this.local,
        obs: this.obs,
        lock: false,
      });
    },
  },
  created() {},
};
</script>

<style>
</style>