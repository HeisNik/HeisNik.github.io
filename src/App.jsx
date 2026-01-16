import { useState, useEffect } from 'react';
import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import SkillsCarousel from './components/SkillsCarousel'
import SkillsVortex from './components/SkillsVortex'
import SkillsCircuit from './components/SkillsCircuit'
import GlitchCarousel from './components/GlitchCarousel'
import Skills from './components/Skills'
import Socials from './components/Socials'
import ShaderBackground from './components/ShaderBackground'
import VerticalStackAbout from './components/VerticalStackAbout'

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth > 1000 && window.innerWidth <= 1150);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
      setIsMediumScreen(window.innerWidth > 1000 && window.innerWidth <= 1150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      <ShaderBackground 
        backdropBlurAmount="sm" 
        color="#07eae6ff"
        className="fixed inset-0 z-0"
      />
      <div className="relative z-10 content-wrapper">
        <NavBar/>
        <Hero/>
        <VerticalStackAbout/>
        <About/>
        <SkillsCarousel isMobile={isMobile} isMediumScreen={isMediumScreen} />
        <SkillsVortex />
        <SkillsCircuit />
        <GlitchCarousel />
        <Skills />
        <Projects/>
        <Contact/>
        <Socials />
      </div>
    </div>
  )
}

export default App
