import React, { useState } from 'react'
import { Link } from 'react-scroll'
import './Nav.scss'
import homeIcon from '../assets/005-house.svg'
import projectsIcon from '../assets/008-web-programming.svg'
import skillsIcon from '../assets/002-pencil.svg'
import contactIcon from '../assets/003-call.svg'
import aboutIcon from '../assets/004-user.svg'
import resumeIcon from '../assets/009-pdf.svg'

export default function Nav () {
	const [downloadIsOpen, setDownloadIsOpen] = useState(false)

	const navLinks = [
		{
			title: "top",
			icon: homeIcon,
			path: "hero"
		},
		{
			title: "about me",
			icon: aboutIcon,
			path: "about"
		},
		{
			title: "projects",
			icon: projectsIcon,
			path: "personalProjects"
		},
		{
			title: "skills",
			icon: skillsIcon,
			path: "skills"
		},
		{
			title: "contact me",
			icon: contactIcon,
			path: "contact"
		}
	]

	const downloadResumeAnimation = () => {
		setDownloadIsOpen(true)
		setTimeout(() => {
			setDownloadIsOpen(false)
		}, 5000)
	}

	return (
		<>
			<nav className="nav">
				{navLinks.map(navLink => (
					<Link
						key={navLink.title}
						to={navLink.path}
						className="nav-link"
						smooth={true}
					>
						<img
							alt={navLink.title}
							title={navLink.title}
							src={navLink.icon}
						/>
					</Link>
				))}
				<a 
					className="nav-link"
					download 
					href="https://docs.google.com/document/d/1yMB0ptyZBqqyDCP1OMg9mfHepngaG8aWgFOOVO5RJyo/export?format=pdf"
					onClick={downloadResumeAnimation}
				>
					<img
						alt="download my resume"
						title="download my resume"
						src={resumeIcon}
					/>
				</a>
			</nav>
			<div className={downloadIsOpen ? "downloading open" : "downloading"}>
				Resume downloading, please wait...
			</div>
		</>
	)
}