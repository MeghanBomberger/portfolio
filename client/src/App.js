import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Element } from 'react-scroll'
import './App.scss'
import About from './components/about/About'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Projects from './components/projects/Projects'
import Skills from './components/skills/Skills'

export const baseURL = process.env.REACT_APP_IS_PRODUCTION ? 'https://meghan-bomberger-portfolio.herokuapp.com/api' : 'http://localhost:4000/api'

export default function App () {
  const [message, setMessage] = useState("")
  const [personalProjects, setPersonalProjects] = useState([])
  const [contributorProjects, setContributorProjects] = useState([])
  const [skills, setSkills] = useState([])

  console.info("message: ", message) // TODO: temporary console log to suppress unused variable warning for error state. Will be used in future update to display error message to user if message fails to send.

  useEffect(() => {
    axios.get(`${baseURL}/projects`)
      .then(res => {
        if (res.data.projects) {
          setPersonalProjects(res.data.projects.filter(project => !project.contributor))
          setContributorProjects(res.data.projects.filter(project => project.contributor))
        }
      })
      .catch(err => {
        console.error(err)
        setMessage("ERROR")
      })
    
    axios.get(`${baseURL}/skills`)
      .then(res => {
        if (res.data.skills) {
          setSkills(res.data.skills)
        }
      })
      .catch(err => {
        console.error(err)
        setMessage("ERROR")
      })
  }, [])

  // ping sleeping projects
  useEffect(() => {
    if (personalProjects.length > 0) {
      personalProjects.forEach(project => {
        if (project.url) {
          axios.get(`${project.url}/hello`)
        }
      })
    }
  }, [personalProjects])

  return (
    <>
      <div className="app-background"/>
      <div className="app">
        <Element name="hero" className="element">
          <Hero/>
        </Element>
        
        <Nav/>

        <Element name="about" className="element">
          <About />
        </Element>
        
        {personalProjects.length > 0 && (
          <Element name="personalProjects" className="element">
            <Projects projects={personalProjects}/>
          </Element>
        )}

        {contributorProjects.length > 0 && (
          <Element name="contributorProjects" className="element">
            <Projects projects={contributorProjects}/>
          </Element>
        )}

        {skills.length > 0 && (
          <Element name="skills" className="element">
            <Skills skills={skills}/>
          </Element>
        )}

        <Element name="contact" className="element">
          <Footer/>
        </Element>
      </div>
    </>
  )
}
