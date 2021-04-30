<template>
  <div class="fixed">
    <div class="input-field col s12">
      <input
        id="npat"
        ref="npat"
        @keyup.enter="submit"
        @focus="$event.target.select()"
        v-model="value.npat"
        placeholder="Número de patrimônio"
        type="number"
        class="validate"
        autocomplete="off"
      />
      <a class="s12" @click.stop.prevent="submit">
        <i class="medium material-icons add"> add_box </i>
      </a>
    </div>
  </div>
  <div class="form row">
    <div class="input-field col s12">
      <i class="material-icons prefix">title</i>
      <input
        id="titulo"
        @input="upper($event)"
        v-model="value.titulo"
        placeholder="Título do item"
        type="text"
        class="validate"
        autocomplete="off"
      />
    </div>

    <div class="input-field col s12">
      <i class="material-icons prefix">person</i>
      <input
        id="responsavel"
        @input="lower($event)"
        v-model="value.responsavel"
        placeholder="Responsável (e-mail)"
        type="email"
        class="validate"
        autocomplete="off"
      />
    </div>

    <div class="input-field col s12">
      <i class="material-icons prefix">location_on</i>
      <input
        id="local"
        @input="upper($event)"
        v-model="value.local"
        placeholder="Local"
        type="text"
        class="validate"
        autocomplete="off"
      />
    </div>

    <div class="input-field col s12">
      <i class="material-icons prefix">healing</i>
      <input
        id="status"
        @input="upper($event)"
        v-model="value.status"
        placeholder="Estado informado"
        type="text"
        class="validate"
        autocomplete="off"
      />
    </div>

    <div class="input-field col s12">
      <i class="material-icons prefix">more_horiz</i>
      <input
        id="obs"
        @input="upper($event)"
        v-model="value.obs"
        placeholder="Observações"
        type="text"
        class="validate"
      />
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="value.auto_add" />
        <span>Adicionar automaticamente</span>
      </label>
    </p>
  </div>
</template>

<script>
import { isNotEmpty } from "../Helpers/Validations.js";
import { build } from "../Helpers/ListaDataSets.js";
import { beep } from "../Helpers/Beep.js";

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
  methods: {
    upper(e) {
      e.target.value = e.target.value.toUpperCase();
    },
    lower(e) {
      e.target.value = e.target.value.toLocaleLowerCase();
    },
    pushValues: function (value) {
      this.$emit("pushValues", value);
      return true;
    },
    submit: function () {
      console.log("submit", this.value);
      const valid = [isNotEmpty(this.value.npat), isNotEmpty(this.value.local)];
      if (valid.every((e) => e)) {
        // Selecionar npat
        this.$refs.npat.select();
        // enviar
        this.pushValues(this.value) && beep();
        this.saveStorage("form", this.value);
      } else {
        console.log("Verifique todos os campos!!!");
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
      this.value = Object.assign(this.value, form);
    }
  },
  mounted() {
    // Contruir onComplete
    build("local", (str) => {
      this.value.local = str;
    });
    build("status", (str) => {
      this.value.status = str;
    });
    build("responsavel", (str) => {
      this.value.responsavel = str;
    });
  },
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