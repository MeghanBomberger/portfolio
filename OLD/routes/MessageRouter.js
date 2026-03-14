const express = require('express')
const Airtable = require('airtable')
const projectsRouter = require('./ProjectsRouter')
const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE)

const messageRouter = express.Router()

messageRouter.post('/', async (req, res, next) => {
	try {
		await base("messages").create([
			{
				"fields": {
					"name": req.body.name,
					"email": req.body.email,
					"phone": req.body.phone,
					"message": req.body.message
				}
			}
		])

		res.send({
			success: true
		})
	} catch (err) {
		if (err) {
			console.error(err)
		}
		res.send({
			success: false
		})
	}	
})

module.exports = messageRouter
