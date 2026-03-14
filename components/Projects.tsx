import { Project } from "@/utils/types"
import ProjectCard from "./ProjectCard"

interface ProjectsProps {
  projects: Project[];
  scrollId?: string;
}

export default function Projects ({ projects, scrollId }: ProjectsProps) {	
  return (
    <section 
      className="section projects" 
      style={{ alignItems: 'center'}} 
      id={scrollId}
    >
      <h2>{projects[0].contributor ? "Contributor" : "Personal"} Projects</h2>
      {projects.map(project => <ProjectCard key={project.id} project={project}/>)}
    </section>
  )
}
