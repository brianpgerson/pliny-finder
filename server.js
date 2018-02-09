require('dotenv').config();
const express = require('express'),
	   config = require('./config/main'),
	  twitter = require('./lib/twitter/twitter.service'),
	  twilio = require('./lib/twilio/twilio.service'),
		  app = express();

app.get('/', (req, res) => res.send('I am Pliny! I will help you find my tasty beer!'));

app.listen(3000, () => console.log(`Example app listening on port ${config.port}!`));

twilio.test();

// stream of bars that serve pliny in SF
let barStream = twitter.streamForPlinyBars();

// stream of tweets by a specific dude who does something useful
let plinyFinder = twitter.streamForPlinyFinder();

// stream of tweets mentioning pliny
let plinyStream = twitter.streamForPlinyMentions();

barStream.on('tweet', tweetFromBarMatchesPlinyMention);
plinyFinder.on('tweet', tweetAboutPlinyMatchesBarName);
plinyStream.on('tweet', tweetAboutPlinyMatchesBarName);

function tweetAboutPlinyMatchesBarName (tweet) {
	let txt = tweet.text;
	console.log(`tweet about pliny the younger: ${txt}`)
	if (twitter.isLikelyViaBarMention(txt)) {
		let msg = `Pliny-related tweet from ${tweet.user.screen_name}: ${txt}`;
		twilio.notify(msg);
		console.log(msg);
	}
}

function tweetFromBarMatchesPlinyMention (tweet) {
	let txt = tweet.text;
	if (twitter.isLikelyViaPlinyMention(txt)) {
		let msg = `Pliny-related tweet from ${tweet.user.screen_name}: ${txt}`;
		twilio.notify(msg);
		console.log(msg);
	}
}