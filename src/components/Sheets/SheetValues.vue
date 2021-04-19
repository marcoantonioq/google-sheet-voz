<template>
  <div v-for="(items, local) in dataValuesGroup" class="row itens" :key="items">
    <h4>{{ local ? local : "Não informado" }}</h4>
    <div class="row" v-for="item in items" :key="item.key">
      <div class="row">
        <div class="col s12 m2">
          <b>
            {{ item.npat }}
          </b>
        </div>
        <div class="col s12 m10">
          <i>
            {{ item.others }}
          </i>
        </div>
      </div>
      <div class="row">
        <div class="col">
          {{ item.obs ? `Obs: ${item.obs}` : "" }}
        </div>
        <div class="right">
          <button v-on:click.stop.prevent="remove(item.key)" class="btn-flat">
            <i class="material-icons">delete</i>
          </button>
          <button
            v-on:click.stop.prevent="send(item.key)"
            v-bind:class="[item.lock ? 'disabled' : '', 'btn-flat']"
          >
            <i class="material-icons">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

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
    getValuesLocalStorage: function () {
      let values = JSON.parse(localStorage.getItem("values"));
      return values ? values : [];
    },
    saveValuesLocalStorage: function () {
      localStorage.setItem("values", JSON.stringify(this.values));
    },
    groupBy: function (objectArray, property) {
      return objectArray.reduce((acc, obj, index) => {
        const key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push({ key: index, ...obj });
        return acc;
      }, {});
    },
  },
};
</script>

<style>
</style>