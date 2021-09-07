require('dotenv').config()
const express = require("express");
const app = express();
const port = 4000;
const passport = require("passport");
const passportSetup = require("./config/ppconfig");
const isLoggedIn = require('./middleware/isLoggedIn')
const session = require("express-session");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const flash = require('connect-flash');
const { default: axios } = require('axios');

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
		origin: process.env.CLIENT_URL,
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
	axios.get("http://localhost:5000/image", {
		params: {
			image: imageURL
		}
	}).then(FlaskResponse => res.send(FlaskResponse.data))
})

app.listen(process.env.PORT || 4000, () => { console.log(`Server is running on port ${process.env.PORT || 4000}`) })
