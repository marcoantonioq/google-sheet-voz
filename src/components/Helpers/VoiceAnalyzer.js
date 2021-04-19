import { match } from "./Validations.js";

var values = [];

/**
 * Push function
 * @param {function} validationFunction Função de validação
 * @param {function} callback Função de retorno (CallBack)
 */
export function voiceAnalyzerPush(validationFunction, callback) {
  values.push([validationFunction, callback]);
}

voiceAnalyzerPush(match(/BONIT?(O|ÃO)|LINDO/), () => {
  console.log("Marco é o mais bonito!");
});

export function voiceAnalyzer(texto) {
  values
    .filter((teste) => {
      return teste[0](texto);
    })
    .forEach(val => {
      val[1]();
    });
}

// let func = voiceAnalyzer("BONITO")
// console.log(func.length)
// func.forEach(el=>{
//   console.log(el())
// });
