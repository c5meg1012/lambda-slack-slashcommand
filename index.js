const request = require('request');
const queryString = require('query-string');

exports.handler = function(event, context) {
  const slackWebhookUrl = process.env['SLACK_WEBHOOK_URL'];
  const response = queryString.parse(event.body);
  let message = '';

  if (response.text !== "" ) {
    message += 'Twitterを' + response.text + '投稿返す';
  } else {
    message +='わん！';
  }

  const options = {
    url: slackWebhookUrl,
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: {
      "text": message,
    },
    json: true,
  };

  request.post(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      context.done(null, body);
    } else {
      console.log('error: ' + response.statusCode);
      context.done(null, 'error');
    }
  });
}
