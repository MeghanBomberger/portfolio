import React from 'react'
import './Skills.scss'
import SkillsList from './SkillsList'

export default function Skills ({skills}) {
	return (
		<section className="section skills">
			<h2>Skills</h2>
			<SkillsList
				title="Languages"
				skills={skills.filter(skill => skill.category === "language")}
			/>
			<SkillsList
				title="Libraries and Frameworks"
				skills={skills.filter(skill => skill.category === "library or framework")}
			/>
			<SkillsList
				title="Tools and Platforms"
				skills={skills.filter(skill => skill.category === "tools and platforms")}
			/>
			<SkillsList
				title="Software"
				skills={skills.filter(skill => skill.category === "software")}
			/>
			<SkillsList
				title="eCommerce Platforms"
				skills={skills.filter(skill => skill.category === "eCommerce platform")}
			/>
			<SkillsList
				title="Additional Skills"
				skills={skills.filter(skill => skill.category === "other")}
				invert
			/>
		</section>
	)
}
