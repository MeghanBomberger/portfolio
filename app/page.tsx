'use client';

import { useState } from 'react';

import '@styles/home.scss';
import Hero from '../components/Hero';
import Nav from '../components/Nav';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Footer from '../components/Footer';

export default function Home() {
  const [message, setMessage] = useState("")
  const [personalProjects, setPersonalProjects] = useState([])
  const [contributorProjects, setContributorProjects] = useState([])
  const [skills, setSkills] = useState([])
  
  return (
    <>
      <div className="app-background"/>
      <main className="app">
        <section id="hero" className="element">
          <Hero />
        </section>

        <Nav/>

        <About/>

        {(personalProjects.length > 0 || contributorProjects.length > 0) && (
          <Projects/>
        )}

        {skills.length > 0 && (
          <Skills/>
        )}

        <Footer/>
      </main>
    </>
  );
}
