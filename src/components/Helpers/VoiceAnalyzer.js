import { match } from "./Validations.js";

/**
 * Singleton function VoiceAnalyzer
 */
function VoiceAnalyzer() {
  var instance = {};
  var values = [];
  // Set the instance.
  instance = this;

  // eslint-disable-next-line no-func-assign
  VoiceAnalyzer = function() {
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

  instance.registerEvent(match(/BONIT?(O|ÃO)|LINDO/), () => {
    console.log("Marco é o mais bonito!");
  });

}

var Analyzer = new VoiceAnalyzer();

export {Analyzer};

// let func1 = new VoiceAnalyzer();
// let func2 = new VoiceAnalyzer();

// console.log(func1 === func2);

// func1.analyzer("Bonito")

// console.log("Func1", func1.getValues());
// console.log("Func2", func2.getValues());
// func.forEach(el=>{
//   console.log(el())
// });
