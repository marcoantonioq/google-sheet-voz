
/**
Função criar um ContentOutPut
* @param {object} e Request params
* @returns {object} TextOutputs
*/
function createTextOutput(strjson) {
  return ContentService
      .createTextOutput(strjson)
}

function doGet(e) {
  
  const services = {
    info: (e) => {
      console.log(e.parameter.action)
      var myJSON = JSON.stringify({
        params: getInfoWebApp() 
      })
      return createTextOutput(myJSON)
        .setMimeType(ContentService.MimeType.JSON)
    },
      teste: e => {
        console.log(request);
        return ContentService.crateTextOutput(JSON.stringify(request));
      },
  }
  
  try {
    return services[e.parameter.action](e)
  }catch(err){
//    return services.info(e)
    var template = HtmlService.createTemplateFromFile('WebApp');
    var pageData = template.evaluate()
    .setTitle('Atualizar inventário')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    return pageData;
  }
}