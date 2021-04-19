<template>
  <div class="row">
    <div class="input-field col s12">
      <i class="material-icons prefix">location_on</i> 
      <input id="local" type="text" class="validate"> 
      <label for="local" class="">Local</label>
    </div> 
    <div class="input-field col s12">
      <i class="material-icons prefix">more_horiz</i> 
      <input id="obs" type="text" class="validate"> 
      <label for="obs">Observações</label>
    </div> 
    <div class="col s12">
        <input type="checkbox" class="filled-in"> 
        <span>Auto enviar</span>
    </div>
    {{message}}
  </div>
</template>

<script>
export default {
  name:'SheetInfo',
  data() {
    return {
      message: "Bem vindo!"
    }
  }

}
</script>

<style>
</style>