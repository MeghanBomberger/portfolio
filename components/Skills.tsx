import { Skill } from "@/utils/types";
import SkillsList from "./SkillsList";

interface SkillsProps {
  skills: Skill[];
}

export default function Skills ({skills}: SkillsProps) {
  return (
    <section className="section skills" id="skills">
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
