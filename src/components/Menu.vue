<template>
  <div class="menu">
    <div class="row center-align">
      <a @click.stop.prevent="sendMail" class="col s4">
        <i class="medium material-icons">import_export</i> <br />
        Exportar
      </a>
      <!-- <a class="col s4">
        <i @click.stop.prevent="syncAll" class="medium material-icons">sync</i> <br />
        Sincronizar
      </a> -->
      <a class="col s4">
        <i @click.stop.prevent="sendAll" class="medium material-icons">
          cloud_upload
        </i>
        <br />
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
      let values = this.values.map((e) => {
        return `\n ${e.npat}; ${e.titulo}; ;${e.responsavel}; ; ${e.local}; ${e.status}; ; ${e.obs} ${e.obs}\t`;
      });
      let subject = `Inventário: backup realizado em ${new Date().toLocaleString(
        "pt-BR"
      )}`;

      let body = encodeURIComponent(`${values.join('')}`);
      window.open(
        `mailto:cap.goias@ifg.edu.br?subject=${subject}&body=${body}`
      );
    },
    syncAll() {
      console.log("sync all");
    },
    sendAll() {
      if (confirm("Enviar tudo?")) {
        this.values.forEach((e, key) => {
          if (e.icosent != "cloud_done") {
            console.log("Enviado", e);
            this.$emit("sendGoogleSheet", key, false);
          } else {
            console.log("Não enviado", e);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.medium {
  font-size: 2rem;
}

a, i {
  color: #FFF !important;
}

.menu {
  background: #195128;
  color: #FFF;
  bottom: 0;
  left: 0;
  padding: 0.4rem;
  position: fixed;
  width: 100%;
  z-index: 99;
}
.menu .row {
  margin: 0;
}
</style>