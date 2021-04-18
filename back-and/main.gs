/**
* @OnlyCurrentDoc
*/

function onOpen() {
	SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
	.createMenu('Menu')
	.addItem('Voz', 'showSidebar')
	.addToUi();
}
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
		}
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


const onEvents = {
	// Eventos disparados na aplicação ao editar o documento
	'getInfo': function(event){
		
		let range = event.range
		var source = event.source
		
		return {
			col: range.getColumn(),
			oldValue: event.oldValue,
			range: range,
			row: range.getRow(),
			sheetName: source.getSheetName(),
			source: source,
			value: event.value
		}
	},
	'Histórico': function(tabela, linha, coluna, anterior, novo){
		// Histórico de altereção do Bando de Dados
		if(anterior){
			
			var historico = SpreadsheetApp.getActive().getSheetByName('Histórico')
			
			var values = [ 
				new Date().toLocaleString('pt-BR'), 
				getUserEmail(), 
				tabela,
				linha, 
				coluna, 
				anterior,
				novo
			]
			
			historico.appendRow(values)
			
		}
	},
	'Banco de dados': function(event){
		//Alterações banco de dados    
		
		let {col, oldValue, range, row, sheetName, source, value} = this['getInfo'](event)
		
		let user = getUserEmail()
		const colID = source.getActiveSheet().getRange(1, col).getValue()
		const rowID = source.getActiveSheet().getRange(row, 1).getValue()
		
		range.setNote('Ultima edição por ' + user + ': ' + new Date().toLocaleString('pt-BR'));
		
		onEvents['Histórico'](sheetName, rowID, colID, oldValue, value)
		
	},
	'Atualizar': function(event){
		//  TAB Atualizar A2 
		let {source, row, col, sheetName, range} = this['getInfo'](event)
		let user = getUserEmail()
		var ss = SpreadsheetApp.getActive();
		var sheet = ss.getSheetByName('Atualizar');
		const date = new Date().toLocaleString('pt-BR');
		
		
		if(col === 1) {
			//SpreadsheetApp.getUi().alert("Plinalha atual: " + col );
			
			let value = sheet.getRange(row, col).getValue()
			
			// Atualizar linha 2
			//      setAtualizarA2(value)
			
			// Atualizar data de criação
			if(row>1)
			sheet.getRange(row, 10).setValue(date);
		}
		// Atualizar data de atualização
		if(row>1)
		sheet.getRange(row, 11).setValue(date);
		
		// Adicionar primeira linha
		setAutoLine(sheet, 2)
		range.setNote('Ultima edição por ' + user + ': ' + new Date().toLocaleString('pt-BR'));
	}
}

function getUserEmail(){
	//  Logger.log(Session.getActiveUser().getEmail())
	return Session.getEffectiveUser().getEmail();
	
}

function onEdit(event){  
	
	//SpreadsheetApp.getUi().alert("Plinalha atual: " + event.namedValues )
	
	var ss = SpreadsheetApp.getActive();
	
	try {
		
		let {source, row, col, sheetName, range} = onEvents['getInfo'](event)
		
		onEvents[sheetName](event) 
		
	} catch(error) {
		Logger.log(`Evento não econtrado: ${error} `)
	}
	
}
