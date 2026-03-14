import Airtable from 'airtable'
import { NextResponse } from 'next/server'
import { AirtableProjectFields } from '@utils/types'

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE!)

export async function GET() {
  return new Promise<NextResponse>((resolve) => {
    base('projects').select({ view: 'Grid view' }).eachPage(
      function page(records) {
        const projects = records.map(record => {
          const fields = record.fields as unknown as AirtableProjectFields
          const skills = fields.skill_ids?.map((skill: string, i: number) => ({
            skill_id: skill,
            skill_name: fields.skill_names?.[i],
            skill_category: fields.skill_categories?.[i],
            skill_icon: fields.skill_icons?.[i]?.thumbnails?.full?.url
          })) ?? []

          return {
            id: record.id,
            project_name: fields.project_name,
            skills,
            desktop_img: fields.desktop_img?.[0]?.thumbnails?.full?.url,
            mobile_img: fields.mobile_img?.[0]?.thumbnails?.full?.url,
            description: fields.description,
            url: fields.url,
            repo: fields.repo,
            contributor: fields.contributor
          }
        })

        resolve(NextResponse.json({ success: true, projects }))
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
