<template>
  <div class="row">
    <div class="input-field col s12">
      <i class="material-icons prefix">location_on</i>
      <label for="local" class="">Local</label>
      <input id="local" v-model="local" type="text" class="validate" />
    </div>
    <div class="input-field col s12">
      <i class="material-icons prefix">more_horiz</i>
      <input id="obs" v-model="obs" type="text" class="validate" />
      <label for="obs">Observações</label>
    </div>
    <div class="col s12">
      <input type="checkbox" class="filled-in" />
      <span>Auto enviar</span>
    </div>
  </div>
</template>

<script>
import { match } from "../Helpers/Validations.js";
import { Analyzer } from "../Helpers/VoiceAnalyzer.js";

export default {
  name: "SheetInfo",
  data() {
    return {
      local: "",
      obs: "",
      message: "Bem vindo!",
    };
  },
  watch: {
    local(val, old) {
      console.log(val, old);
    },
  },
  created: function () {
    Analyzer.registerEvent(match(/(^LOCAL|^SALA|^Bloco|^FALA)/), (texto) => {
      console.log("Vamosl inserir o local: ", texto);
      let replace = texto.replace(/^(F|f)ala/g, "Sala");
      this.local = replace.replace(/^(L|l)ocal /g, "");
    });

    Analyzer.registerEvent(match(/^OBSERVAÇ(ÃO|ÕES)/), (texto) => {
      let replace = texto.replace(/^(O|o)bservação /g, "");
      this.obs = replace[0].toUpperCase() + replace.substr(1);
    });

    Analyzer.registerEvent(match(/^OBSERVAÇ(ÃO|ÕES)/), (texto) => {
      let replace = texto.replace(/^(O|o)bservação /g, "");
      this.obs = replace[0].toUpperCase() + replace.substr(1);
    });
  },
};
</script>

<style>
</style>