import Image from 'next/image'

import '@styles/skills-list.scss';
import { Skill } from "@/utils/types"

interface SkillsListProps {
  skills: Skill[];
  title: string;
  invert?: boolean;
}

export default function SkillsList({ skills, title, invert }: SkillsListProps) {
  return (
    <article className="skills-list" style={{ width: '100%'}}>
      <h3>- {title} -</h3>
      <div className="icons-container">
        {skills.map(skill => (
          <div className="icon-container" key={skill.id}>
            <div style={{ filter: `invert(${invert ? 100 : 0}%)` }}>
              <Image
                className="skill-icon"
                alt={skill.skill}
                title={skill.skill}
                src={skill.icon}
                width={50}
                height={50}
              />
            </div>
            {invert && skill.skill}
          </div>
        ))}
      </div>
    </article>
  )
}
