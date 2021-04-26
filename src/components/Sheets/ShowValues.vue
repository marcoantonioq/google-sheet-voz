<template>
  <div
    v-for="(items, local) in groupBy(values, 'local')"
    class="row itens"
    :key="items"
  >
    <h4>
      <i class="material-icons prefix"> place </i>
      {{ local ? local : "Não informado" }}
    </h4>
    <div class="row" v-for="item in items" :key="item.key">
      <div class="row">
        <div class="col s12 m2">
          <b>
            {{ item.npat }}
          </b>
        </div>
        <div class="col s12 m10">
          <i v-html="item.others"></i>
        </div>
      </div>
      <div class="row">
        <div class="col">
            {{ item.titulo }} • {{ item.responsavel }} •
            {{ item.local }} • {{ item.status }}<br />
            {{ item.obs ? `Obs: ${item.obs}` : "" }} <br />
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
            <i class="material-icons">{{ item.icosent || "cloud_queue" }}</i>
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

.prefix {
  font-size: 2rem;
}

.right {
  top: -9px;
  position: absolute;
  right: 0px;
  opacity: 0.7;
}
.right:hover {
  opacity: 1;
}
</style>