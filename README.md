# google-sheet-voz

Sistema em GoogleScript+VueJS para auxiliar no inventário anual do IFG-Campus Cidade de Goiás. 

Compatibilidade com leitor código de barra e voz.

# Back-end

```js
// Google Sheet
function doGet(e) {
  ...
    var template = HtmlService.createTemplateFromFile('WebApp');
    var pageData = template.evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    return pageData;
  
```
[Leia mais ...](https://github.com/marcoantonioq/google-sheet-voz/blob/main/back-end/WebApp.gs)

# PrintSC
<p align="center" width="100%">
    <img src="https://raw.githubusercontent.com/marcoantonioq/google-sheet-voz/main/demo/print.png"> 
</p>

### [Link de demonstração](https://marcoantonioq.000webhostapp.com/)