require('dotenv').config()
const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const port = 4000;
const passport = require("passport");
const passportSetup = require("./config/ppconfig");
const session = require("express-session");
const authRoutes = require("./routes/auth");
// const keys = require("./config/keys");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
	session({
		secret: "anything",
		resave: true,
		saveUninitialized: true
		// name: "session",
		// keys: "examplecookie",
		// maxAge: 60 * 60 * 1000 // 1 hour
	})
)

app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true
	})
)

app.use('/auth', authRoutes)

const authCheck = (req, res, next) => {
	if (!req.user) {
		res.status(401).json({
			authenticated: false,
			message: "user has not been authenticated"
		})
	} else {
		next()
	}
}

app.get('/', authCheck, (req, res) => {
	res.status(200).json({
		authenticated: true,
		message: "Authentication successful",
		user: req.user,
		cookies: req.cookies
	})
})

app.listen(process.env.PORT || 4000, () => { console.log(`Server is running on port ${process.env.PORT || 4000}`) })

// const server = app.listen(process.env.PORT || 4000, () =>
// 	console.log(
// 		`🎧You're listening to the smooth sounds of port ${process.env.PORT || 4000
// 		}🎧`
// 	)
// )

// module.exports = server