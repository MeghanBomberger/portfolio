import React from 'react'
import './Projects.scss'
import ProjectCard from './ProjectCard'

export default function Projects ({projects}) {	
	return (
		<section className="section projects">
			<h2>{projects[0].contributor ? "Contributor" : "Personal"} Projects</h2>
			{projects.map(project => <ProjectCard key={project.id} project={project}/>)}
		</section>
	)
}
