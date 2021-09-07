const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const db = require('../models')

passport.serializeUser((user, cb) => {
	cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
	db.user
		.findByPk(id)
		.then((user) => {
			cb(null, user)
		})
		.catch(cb)
})

passport.use(
	new SpotifyStrategy({
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		callbackURL: process.env.ROOT + "/auth/spotify/callback",
	},
		function (accessToken, refreshToken, expires_in, profile, done) {
			db.user
				.findOrCreate({
					where: {
						spotifyId: profile.id,
					},
				})
				.then(function ([user, created]) {
					user.name = profile.displayName
					if (profile.photos.length > 0) {
						user.profilePic = profile.photos[0]
					} else {
						user.profilePic = ''
					}
					user.access = accessToken
					user.refresh = refreshToken
					user.save().then(function () {
						return done(null, user)
					})
				})
		}
	)
)

module.exports = passport