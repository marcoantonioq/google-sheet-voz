<template>
  <a
    v-on:click="$emit('clearAll')"
    v-if="size > 2"
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
}
</style>