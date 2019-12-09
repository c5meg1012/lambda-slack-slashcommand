const request = require('request');

exports.handler = function(event, context) {

  // 本文の成形
  var message = '@channel:' + "\n";
  message += '*' + 'もう19時になっちゃったじゃない:lips:' + '*' + "\n";
  message += '*' + '残業はモテないし早く仕事終わらせて飲みましょーよ:hearts:' + '*';

  // WebHookのURLをここに入れます
  var slackWebhookUrl = 'https://hooks.slack.com/services/......';

  // リクエスト設定
  const options = {
    url: slackWebhookUrl,
    headers: {
      'Content-type': 'application/json'
    },
    body: {
      "text": message
    },
    json: true
  };

  // メッセージ送信
  request.post(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      context.done(null, body);
    } else {
      console.log('error: ' + response.statusCode);
      context.done(null, 'error');
    }
  });
}
