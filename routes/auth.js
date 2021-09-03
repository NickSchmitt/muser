const express = require('express')
const passport = require('../config/ppConfig')
const db = require('../models')
const router = express.Router()
const CLIENT_URL = "http://localhost:3000"

router.get('/login/success', (req, res) => {
	console.log(req.user)
	if (req.user) {
		res.json({
			success: true,
			message: "User Authenticated",
			user: req.user,
			cookies: req.cookies
		})
	} else {
		res.status(400).json({
			message: "Authentication failed",
			user: null
		})
	}
})

router.get('/login/failed', (req, res) => {
	res.status(401).json({
		success: false,
		message: "Authentication failed"
	})
})

router.get('/spotify', passport.authenticate('spotify'))

// router.get('/spotify', (passport.authenticate('spotify', {
// 	scope: ['streaming', 'user-read-private', 'user-top-read', 'user-read-recently-played', 'user-follow-read']
// })))

router.get(
	'/spotify/callback',
	passport.authenticate('spotify', {
		successRedirect: CLIENT_URL,
		failureRedirect: "auth/login/failed",
	})
)

module.exports = router
