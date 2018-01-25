const Twit = require('twit'),
	barIds = require('./barIds'),
  barNames = require('./barNames'),
		 _ = require('lodash'),
	config = require('../../config/main');

const plinyFindy = new Twit({
	consumer_key: config.twitter_consumer_key, 
	consumer_secret: config.twitter_consumer_secret, 
	access_token: config.twitter_access_token,
	access_token_secret: config.twitter_access_token_secret
});

const baseQuery = {
	q: '"pliny the younger" san francisco',
	count: 10
}

// if we do a global search, don't return shit we've already seen
let lastId;

function handleCandidate(tweet) {

function isMatch (tweet, keywords) {
	return _.some(keywords, keyword => tweet.match(keyword));
}

module.exports = {
	isLikelyViaPlinyMention: (tweet) => {
		let keywords = [/pliny/, /pliney/, /younger/, /pliny the younger/, /russian river/];
		return isMatch(tweet, keywords);
	},

	isLikelyViaBarMention: (tweet) => {
		let keywords = barNames.regex;
		return isMatch(tweet, keywords);
	},

	streamForPlinyFinder: () => {
		let query = {follow: 4923837018}
		return plinyFindy.stream('search/tweets', query);
	},

	streamForBarMentions: () => {
		let query = {track: barNames.string}
		return plinyFindy.stream('search/tweets', query);
	},

	streamForPlinyBars: () => {
		let query = {follow: barIds}
		return plinyFindy.stream('statuses/filter', query);
	}
}


