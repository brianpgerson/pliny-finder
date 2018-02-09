module.exports = {
	port: process.env.PORT,
	twitter_consumer_key: process.env.TWITTER_API_KEY,
	twitter_consumer_secret: process.env.TWITTER_SECRET,
	twitter_access_token: process.env.TWITTER_ACCESS_TOKEN,
	twitter_access_token_secret: process.env.TWITTER_ACCESS_SECRET,
	twilio: {
		accountSid: process.env.ACCOUNT_SID,
		authToken: process.env.AUTH_TOKEN,
		fromNumber: process.env.FROM_NUMBER
	}
		
}