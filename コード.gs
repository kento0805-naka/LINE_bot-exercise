function notifyLINE() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var range = sheet.getDataRange();
  var values = range.getValues();
  
  var message = 'おはようございます\n\n';
  
  var mondayMenu = values[0];
  var tuesdayMenu = values[1];
  var wednesdayMenu = values[2];
  var thursdayMenu = values[3];
  var fridayMenu = values[4];
  var saturdayMenu = values[5];
  var sundayMenu = values[6];
  
  var day = new Date().getDay();
  
  message += '${day}のトレーニングメニュー\n\n'.replace('${day}', mondayMenu[0]);
  message += '・${menu1}\n'.replace('${menu1}', mondayMenu[1]);
  message += '・${menu2}\n'.replace('${menu2}', mondayMenu[2]);
  message += '・${menu3}\n\n'.replace('${menu3}', mondayMenu[3]);
  message += '頑張りましょう';
  
  
  
  
  




  //以下LINEに通知するコード
  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('LINE_TOKEN');
  var USER_ID = PropertiesService.getScriptProperties().getProperty('USER_ID'); 
  
  var url = 'https://api.line.me/v2/bot/message/push';
  
  var headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer '+ ACCESS_TOKEN
  };
  
  
  
  var data = {
    to: USER_ID,
    messages: [{
      'type': 'text',
      'text': message
    }],
      
  };
  
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(data)
  };
  
  UrlFetchApp.fetch(url, options);

}
