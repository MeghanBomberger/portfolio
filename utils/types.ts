export interface Skill {
  id: string,
  skill: string,
  icon: string,
  category: string
}

export interface Project {
  id: number,
  url: string,
  desktop_img: string,
  mobile_img: string,
  project_name: string,
  description: string,
  contributor: boolean,
  skills: {
    skill_id: number,
    skill_name: string,
    skill_icon: string
  }[],
  repo: string
  wake_up: boolean
}

export interface AirtableAttachment {
  thumbnails: {
    full: { url: string }
  }
}

export interface AirtableProjectFields {
  project_name: string
  skill_ids: string[]
  skill_names: string[]
  skill_categories: string[]
  skill_icons: AirtableAttachment[]
  desktop_img: AirtableAttachment[]
  mobile_img: AirtableAttachment[]
  description: string
  url: string
  repo: string
  contributor: boolean
  wake_up: boolean
}

export interface AirtableSkillFields {
  skill: string
  icon: AirtableAttachment[]
  category: string
}
