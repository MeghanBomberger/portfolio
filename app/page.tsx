'use client';

import { useEffect, useState } from 'react';

import '@styles/home.scss';
import { getProjects, getSkills } from '@lib/api';
import Hero from '../components/Hero';
import Nav from '../components/Nav';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Footer from '../components/Footer';
import { Project, Skill } from '@/utils/types';

export default function Home() {
  const [message, setMessage] = useState("")
  const [personalProjects, setPersonalProjects] = useState<Project[]>([])
  const [contributorProjects, setContributorProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])

  console.info("message: ", message) // TODO: temporary console log to suppress unused variable warning. Will be used in future update to display error message to user.

  useEffect(() => {
    getProjects()
      .then(data => {
        if (data.projects) {
          setPersonalProjects(data.projects.filter((p: { contributor: boolean }) => !p.contributor))
          setContributorProjects(data.projects.filter((p: { contributor: boolean }) => p.contributor))
        }
      })
      .catch(err => {
        console.error(err)
        setMessage("ERROR")
      })

    getSkills()
      .then(data => {
        if (data.skills) {
          setSkills(data.skills)
        }
      })
      .catch(err => {
        console.error(err)
        setMessage("ERROR")
      })
  }, [])

  useEffect(() => {
    if (personalProjects.length > 0) {
      personalProjects.forEach((project: { url: string }) => {
        if (project.url) {
          fetch(`${project.url}/hello`)
        }
      })
    }
  }, [personalProjects])

  return (
    <>
      <div className="app-background" />
      <main className="app">
        <section id="hero" className="element">
          <Hero />
        </section>

        <Nav />

        <About />

        {personalProjects.length > 0 && (
          <Projects scrollId="personalProjects" projects={personalProjects} />
        )}

        {contributorProjects.length > 0 && (
          <Projects projects={contributorProjects} />
        )}

        {skills.length > 0 && (
          <Skills skills={skills} />
        )}

        <Footer />
      </main>
    </>
  );
}
