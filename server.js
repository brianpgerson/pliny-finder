require('dotenv').config();
const express = require('express'),
	   config = require('./config/main'),
	  twitter = require('./lib/twitter/twitter.service'),
		  app = express();

app.get('/', (req, res) => res.send('I am Pliny! I will help you find my tasty beer!'));

app.listen(3000, () => console.log(`Example app listening on port ${config.port}!`));

// let barStream = twitter.streamForPlinyBars();
// let plinyFinder = twitter.streamForPlinyFinder();
let plinyStream = twitter.streamForBarMentions();

// barStream.on('tweet', tweetAboutBarMatchesPlinyMention);
// plinyFinder.on('tweet', tweetAboutPlinyMatchesBarName);
plinyStream.on('tweet', tweetAboutPlinyMatchesBarName);

function tweetAboutPlinyMatchesBarName (tweet) {
	let txt = tweet.text;
	console.log('hmm, we have a tweet about a bar', tweet.text)
	if (twitter.isLikelyViaBarMention(txt)) {

		//TODO: slack hook
		console.log(`Pliny-related tweet from ${tweet.user.screen_name}: ${txt}`);
	}
}

function tweetAboutBarMatchesPlinyMention (tweet) {
	let txt = tweet.text;
	if (twitter.isLikelyViaPlinyMention(txt)) {
		//TODO: slack hook
		console.log(`Pliny-related tweet from ${tweet.user.screen_name}: ${txt}`);
	}
}