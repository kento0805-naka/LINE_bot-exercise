function notifyLINE() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var range = sheet.getDataRange();
  var values = range.getValues();
  console.log(values);
  
  




  //以下LINEに通知するコード
  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('LINE_TOKEN');
  var USER_ID = PropertiesService.getScriptProperties().getProperty('USER_ID'); 
  
  var url = 'https://api.line.me/v2/bot/message/push';
  
  var headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer '+ ACCESS_TOKEN
  };
  
  var message = 'テスト';
  
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
