require('dotenv').config()
const express = require('express')
const layouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const isLoggedIn = require('./middleware/isLoggedIn')
const app = express()
const flash = require('connect-flash')
const axios = require('axios')
const db = require('./models')
const chalk = require('chalk')
const methodOverride = require('method-override')
const cors = require('cors')

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.use(layouts)
app.use(methodOverride('_method'))



app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
)

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use(
	cors({
		origin: "http://localhost:3000", // allow to server to accept request from different origin
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true // allow session cookie from browser to pass through
	})
);


app.use((req, res, next) => {
	// before every route, attach the flash messages and current user to res.locals
	// res.locals.alerts = req.flash()
	res.locals.currentUser = req.user
	next()
})

app.use('/auth', require('./routes/auth'))

const authCheck = (req, res, next) => {
	next()
}

app.get('/', authCheck, (req, res) => {
	res.status(200)
})



//--------checks if user is signed in and grabs all comments from comment database 


app.get('/profile', isLoggedIn, async (req, res) => {

	const comments = await db.comment.findAll({
		where: {
			userId: req.user.id
		}
	})
	console.log(comments)
	res.render('profile', {
		comments,
		user: req.user
	})
})



//--------

app.get('/results', (req, res) => {
	const queryString = {
		params: {
			q: req.query.track,
			type: req.query.type,
			limit: req.query.limit,
		},
	}
	axios
		.get(
			`https://api.spotify.com/v1/search?q=${queryString.params.q}&type=${queryString.params.type}&limit=${queryString.params.limit}`, {
			headers: {
				Authorization: `Bearer ${req.user.access}`,
			},
		}
		)
		.then(function (response) {
			res.render('results', {
				data: response.data,
				params: queryString.params,
			})
		})
		.catch((error) => {
			console.log(error)
		})
})



//--------


app.get('/tracks/:id', function (req, res) {
	const queryString = {
		params: {
			id: req.params.id,
		},
	}

	axios
		.get(`https://api.spotify.com/v1/tracks/${queryString.params.id}`, {
			headers: {
				Authorization: `Bearer ${req.user.access}`,
			},
		})
		.then(function (spotifyResponse) {
			db.comment
				.findAll({
					where: { trackId: spotifyResponse.data.id },
					include: [db.user],
				})
				.then((allComments) => {
					// res.send(allComments)
					res.render('track', {
						comments: allComments,
						track: spotifyResponse.data,
					})
				})
				.catch((error) => {
					console.log(error)
				})
		})
})



//--------



app.get('/artists/:id', function (req, res) {
	const queryString = {
		params: {
			id: req.params.id,
		},
	}

	axios
		.get(`https://api.spotify.com/v1/artists/${queryString.params.id}`, {
			headers: {
				Authorization: `Bearer ${req.user.access}`,
			},
		})
		.then(function (artistResponse) {
			axios
				.get(
					`https://api.spotify.com/v1/artists/${queryString.params.id}/top-tracks?country=US`, {
					headers: {
						Authorization: `Bearer ${req.user.access}`,
					},
				}
				)
				.then(function (topTracksResponse) {
					res.render('artist', {
						artist: artistResponse.data,
						tracks: topTracksResponse.data.tracks,
					})
				})
			// db.comment
			//   .findAll({ where: { trackId: spotifyResponse.data.id } })
			//   .then((allComments) => {
			//     res.render('track', {
			//       comments: allComments,
			//       track: spotifyResponse.data,
			//     })
			//   })
		})
})


//-------- add usnique user to comment

app.post('/track', (req, res) => {
	db.user
		.findOne({ where: { spotifyId: req.user.spotifyId } })
		.then(function (user) {
			user
				.createComment({
					text: req.body.text,
					userId: req.user.id,
					trackId: req.body.spotifyId,
				})
				.then(function (comment) {
					user.addComment(comment)
					res.redirect('back')
				})
		})
})



// *** EDIT COMMENT
app.get('/edit/:id', (req, res) => {
	const id = req.params.id
	console.log(chalk.red(id))
	db.comment
		.findOne({
			where: { id: id },
		})
		.then((comment) => {
			res.render('editcomment', {
				comment: comment,
			})
		})
})



app.put('/comments/:id', (req, res) => {
	const id = req.body.commentId

	db.comment
		.update({ text: req.body.text }, {
			where: { id: id },
		})
		.then((comment) => {
			res.redirect('/')
		})
})




// *** DELETE COMMENT
app.delete('/comment/:id', (req, res) => {
	const id = req.params.id
	db.comment
		.destroy({
			where: { id: id },
		})
		.then((deletedComment) => {
			res.redirect('back')
		})
})

//-------- renders about page 

app.get('/about', isLoggedIn, function (req, res) {
	res.render('about')
})


//-------- logs  user out 

app.get('/logout', function (req, res) {
	req.logout()
	res.redirect('/')
})





var server = app.listen(process.env.PORT || 4000, () =>
	console.log(
		`🎧You're listening to the smooth sounds of port ${process.env.PORT || 4000
		}🎧`
	)
)

module.exports = server