const SlackBot = require('slackbots');
const axios = require('axios');
const server = require('./Server');

const bot = new SlackBot({
    token: '[Redacted]', 
    name: 'thanos_bot'
});

// Message Handler
var message;
var channel;
var channelId;
var channelName;

try {

bot.on('message', (data) => {
    if(data.type != 'message' || data.text == null || data.subtype == 'bot_message') {
        return;
    }

    bot.on('error', (err) => console.log(err));

    var channelInfo;
    channelInfo = axios.get('https://slack.com/api/channels.info?token=[Redacted]&channel='+data.channel+'&pretty=0').then(res=>{
    channelId = res.data.channel.id;
    channelName = res.data.channel.name;
    channel = data.channel
    console.log(channel);

    if(channelId == channel) {
        channel = channelName;
    }
    else {
        channel = 'test';
    }

    message = data.text;

    axios.post('[Redacted]').then(res=> {
    const bearer = res.data.access_token;

    console.log(data);
// Get quote

if(message.includes(' InfinityWar') || message.includes(' Whatever it takes'))
{
    var request = require("request");

        var options = { method: 'POST',
        url: 'https://tfoor-dev-ed.my.salesforce.com/services/apexrest/ThanosQuote/',
        headers: 
        { 'Postman-Token': '[Redacted]',
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ bearer },
        body: { quotes: [ { message: message } ] },
        json: true };

            request(options, function (error, response, body) {
            if (error) throw new Error(error);
                
                
                bot.postMessageToChannel(`${channel}`,`${body}`);

            });

        } 
    });
  }) 
});
}
catch (e) {
    console.log(channelInfo);
    console.log();
}
