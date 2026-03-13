const express = require('express')
const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE)

const skillsRouter = express.Router()

skillsRouter.get('/', async (req, res, next) => {
	try {
		await base('skills').select({
			view: "Grid view"
		}).eachPage(function page(records, fetchNextPage) {
			const skills = records.map(record => {
				return {
					id: record.id,
					skill: record.fields.skill,
					icon: record.fields.icon[0].thumbnails.full.url,
					category: record.fields.category
				}
			})

			res.send({
				success: true,
				skills: skills
			})
		}, function done(err) {
			if (err) {
				console.error(err)
				return
			}
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

module.exports = skillsRouter
