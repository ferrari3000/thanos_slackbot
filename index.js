const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-436996219559-575477629911-yz8T2FCbwKPBMA3kaajkBce8', 
    name: 'thanos_bot'
});

// Message Handler
var message;
var channel;
var channelId;
var channelName;

try {

bot.on('message', (data) => {
    if(data.type != 'message') {
        return;
    }

    var channelInfo;
    channelInfo = axios.get('https://slack.com/api/channels.info?token=xoxb-436996219559-575477629911-SbXrnlENWM3y3vamvqYV6AgA&channel='+data.channel+'&pretty=0').then(res=>{
    channelId = res.data.channel.id;
    channelName = res.data.channel.name;
    
    channel = data.channel

    if(channelId == channel) {
        channel = channelName;
    }
    else {
        channel = 'test';
    }

    message = data.text;

    axios.post('https://login.salesforce.com/services/oauth2/token?[redacted]').then(res=> {
    const bearer = res.data.access_token;

    console.log(data);
// Get quote

if(message != null && message.includes(' InfinityWar')) {

    var request = require("request");

        var options = { method: 'POST',
        url: 'https://tfoor-dev-ed.my.salesforce.com/services/apexrest/ThanosQuote/',
        headers: 
        { 'Postman-Token': 'd4a91c9a-c579-40f6-be53-fab241a654bf',
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ bearer },
        body: { quotes: [ { message: 'InfinityWar' } ] },
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
catch {
    bot.on('error', (err) => console.log(err));
}
