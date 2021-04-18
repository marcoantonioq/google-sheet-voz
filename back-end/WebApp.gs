function pushValueWebApp(value = [109377, "Sl TI", "Observações: Teste realizado TI"]) {
  let data = {msg: "", status: false}
  try {
    console.log("vamos salvar:", value)  
    let sheet = SpreadsheetApp.getActive().getSheetByName('Atualizar')
    sheet.insertRowBefore(3)
    sheet.getRange('A3').setValue(value[0]); // Set NPAR
    sheet.getRange('B3').setValue('=IFNA(INDEX(\'Banco de dados\'!$A:$AC;MATCH($A3;\'Banco de dados\'!$A:$A;0);3);"")');
    sheet.getRange('C3').setValue('=IFNA(INDEX(\'Banco de dados\'!$A:$AC;MATCH($A3;\'Banco de dados\'!$A:$A;0);4);"")')
    sheet.getRange('F3').setValue(value[1]); // Set NPAR
    sheet.getRange('I3').setValue(value[2]); // Set Obs
    sheet.getRange('L3').setValue('=MATCH(A3;\'Banco de dados\'!A:A;0)');
    
    setAutoLine(sheet, 3)
    
    data.msg = `${value[0]} salvo com sucesso!`
    data.status = true
    
  } catch (e) {
    data.msg = e
    data.status = false
  }
  return data;
}


function getInfoWebApp(npat) {
  let data = {msg: "", status: false, values: []}
  try {
    console.log("vamos pegar informação de :", npat)
    
    let sheet = SpreadsheetApp.getActive().getSheetByName('Banco de dados')
    let range = sheet.getRange("A:Q")
    
    if(npat){      
      data.values = range.getValues().find(el => el[0] == npat)
    } else {
      data.values = range.getValues().map(v=>[
        v[0], v[2], v[3], v[8], v[9], v[10]
      ])
      return JSON.stringify(data.values)
    }
    
    data.status = true
    console.log(data.values)
    
  } catch (e) {
    data.msg = e
    data.status = false
  }
  return data;
}
