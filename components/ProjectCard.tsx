import Image from 'next/image';

import '@styles/project-card.scss';
import { githubIcon } from '@lib/assets';
import { Project } from '@utils/types';

const iconSize = 30

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <a href={project.url}>
        <div className="project-example">
          <div className="project-examples">
            {!!project.desktop_img && (
              <div className="desktop-example">
                <div 
                  className="desktop-screen" 
                  style={{ backgroundImage: `url(${project.desktop_img})` }} 
                />
                <div className="desktop-screen-stand" />
                <div className="desktop-screen-base" />
              </div>
            )}
            {!!project.mobile_img && (
              <div 
                className="mobile-example"
                style={{
                  transform: !!project.desktop_img ? 'rotate(10deg)' : 'scale(1.65)',
                  marginTop: !!project.desktop_img ? 'calc(17.5vw)' : 'calc(14vw)'
                }}
              >
                <div className="phone-camera" />
                <div 
                  className="phone-screen" 
                  style={{ 
                    backgroundImage: `url(${project.mobile_img})` 
                  }} 
                />
                <div className="phone-button" />
              </div>
            )}
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
            <Image
              key={skill.skill_id}
              className="project-skill"
              src={skill.skill_icon}
              alt={skill.skill_name}
              title={skill.skill_name}
              width={iconSize}
              height={iconSize}
            />
          ))}
        </div>
        {project.repo && (
          <>
            <p className="project-repo">Checkout out the repo</p>
            <a href={project.repo}>
              <Image
                alt="github-repo"
                className="git-hub-icon"
                src={githubIcon}
                title="GitHub repo"
                width={iconSize}
                height={iconSize}
              />
            </a>
          </>
        )}
      </div>

    </article>
  )
}