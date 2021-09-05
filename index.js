require('dotenv').config()
// const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const port = 4000;
const passport = require("passport");
const passportSetup = require("./config/ppconfig");
const isLoggedIn = require('./middleware/isLoggedIn')
const session = require("express-session");
const authRoutes = require("./routes/auth");
// const keys = require("./config/keys");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const { default: axios } = require('axios');

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

app.use(flash())

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

app.get('/', isLoggedIn, (req, res) => {
	res.send({ message: "hello" })
})

app.get('/imageprocessing', (req, res) => {
	const imageURL = req.query.image
	// res.send(imageURL)
	// console.log(imageURL)
	axios.get("http://localhost:5000/image", {
		params: {
			image: imageURL
		}
	}).then(response => res.send(response.data))
})

app.listen(process.env.PORT || 4000, () => { console.log(`Server is running on port ${process.env.PORT || 4000}`) })