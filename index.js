const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-436996219559-575477629911-SbXrnlENWM3y3vamvqYV6AgA', 
    name: 'thanos_bot'
});

bot.on('error', (err) => console.log(err));

// Message Handler
var message;
var channel;
var channelId;
var channelName;

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

    axios.post('https://login.salesforce.com/services/oauth2/token?client_id=3MVG9mclR62wycM0psa1K2qBWarzOi6zd3bjQg9WCm2bheEl1X13k6fvpFFv2Uta5HGekeiLWbVCcK8.ZM6fb&client_secret=4A8DDB698FB7FAD50E6D67C1E7E1CE530A8A5162FC359E97D4FAFE72C145931E&grant_type=password&username=trent@netjets.com&password=TAndrew*21wrJYQW9PqPnVN4W8vySOd9Kya').then(res=> {
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
