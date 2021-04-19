<template>
  <SpeechRecognition @msg="receiveMensage" />

  <SheetForm />

  <SheetValues />
</template>

<script>
import SpeechRecognition from "./SpeechRecognition.vue";
import SheetForm from "./Sheets/SheetForm.vue";
import SheetValues from "./Sheets/SheetValues.vue";

import { isNotEmpty, isNumber, match } from "./Helpers/Validations.js";
import { toNumber } from "./Helpers/ConvertValues.js";
import { voiceAnalyzer, voiceAnalyzerPush } from "./Helpers/VoiceAnalyzer.js";

let teste = function() {
  console.log(SheetForm)
}

// console.log('VoiceAnalyzer:', voiceAnalyzer("BONITO"));
voiceAnalyzerPush(match(/^SEM PATRIMÔNIO$/), teste);
voiceAnalyzer("Sem patrimônio")


// func.forEach(el=>{
//   el()
// });

export default {
  components: {
    SpeechRecognition,
    SheetForm,
    SheetValues,
  },
  data() {
    return {
      texto: "",
    };
  },
  methods: {
    synthesizer: function (texto = "") {
      this.message = texto;

      if (isNotEmpty(texto)) {
        try {
          const sendLog = (msg) => {
            console.log(msg);
          };

          // Verifica se é bonito
          if (texto.toUpperCase().match(/BONIT?(O|ÃO)|LINDO/)) {
            sendLog("Marco é o mais bonito!!! :D");
            return true;
          }

          if (texto.toUpperCase().match(/^SEM PATRIMÔNIO$/)) {
            if (!this.obs) {
              sendLog("Informe uma observação!!!");
              throw "Item sem patrimônio adicionado!";
            }
            this.values.unshift({
              npat: "",
              local: this.local,
              obs: this.obs,
              lock: false,
            });
            sendLog(`Ok, adicionado ${this.obs} em ${this.local}!`);
            throw "Item sem patrimônio adicionado!";
          }

          if (texto.toUpperCase().match(/(^LOCAL|^SALA|^Bloco|^FALA)/)) {
            let replace = texto.replace(/^(F|f)ala/g, "Sala");
            replace = replace.replace(/^(L|l)ocal /g, "");
            this.local = replace[0].toUpperCase() + replace.substr(1);
            throw "Local setado!";
          }

          if (texto.toUpperCase().match(/^OBSERVAÇ(ÃO|ÕES)/)) {
            let replace = texto.replace(/^(O|o)bservação /g, "");
            this.obs = replace[0].toUpperCase() + replace.substr(1);
            throw "Local setado!";
          }

          let num = +texto.replace(/\D+/g, "");
          console.log("Numero PAT: ", num);

          if (!this.local) {
            sendLog("Informe um local!");
            throw "Informe local!";
          }

          if (isNumber(num) && num > 10000) {
            this.values.unshift({
              npat: +num,
              local: this.local,
              obs: this.obs,
              lock: false,
            });
            this.syncSheetToValues(+num);
          } else {
            let msg = `'${texto}' não é um valor válido!`;
            sendLog(msg);
            throw msg;
          }
        } catch (e) {
          console.log("Status: ", e);
          return false;
        }
      }
    },
    receiveMensage(texto) {
      console.log("Nao está vazia: ", isNotEmpty(texto));
      console.log("É numero: ", isNumber(toNumber(texto)));
      this.texto = texto;
      console.log("Recebido texto em synthesizer: ", texto);
    },
  },
};
</script>

<style>
</style>