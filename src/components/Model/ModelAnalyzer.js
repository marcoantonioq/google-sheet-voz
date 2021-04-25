import * as Valid from "../Helpers/Validations.js";

var Analyzer = new TasksAnalyzer();

const Model = {
  SheetInfo: (component) => {
    console.log("Analyzer on info!!!!", component);
  },
  SheetForm: (component) => {
    // add numero de patrimônio
    Analyzer.registerEvent(Valid.match(/^^(\d)+/), (text) => {
      let numValid = [Valid.isNumber, Valid.gt(10000)];
      let num = +text.replace(/\D+/g, "");
      let isValid = numValid.every((fun) => fun(num));
      console.log("recebido valor", num);
      if (isValid) {
        component.value.npat = num;
        component.value.auto_add && component.submit();
      }
    });

    Analyzer.registerEvent(
      Valid.match(/(^LOCAL|^SALA|^Bloco|^FALA)/),
      (texto) => {
        console.log("Vamos inserir o local: ", texto);
        let replace = texto.replace(/^(F|f)ala/g, "Sala");
        component.value.local = replace.replace(/^(L|l)ocal /g, "");
      }
    );

    Analyzer.registerEvent(Valid.match(/^OBSERVAÇ(ÃO|ÕES)/), (texto) => {
      let replace = texto.replace(/^(O|o)bservação /g, "");
      component.value.obs = replace[0].toUpperCase() + replace.substr(1);
    });

    Analyzer.registerEvent(Valid.match(/^OBSERVAÇ(ÃO|ÕES)/), (texto) => {
      let replace = texto.replace(/^(O|o)bservação /g, "");
      component.value.obs = replace[0].toUpperCase() + replace.substr(1);
    });

    Analyzer.registerEvent(Valid.match(/^SEM PATRIMÔNIO$/), (text) => {
      if (!this.value.obs) {
        console.log("Não passou");
        component.emitter.emit("msg", "Informe uma observação!!!");
      } else {
        console.log("Passou");
        this.setNoPat(text);
      }
    });
  },
  App: (component) => {
    Analyzer.registerEvent(Valid.match(/^(APAGA|REMOVE)?(R|)$/), () => {
      component.emitter.emit("msg", "Apagar ultimo item!");
      component.removeValue(0);
    });
  },
};

/**
 * Singleton function VoiceAnalyzer
 */
function TasksAnalyzer() {
  var instance = {};
  var values = [];
  // Set the instance.
  instance = this;

  // eslint-disable-next-line no-func-assign
  TasksAnalyzer = function() {
    return instance;
  };

  /**
   * Push function
   * @param {function} validationFunction Função de validação
   * @param {function} callback Função de retorno (CallBack)
   */
  instance.registerEvent = (validationFunction, callback) => {
    values.push([validationFunction, callback]);
  };

  /**
   * Função analisa o texto informado!
   * @param {text} texto Texto Speec
   */
  instance.analyzer = (texto) => {
    values
      .filter((teste) => {
        try {
          return teste[0](texto);
        } catch (e) {
          console.error(e);
        }
      })
      .forEach((val) => {
        try {
          val[1](texto);
        } catch (e) {
          console.error(e);
        }
      });
  };

  instance.registerEvent(Valid.match(/BONIT?(O|ÃO)|LINDO/), () => {
    console.log("Marco é o mais bonito!");
  });
}

let ModelAnalyzer = {
  created() {
    try {
      Model[this.name](this);
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    } catch (e) {
      e;
    }
  },
};

export { Analyzer, ModelAnalyzer };
