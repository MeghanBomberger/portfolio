import { useState } from 'react';
import Image from 'next/image';

import '@styles/nav.scss';
import { homeIcon, aboutIcon, projectsIcon, skillsIcon, contactIcon, resumeIcon } from '@lib/assets';

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

const iconSize = 18

export default function Nav() {
  const [downloadIsOpen, setDownloadIsOpen] = useState(false)

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
          <a
            key={navLink.title}
            href={`#${navLink.path}`}
            className="nav-link"
          >
            <Image
              alt={navLink.title}
              title={navLink.title}
              src={navLink.icon}
              width={iconSize}
              height={iconSize}
            />
          </a>
        ))}

        <a
          className="nav-link"
          download
          href="https://docs.google.com/document/d/1yMB0ptyZBqqyDCP1OMg9mfHepngaG8aWgFOOVO5RJyo/export?format=pdf"
          onClick={downloadResumeAnimation}
        >
          <Image
            alt="download my resume"
            title="download my resume"
            src={resumeIcon}
            width={iconSize}
            height={iconSize}
          />
        </a>
      </nav>

      <div className={downloadIsOpen ? "downloading open" : "downloading"}>
        Resume downloading, please wait...
      </div>
    </>
  )
}
