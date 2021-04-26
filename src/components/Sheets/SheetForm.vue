<template>
  <div class="fixed">
    <div class="input-field col s12">
      <input
        id="npat"
        @focus="$event.target.select()"
        v-model="value.npat"
        placeholder="Número de patrimônio"
        type="number"
        class="validate"
      />
      <a class="s12" @click.stop.prevent="submit">
        <i class="medium material-icons add"> add_box </i>
      </a>
    </div>
  </div>
  <div class="form row">
    <div class="input-field col s12">
      <i class="material-icons prefix">title</i>
      <label for="titulo" class="">Titulo item</label>
      <input id="titulo" v-model="value.titulo" type="text" class="validate" />
    </div>

    <div class="input-field col s12">
      <i class="material-icons prefix">person</i>
      <label for="responsavel" class="">Responsável</label>
      <input
        id="responsavel"
        v-model="value.responsavel"
        type="text"
        class="validate"
      />
    </div>

    <div class="input-field col s12">
      <i class="material-icons prefix">location_on</i>
      <label for="local" class="">Local</label>
      <input id="local" v-model="value.local" type="text" class="validate" />
    </div>

    <div class="input-field col s12">
      <i class="material-icons prefix">favorite</i>
      <label for="status" class="">Estado informado</label>
      <input id="status" v-model="value.status" type="text" class="validate" />
    </div>

    <div class="input-field col s12">
      <i class="material-icons prefix">more_horiz</i>
      <input id="obs" v-model="value.obs" type="text" class="validate" />
      <label for="obs">Observações</label>
    </div>
  </div>
</template>

<script>
import { isNotEmpty } from "../Helpers/Validations.js";
import { build } from "../Helpers/ListaDataSets.js";

export default {
  name: "SheetForm",
  emits: ["pushValues"],
  data() {
    return {
      name: "SheetForm",
      value: {
        npat: null,
        titulo: "",
        responsavel: "",
        local: "",
        status: "",
        obs: "",
        others: "",
        lock: false,
        icosent: "cloud_queue",
        auto_add: true,
        auto_send: false,
      },
    };
  },
  watch: {},
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
    let form = this.readStorage("form");
    if (form) {
      this.value = form;
    }

  },
  mounted(){
    build("local", (str) => {
      this.value.local = str;
    });
    build("status", (str) => {
      this.value.status = str;
    });
    build("responsavel", (str) => {
      this.value.responsavel = str;
    });
  }
};
</script>

<style scoped>
.add {
  position: absolute;
  top: 10px;
  right: 28px;
  color: #fff !important;
}

.medium {
  font-size: 2.3rem;
}

.fixed {
  position: fixed;
  background-color: #195128;
  left: 0;
  width: 100%;
  z-index: 99;
}

.fixed .input-field {
  padding: 5px 30px;
  margin: 0px;
}
.fixed .input-field input {
  font-weight: 700;
  color: #fff;
}

.form {
  margin-top: 70px;
}
</style>