function GoogleSheet() {
  var instance = {};

  // Set the instance.
  instance = this;

  // eslint-disable-next-line no-func-assign
  GoogleSheet = function() {
    return instance;
  };
  let func = (el) => el;

  // instance.getDataBase = (id) => {
  //   google.script.run.withSuccessHandler(() => {}).pushValueWebApp(id);
  // };

  instance.pushValues = (value, call = func, fail = func) => {
    try {
    // eslint-disable-next-line no-undef
    google.script.run
      .withSuccessHandler(call)
      .withFailureHandler(fail)
      .pushValueWebApp(value);
    } catch (e) {
      console.log("Erro GooglePushValues");
    }
  };

  /**
   * Pega dados do Banco de Dados
   * @param {function} call Função de retorno
   * @returns void
   */
  instance.getCache = (call, fail = func) => {
    try {
      // eslint-disable-next-line no-undef
      return google.script.run
        .withSuccessHandler(call)
        .withFailureHandler(fail)
        .getInfoWebApp();
    } catch (e) {
      console.log("Erro GoogleGetCache");
    }
  };
}

export const Sheet = new GoogleSheet();
