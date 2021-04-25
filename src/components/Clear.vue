<template>
  <a v-on:click="$emit('clearAll')" class="red waves-effect waves-light btn"> Limpart tudo! </a>
</template>

<script>
export default {
  name: "Clear",
};
</script>

<style scoped>
.btn {
  width: 100%;
}
</style>