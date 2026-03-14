const Airtable = require('airtable')

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN })
  .base(process.env.AIRTABLE_BASE)

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://meghanbomberger.dev')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ success: false })

  try {
    await base("messages").create([{
      "fields": {
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "message": req.body.message
      }
    }])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.json({ success: false })
  }
}
