import React from 'react'
import './ProjectCard.scss'
import githubIcon from '../../assets/github.svg'

export default function ProjectCard ({project}) {
	return (
		<article className="project-card">
			<a href={project.url}>
				<div className="project-example">
					<div className="project-examples">
						<div className="desktop-example">
							<div className="desktop-screen" style={{ backgroundImage: `url(${project.desktop_img})` }} />
							<div className="desktop-screen-stand" />
							<div className="desktop-screen-base" />
						</div>
						<div className="mobile-example">
							<div className="phone-camera" />
							<div className="phone-screen" style={{ backgroundImage: `url(${project.mobile_img})` }} />
							<div className="phone-button" />
						</div>
					</div>
				</div>
			</a>
			<div className="project-info">
				<a href={project.url}>
					<h3>{project.project_name}</h3>
				</a>
				<p className="project-description">{project.description}</p>
				<div className="skills-used">
					{project.skills.map(skill => (
						<img
							key={skill.skill_id}
							className="project-skill"
							src={skill.skill_icon}
							alt={skill.skill_name}
							title={skill.skill_name}
						/>
					))}
				</div>
				<p className="project-repo">Checkout out the repo</p>
				<a href={project.repo}>
					<img
						alt="github-repo"
						className="git-hub-icon"
						src={githubIcon}
						title="GitHub repo"
					/>
				</a>
			</div>

		</article>
	)
}