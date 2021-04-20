<template>
  <div
    v-for="(items, local) in groupBy(values, 'local')"
    class="row itens"
    :key="items"
  >
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
          <button
            v-on:click.stop.prevent="$emit('remove', item.key)"
            class="btn-flat"
          >
            <i class="material-icons">delete</i>
          </button>
          <button
            v-on:click.stop.prevent="$emit('send', item.key)"
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
import { groupBy } from "../Helpers/Filters.js";

let filters = {
  methods: {
    groupBy: groupBy,
  },
};
export default {
  props: {
    values: {
      type: Array,
      required: true,
    },
  },
  emits: ["remove", "send"],
  data() {
    return {};
  },
  mixins: [filters],
};
</script>

<style scoped>
.itens > .row {
  border-bottom: 1px solid;
  position: relative;
}

.right {
  top: 39px;
  position: absolute;
  right: 0px;
  opacity: 0.8;
}
</style>