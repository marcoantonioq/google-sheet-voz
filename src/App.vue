<template>
  <SpeechRecogniotion message="Iniciar" />

  <SheetValues />

  v.1.0.1
</template>

<script>
// import Materialize from './components/Materialize.vue';
import SpeechRecogniotion from "./components/SpeechRecognition.vue";
import SheetValues from "./components/Sheets/SheetValues.vue";

export default {
  name: "App",
  components: {
    SpeechRecogniotion,
    SheetValues,
  },
};
</script>

<style>
</style>
