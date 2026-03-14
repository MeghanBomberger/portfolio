import React from 'react'
import './SkillsList.scss'

export default function SkillsList ({skills, title, invert}) {
	return (
		<article className="skills-list">
			<h3>- {title} -</h3>
			<div className="icons-container">
				{skills.map(skill => (
					<div className="icon-container" key={skill.id}>
						<img								
							className="skill-icon"
							alt={skill.skill}
							title={skill.skill}
							src={skill.icon}
							style={{
								filter: `invert(${invert ? 100 : 0}%)`
							}}
						/>
						{ invert && skill.skill}
					</div>
				))}
			</div>
		</article>
	)
}