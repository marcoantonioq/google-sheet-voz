<template>
  <div class="menu">
    <div class="row center-align">
      <a class="col s3">
        <i class="medium material-icons">import_export</i> <br />
        Exportar
      </a>
      <a class="col s3">
        <i class="medium material-icons">sync</i> <br />
        Sincronizar
      </a>
      <a class="col s3">
        <i class="medium material-icons">send</i> <br />
        Enviar
      </a>
      <Speech @phase="e=>$emit('phrase',e)" @transcript="e=>$emit('transcript',e)" /> <br />
    </div>
  </div>
</template>

<script>
import Speech from "./SpeechRecognition.vue";

export default {
  name: "Menu",
  components: {
    Speech,
  },
  methods: {
    // phase(e) {
    //   this.$emit("phrase", `Pha ${e}`);
    // },
    // transcript(e) {
    //   this.$emit("transcript", `Transc ${e}`);
    // },
  },
};
</script>

<style scoped>
.medium {
  font-size: 2rem;
}

.menu {
  background: #333;
  bottom: 0;
  left: 0;
  padding: 0.4rem;
  position: fixed;
  width: 100%;
}
.menu .row {
  margin: 0;
}
</style>