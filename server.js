require('dotenv').config();
const express = require('express'),
	   config = require('./config/main'),
	  twitter = require('./lib/twitter/twitter.service'),
		  app = express();

app.get('/', (req, res) => res.send('I am Pliny! I will help you find my tasty beer!'));

app.listen(3000, () => console.log(`Example app listening on port ${config.port}!`));

let stream = twitter.streamForPlinyBars();

stream.on('tweet', (tweet) => {
	let txt = tweet.text;
	if (twitter.isLikelyTweet(txt)) {
		console.log(`Pliny-related tweet from ${tweet.user.screen_name}: ${txt}`);
	}
});