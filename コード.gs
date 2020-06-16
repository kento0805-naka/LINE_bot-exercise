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
  
  function todayMenu(day) {
    message += '${day}のトレーニングメニュー\n\n'.replace('${day}', day[0]);
    message += '・${menu1}\n'.replace('${menu1}', day[1]);
    message += '・${menu2}\n'.replace('${menu2}', day[2]);
    message += '・${menu3}\n\n'.replace('${menu3}', day[3]);
    message += '頑張りましょう!';
  }
  
  
  
  switch (day) {
    case 1:
    todayMenu(mondayMenu);
    break;
    case 2:
    todayMenu(tuesdayMenu);
    break;
    case 3:
    todayMenu(wednesdayMenu);
    break;
    case 4:
    todayMenu(thursdayMenu);
    break;
    case 5:
    todayMenu(fridayMenu);
    break;
    case 6:
    todayMenu(saturdayMenu);
    break;
    case 0:
    todayMenu(sundayMenu);
    break;
  }
  


  //以下LINEに通知するコード
  LINE_API(message);

}

function confirmMessage() {
  
  var message = 'トレーニングを実施しましたか？\n\n';
  
  message += 'まだトレーニングをしていなかったら、';
  message += '今から頑張りましょう！!';
  
  
  //以下LINEに通知するコード
  LINE_API(message);

}

function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  reply(json);
}


function LINE_API(msg) {
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
      'text': msg
    }],
      
  };
  
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(data)
  };
  
  UrlFetchApp.fetch(url, options);

}

  function reply(data) {
    const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('LINE_TOKEN');
    var USER_ID = PropertiesService.getScriptProperties().getProperty('USER_ID'); 
    
    var url = 'https://api.line.me/v2/bot/message/reply';
    var headers = {
      "Content-Type" : "application/json; charset=UTF-8",
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    };
    
    var postData = {
      'replyToken': data.events[0].replyToken,
      'messages': [{
        'type': 'text',
        'text': data.events[0].message.text
      }]
    };
    
    var options = {
      'method': 'post',
      'headers': headers,
      'payload': JSON.stringify(postData)    
    };
    
    UrlFetchApp.fetch(url, options);
  
  }
