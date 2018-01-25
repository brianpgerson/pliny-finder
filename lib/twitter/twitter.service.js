const Twit = require('twit'),
	barIds = require('./barIds'),
		 _ = require('lodash'),
	config = require('../../config/main');

const plinyFindy = new Twit({
	consumer_key: config.twitter_consumer_key, 
	consumer_secret: config.twitter_consumer_secret, 
	access_token: config.twitter_access_token,
	access_token_secret: config.twitter_access_token_secret
});

const baseQuery = {
	q: 'pliny the younger',
	count: 10
}

// if we do a global search, don't return shit we've already seen
let lastId;

function handleTweets(tweets) {
	if (!_.isEmpty(tweets)) {
		lastId = tweets[0].id_str;
		_.forEach(tweets, tweet => {
			// do something? 
		})
	}
}

module.exports = {
	isLikelyTweet: (tweet) => {
		let keyWords = [/pliny/, /pliney/, /younger/, /pliny the younger/, /russian river/];
		return _.some(keyWords, keyWord => tweet.match(keyWord));
	},

	searchForPliny: () => {
		let query = _.assign(baseQuery, {since_id: lastId});
		plinyFindy.get('search/tweets', query).then(res => handleTweets(res.data));
	},

	streamForPlinyBars: () => {
		let query = {follow: barIds}
		return plinyFindy.stream('statuses/filter', query);
	}
}


