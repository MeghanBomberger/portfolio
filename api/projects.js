const Airtable = require('airtable')

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN })
  .base(process.env.AIRTABLE_BASE)

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://meghanbomberger.dev')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ success: false })

  try {
    const records = await base('projects').select({ view: "Grid view" }).all()

    const projects = records.map(record => {
      const skills = record.fields.skill_ids.map((skill, i) => ({
        skill_id: skill,
        skill_name: record.fields.skill_names[i],
        skill_category: record.fields.skill_categories[i],
        skill_icon: record.fields.skill_icons[i].thumbnails.full.url
      }))

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

    res.json({ success: true, projects })
  } catch (err) {
    console.error(err)
    res.json({ success: false })
  }
}
