<template>
  <div class="row">
    <div class="input-field col s12">
      <i class="material-icons prefix">location_on</i>
      <label for="local" class="">Local</label>
      <input id="local" v-model="local" type="text" class="validate" />
    </div>
    <div class="input-field col s12">
      <i class="material-icons prefix">more_horiz</i>
      <input id="obs" type="text" class="validate" />
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
import {Analyzer} from "../Helpers/VoiceAnalyzer.js";

Analyzer.registerEvent(match(/(^LOCAL|^SALA|^Bloco|^FALA)/), ()=>{
  console.log("Inserir localllll!")
})


export default {
  name: "SheetInfo",
  data() {
    return {
      local: "Sl 1",
      message: "Bem vindo!",
    };
  },
  watch: {
    local(val, old) {
      console.log(val, old);
    },
  },
};
</script>

<style>
</style>