const express = require('express')
const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE)

const projectsRouter = express.Router()

projectsRouter.get('/', async (req, res, next) => {
  try {
    await base('projects').select({
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      const projects = records.map(record => {
        const skills = record.fields.skill_ids.map((skill, i) => {
          return {
            skill_id: skill,
            skill_name: record.fields.skill_names[i],
            skill_category: record.fields.skill_categories[i],
            skill_icon: record.fields.skill_icons[i].thumbnails.full.url
          }
        })

        return {
          id: record.id,
          project_name: record.fields.project_name,
          skills: skills,
          desktop_img: record.fields.desktop_img[0].thumbnails.full.url,
          mobile_img: record.fields.mobile_img[0].thumbnails.full.url,
          description: record.fields.description,
          url: record.fields.url,
          repo: record.fields.repo,
          contributor: record.fields.contributor
        }
      })

      res.send({
        success: true,
        projects: projects
      })
      next()
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

module.exports = projectsRouter
