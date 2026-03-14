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
    const records = await base('skills').select({ view: "Grid view" }).all()

    const skills = records.map(record => ({
      id: record.id,
      skill: record.fields.skill,
      icon: record.fields.icon[0].thumbnails.full.url,
      category: record.fields.category
    }))

    res.json({ success: true, skills })
  } catch (err) {
    console.error(err)
    res.json({ success: false })
  }
}
