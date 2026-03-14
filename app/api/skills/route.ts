import Airtable from 'airtable'
import { NextResponse } from 'next/server'
import { AirtableSkillFields } from '@utils/types'

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE!)

export async function GET() {
  return new Promise<NextResponse>((resolve) => {
    base('skills').select({ view: 'Grid view' }).eachPage(
      function page(records) {
        const skills = records.map(record => {
          const fields = record.fields as unknown as AirtableSkillFields
          return {
            id: record.id,
            skill: fields.skill,
            icon: fields.icon?.[0]?.thumbnails?.full?.url,
            category: fields.category
          }
        })

        resolve(NextResponse.json({ success: true, skills }))
      },
      function done(err) {
        if (err) {
          console.error(err)
          resolve(NextResponse.json({ success: false }, { status: 500 }))
        }
      }
    )
  })
}
