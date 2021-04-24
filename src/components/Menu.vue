<template>
  <div class="menu">
    <div class="row center-align">
      <a @click.stop.prevent="sendMail" class="col s3">
        <i class="medium material-icons">import_export</i> <br />
        Exportar
      </a>
      <a class="col s3">
        <i @click.stop.prevent="syncAll" class="medium material-icons">sync</i> <br />
        Sincronizar
      </a>
      <a class="col s3">
        <i @click.stop.prevent="sendAll" class="medium material-icons">cloud_upload</i> <br />
        Enviar
      </a>
      <Speech
        @phase="(e) => $emit('phrase', e)"
        @transcript="(e) => $emit('transcript', e)"
      />
      <br />
    </div>
  </div>
</template>

<script>
import Speech from "./SpeechRecognition.vue";

export default {
  name: "Menu",
  props: {
    values: Array,
  },
  components: {
    Speech,
  },
  methods: {
    sendMail() {
      let values = this.values.map((el) => {
        return "\n" + Object.values(el).join(";\t");
      });
      let subject = `Inventário: backup realizado em ${new Date().toLocaleString('pt-BR')}`

      let body = encodeURIComponent(`
      ${subject}

      ${values}`);

      window.open(`mailto:cap.goias@ifg.edu.br?subject=${subject}&body=${body}`);
    },
    syncAll(){
      console.log("sync all");
    },
    sendAll(){
      console.log("Send all");
    },
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