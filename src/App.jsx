import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import { div } from 'framer-motion/client'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import SkillsCarousel from './components/SkillsCarousel'

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      <NavBar/>
      <Hero/>
      <About/>
      <SkillsCarousel isMobile={isMobile} />
      <Projects/>
      <Contact/>
    </div>
  )
}

export default App
