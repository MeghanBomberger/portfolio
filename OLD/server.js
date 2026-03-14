require('dotenv').config()

const cors = require('cors')
const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')

const messageRouter = require('./routes/MessageRouter')
const projectsRouter = require('./routes/ProjectsRouter')
const skillsRouter = require('./routes/SkillsRouter')

const server = express()

const whitelist = [
	'localhost:3000',
	'localhost:4000',
	'localhost:8080',
	'meghan-bomberger-portfolio.herokuapp.com',
	'meghanbomberger.dev',
	'www.meghanbomberger.dev',
	process.env.AIRTABLE_API_ENDPOINT
]

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin) {
			callback(null, true)
			return
		}
		const host = new URL(origin).host
		console.log("** Origin of request " + host)
		if (whitelist.indexOf(host) !== -1) {
			console.log("Origin acceptable")
			callback(null, true)
		} else {
			console.log("Origin rejected")
			callback(new Error('Not allowed by CORS - ' + host))
		}
	}
}

server.use(express.json())
server.use(cors(corsOptions))
server.use(serveStatic(__dirname + '/client/build'))

server.get("/api", (req, res) => {
	res.send({ message: "Hello World!" })
})

server.use('/api/messages', messageRouter)
server.use('/api/projects', projectsRouter)
server.use('/api/skills', skillsRouter)

server.use((err, req, res, next) => {
	if (err) {
		console.error(err)
		if (err.name === 'UnauthorizedError') {
			res.status(err.status)
		}
		return res.send({
			message: err.message
		})
	}
})

if (process.env.NODE_ENV === 'production') {
	server.use(express.static(path.join(__dirname, 'client/build')))
	server.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	});
}

server.listen(
	process.env.PORT || 4000,
	() => console.log(`Server listening on port ${process.env.PORT || 4000}`)
)
