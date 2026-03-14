import Airtable from 'airtable'
import { NextRequest, NextResponse } from 'next/server'

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE!)

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json()

  return base("messages").create([
    {
      fields: { name, email, phone, message }
    }
  ])
    .then(() => NextResponse.json({ success: true }))
    .catch(err => {
      console.error(err)
      return NextResponse.json({ success: false }, { status: 500 })
    })
}
