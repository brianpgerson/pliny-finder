const Twit = require('twit'),
	  bars = require('./bars.constants'),
		 _ = require('lodash'),
	config = require('../../config/main');

function plinyFindy () { 
	return new Twit({
		consumer_key: config.twitter_consumer_key, 
		consumer_secret: config.twitter_consumer_secret, 
		access_token: config.twitter_access_token,
		access_token_secret: config.twitter_access_token_secret
	});
}

function isMatch (tweet, keywords) {
	tweet = _.lowerCase(tweet);
	return _.some(keywords, keyword => tweet.match(keyword));
}

module.exports = {
	isLikelyViaPlinyMention: (tweet) => {
		let keywords = [/pliny/, /pliney/, /younger/, /pliny the younger/, /russian river/];
		return isMatch(tweet, keywords);
	},

	isLikelyViaBarMention: (tweet) => {
		let keywords = bars.regex;
		return isMatch(tweet, keywords);
	},

	streamForPlinyFinder: () => {
		let query = {follow: 4923837018}
		return plinyFindy().stream('statuses/filter', query);
	},

	streamForPlinyMentions: () => {
		let query = {track: 'pliny'};
		return plinyFindy().stream('statuses/filter', query);
	},

	streamForPlinyBars: () => {
		let query = {follow: bars.twitterIds}
		return plinyFindy().stream('statuses/filter', query);
	}
}


