<template>
  <a
    v-if="size>2" v-on:click="$emit('clearAll')"
    class="waves-effect waves-light btn"
  >
    Limpart tudo!
    {{ size }}
  </a>
</template>

<script>
export default {
  name: "Clear",
  props: {
    size: Number,
  },
};
</script>

<style scoped>
.btn {
  width: 100%;
  background-color: #690700;
  z-index: -1;
}
</style>