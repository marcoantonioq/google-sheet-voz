<template>
  <SynthesizerVoz @msg="mensage"> </SynthesizerVoz>

  <Footer />
</template>

<script>
// import Materialize from './components/Materialize.vue';
import SynthesizerVoz from "./components/SynthesizerVoz.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    SynthesizerVoz,
    Footer,
  },
  methods: {
    mensage(texto) {
      console.log("Recebido texto em app: ", texto);
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
