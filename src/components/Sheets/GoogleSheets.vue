<template>Sheets</template>

<script>
export default {
  data() {
    return {
      values: [],
      cache: [],
    };
  },
  methods: {
    remove: function (key) {
      this.values.splice(key, 1);
    },
    addValues: function (id) {
      this.values.unshift({
        npat: id,
        local: "Local123",
        obs: "Observações...",
        lock: false,
      });
    },
    getValuesLocalStorage: function () {
      let values = JSON.parse(localStorage.getItem("values"));
      return values ? values : [];
    },
    saveValuesLocalStorage: function () {
      localStorage.setItem("values", JSON.stringify(this.values));
    },
  },
};
</script>

<style>
</style>