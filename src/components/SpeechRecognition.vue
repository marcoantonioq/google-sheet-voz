<template>
  <a v-on:click="toggleTracking">
    <i
      v-bind:class="[
        tracking ? 'red-text' : '',
        'mic',
        'material-icons',
        'center-align',
      ]"
      >mic
    </i>
  </a>
</template>

<script>
export default {
  name: "SpeechRecognition",
  emits: ["phase", "transcript"],
  data() {
    return {
      phrase: "",
      transcript: "",
      tracking: false,
      recognition: false,
      lang: "pt-BR",
    };
  },
  watch: {
    phrase: function (val) {
      this.$emit("phase", val);
    },
    transcript: function (val) {
      this.$emit("transcript", val);
    },
  },
  methods: {
    start: function () {
      console.log("start");
      let sr = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (sr) {
        this.recognition = Object.assign(new sr(), {
          continuous: true,
          interimResults: true,
          lang: this.lang || "pt-BR",
          onresult: this.result,
          onstart: this.onstart,
          onerror: this.onerror,
          onspeechstart: this.onspeechstart,
          onspeechend: this.onspeechend,
          onend: this.onend,
        });
        this.recognition.start();
      } else {
        alert("Navegador não compativél com speech recognition!");
      }
    },
    onstart() {
      this.tracking = true;
    },
    stop: function () {
      this.tracking = false;
      this.recognition.stop();
    },
    onend: function () {
      console.log("stop");
      this.tracking ? this.start() : this.stop();
    },
    result: function (event) {
      this.transcript = "";
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.phrase = event.results[i][0].transcript;
          console.log(this.phrase);
        } else {
          this.transcript += event.results[i][0].transcript;
        }
      }
    },
    onerror: function (event) {
      if (event.error === "not-allowed") {
        this.emitter.emit(
          "msg",
          "Erro ao acessar o microfone :(. De permissão!!!"
        );
      } else if (event.error === "aborted") {
        this.emitter.emit("msg", "Verifique se seu microfone está desocupado!");
      }
      this.stop();
    },
    onspeechstart: function () {
      console.log("speech started");
    },
    toggleTracking: function (e) {
      console.log("toggle");
      if (e.target) {
        this.tracking = !this.tracking;
        if (this.tracking) {
          this.start();
        } else {
          this.stop();
        }
      }
    },
  },
  created() {},
};
</script>

<style scoped>
a,
i {
  color: #fff;
}

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
