<template>
  <div class="row">
    <div class="col s12">
      <div class="voz">
        {{ message }}
        <i
          v-on:click="toggleTracking"
          v-bind:class="[
            tracking ? 'red-text' : 'grey-text',
            'mic',
            'material-icons',
            'center-align',
          ]"
          >mic</i
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpeechRecognition",
  props: {
    message_prop: String,
  },
  data() {
    return {
      message: this.message_prop,
      tracking: false,
      recognition: new window.webkitSpeechRecognition(),
      lang: "pt-BR",
    };
  },
  methods: {
    toggleTracking: function () {
      this.$emit("msg", "clicou!");
      this.tracking = !this.tracking;
      if (this.tracking) {
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
    },
    synthesizer: function (texto = "") {
      this.message = texto;
      this.$emit("msg", texto);
      return texto;
    },
    result: function (event) {
      let interim_transcript = "";
      let final_transcript = "";

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
          this.synthesizer(final_transcript);
          console.log("Frase: ", final_transcript);
        } else {
          interim_transcript += event.results[i][0].transcript;
        }

        this.message = interim_transcript;
      }
    },
    onerror: function (event) {
      if (event.error === "not-allowed") {
        console.log("Erro ao acessar o microfone :(. De permissão!!!");
      } else if (event.error === "aborted") {
        console.log("Verifique se seu microfone está desocupado!");
        this.recognition.stop();
      }
    },
    onspeechstart: function () {
      console.log("speech started");
    },
    onspeechend: function () {
      this.recognition.stop();
    },
    onend: function () {
      this.tracking ? this.recognition.start() : this.recognition.stop();
    },
  },
  created: function () {
    this.recognition = Object.assign(this.recognition, {
      continuous: false,
      interimResults: true,
      lang: this.lang || "pt-BR",
      onresult: this.result,
      onerror: this.error,
      onspeechstart: this.onspeechstart,
      onspeechend: this.onspeechend,
      onend: this.onend,
    });
  },
};
</script>

<style scoped>
.voz {
  text-align: right;
  border-bottom: 1px solid #9e9e9e;
  line-height: 37px;
  font-size: 1.2rem;
}

.mic {
  font-size: 40px;
  top: 8px;
  right: -8px;
  position: relative;
}
</style>
