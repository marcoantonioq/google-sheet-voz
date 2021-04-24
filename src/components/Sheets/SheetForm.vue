<template>
  <div class="row">
    <div class="input-field col s12">
      <div class="input-field col s12">
        <label for="npat" class="">Número de patrimônio</label>
        <input id="npat" v-model="value.npat" type="number" class="validate" />
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">location_on</i>
        <label for="local" class="">Local</label>
        <input id="local" v-model="value.local" type="text" class="validate" />
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">more_horiz</i>
        <input id="obs" v-model="value.obs" type="text" class="validate" />
        <label for="obs">Observações</label>
      </div>
    </div>
    <div class="center-align col s12">
      <a class="col s6" @click.stop.prevent="add_col">
        <i class="medium material-icons"> add_box </i>
      </a>
      <a class="col s6" @click.stop.prevent="submit">
        <i class="medium material-icons"> save </i>
      </a>
    </div>
  </div>
</template>

<script>
// import { Sheet } from "../Helpers/GoogleSheet.js";
import { isNotEmpty } from "../Helpers/Validations.js";

export default {
  name: "SheetForm",
  data() {
    return {
      name: "SheetForm",
      value: {
        npat: null,
        local: "",
        obs: "",
        others: "",
        lock: false,
        auto_send: true,
      },
    };
  },
  watch: {
    "value.npat": function (npat) {
      console.log(npat)
      // this.others = Sheet.getInfo(npat);
    },
  },
  methods: {
    add_col: function () {
      console.log("Add col");
    },
    pushValues: function (value) {
      this.$emit("pushValues", value);
    },
    submit: function () {
      const valid = [isNotEmpty(this.value.npat), isNotEmpty(this.value.local)];

      if (valid.every((e) => e)) {
        console.log("on push submit");
        this.pushValues(this.value);
        this.saveStorage("form", this.value);
      } else {
        this.emitter.emit("msg", "Verifique todos o campos!");
      }
    },
    readStorage: function (key) {
      return JSON.parse(localStorage.getItem(key));
    },
    saveStorage: function (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  },
  created() {
    // let form = this.readStorage("form");
    // if (form) {
    //   this.value = form;
    // } 
  },
};
</script>

<style scoped>
.medium {
  font-size: 2.3rem;
}
</style>